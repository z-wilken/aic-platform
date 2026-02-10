"""
Unit tests for hash chain service.
"""

import pytest
from app.services.hash_chain import HashChain


class TestHashChainCreate:

    def test_first_record_uses_genesis(self):
        record = HashChain.create_audit_record({"action": "test"})
        assert record["previous_hash"] == HashChain.GENESIS_HASH
        assert record["sequence_number"] == 0

    def test_chain_hash_differs_from_entry_hash(self):
        record = HashChain.create_audit_record({"action": "test"})
        assert record["chain_hash"] != record["entry_hash"]

    def test_deterministic_hashing(self):
        data = {"action": "bias_audit", "result": "FAIR"}
        h1 = HashChain.compute_entry_hash(data)
        h2 = HashChain.compute_entry_hash(data)
        assert h1 == h2

    def test_chain_linking(self):
        r1 = HashChain.create_audit_record({"action": "first"}, sequence_number=0)
        r2 = HashChain.create_audit_record(
            {"action": "second"},
            previous_hash=r1["chain_hash"],
            sequence_number=1,
        )
        assert r2["previous_hash"] == r1["chain_hash"]


class TestHashChainVerify:

    def test_valid_chain(self):
        r1 = HashChain.create_audit_record({"action": "first"}, sequence_number=0)
        r2 = HashChain.create_audit_record(
            {"action": "second"},
            previous_hash=r1["chain_hash"],
            sequence_number=1,
        )
        r3 = HashChain.create_audit_record(
            {"action": "third"},
            previous_hash=r2["chain_hash"],
            sequence_number=2,
        )

        result = HashChain.verify_chain([r1, r2, r3])
        assert result["valid"] is True
        assert result["records_checked"] == 3

    def test_tampered_data_detected(self):
        r1 = HashChain.create_audit_record({"action": "first"}, sequence_number=0)
        r2 = HashChain.create_audit_record(
            {"action": "second"},
            previous_hash=r1["chain_hash"],
            sequence_number=1,
        )

        # Tamper with r1's data after chain was created
        r1["data"]["action"] = "TAMPERED"

        result = HashChain.verify_chain([r1, r2])
        assert result["valid"] is False
        assert len(result["broken_links"]) > 0

    def test_empty_chain_is_valid(self):
        result = HashChain.verify_chain([])
        assert result["valid"] is True
        assert result["records_checked"] == 0

    def test_single_record_chain(self):
        r1 = HashChain.create_audit_record({"action": "only"}, sequence_number=0)
        result = HashChain.verify_chain([r1])
        assert result["valid"] is True

    def test_broken_link_detected(self):
        r1 = HashChain.create_audit_record({"action": "first"}, sequence_number=0)
        # r2 points to wrong previous hash
        r2 = HashChain.create_audit_record(
            {"action": "second"},
            previous_hash="0000000000000000000000000000000000000000000000000000000000000000",
            sequence_number=1,
        )

        result = HashChain.verify_chain([r1, r2])
        assert result["valid"] is False
