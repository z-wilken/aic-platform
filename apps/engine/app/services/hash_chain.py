"""
Hash Chain Service
Implements linked audit hashing: h_i = SHA256(h_{i-1} || Entry_i)
Provides tamper-evident audit trail for POPIA Section 71 compliance.
"""

import hashlib
import json
from typing import Dict, Any, Optional, List
from datetime import datetime


class HashChain:
    """
    In-memory hash chain for audit trail immutability.
    In production, the previous_hash would be read from the database.
    """

    # Genesis hash — the anchor for the first entry in any chain
    GENESIS_HASH = "0" * 64  # 64-char hex string of zeros

    @staticmethod
    def compute_entry_hash(entry_data: Dict[str, Any]) -> str:
        """Hash a single audit entry (without chain linking)."""
        json_str = json.dumps(entry_data, sort_keys=True, default=str)
        return hashlib.sha256(json_str.encode()).hexdigest()

    @staticmethod
    def compute_chain_hash(previous_hash: str, entry_data: Dict[str, Any]) -> str:
        """
        Compute chain-linked hash: h_i = SHA256(h_{i-1} || Entry_i)
        This links each audit record to its predecessor, making
        any tampering detectable.
        """
        entry_json = json.dumps(entry_data, sort_keys=True, default=str)
        combined = f"{previous_hash}||{entry_json}"
        return hashlib.sha256(combined.encode()).hexdigest()

    @staticmethod
    def create_audit_record(
        entry_data: Dict[str, Any],
        previous_hash: Optional[str] = None,
        sequence_number: int = 0,
    ) -> Dict[str, Any]:
        """
        Create a full audit record with chain-linked hash.
        Returns the record with hash metadata attached.
        """
        prev = previous_hash or HashChain.GENESIS_HASH

        chain_hash = HashChain.compute_chain_hash(prev, entry_data)

        return {
            "sequence_number": sequence_number,
            "timestamp": datetime.utcnow().isoformat(),
            "previous_hash": prev,
            "entry_hash": HashChain.compute_entry_hash(entry_data),
            "chain_hash": chain_hash,
            "data": entry_data,
        }

    @staticmethod
    def verify_chain(records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Verify the integrity of a chain of audit records.
        Returns verification result with details on any broken links.
        """
        if not records:
            return {
                "valid": True,
                "records_checked": 0,
                "message": "Empty chain — nothing to verify.",
            }

        broken_links = []
        records_checked = 0

        for i, record in enumerate(records):
            records_checked += 1

            # Determine expected previous hash
            if i == 0:
                expected_prev = HashChain.GENESIS_HASH
            else:
                expected_prev = records[i - 1].get("chain_hash", "")

            # Check previous_hash pointer
            actual_prev = record.get("previous_hash", "")
            if actual_prev != expected_prev:
                broken_links.append({
                    "record_index": i,
                    "sequence_number": record.get("sequence_number"),
                    "issue": "previous_hash mismatch",
                    "expected": expected_prev[:16] + "...",
                    "actual": actual_prev[:16] + "...",
                })

            # Re-compute chain hash and verify
            entry_data = record.get("data", {})
            recomputed = HashChain.compute_chain_hash(actual_prev, entry_data)
            stored_hash = record.get("chain_hash", "")

            if recomputed != stored_hash:
                broken_links.append({
                    "record_index": i,
                    "sequence_number": record.get("sequence_number"),
                    "issue": "chain_hash recomputation failed — data may have been tampered with",
                    "expected": recomputed[:16] + "...",
                    "actual": stored_hash[:16] + "...",
                })

        return {
            "valid": len(broken_links) == 0,
            "records_checked": records_checked,
            "broken_links": broken_links,
            "message": (
                "Chain integrity verified — all records are intact."
                if len(broken_links) == 0
                else f"Chain integrity BROKEN — {len(broken_links)} issue(s) detected."
            ),
            "verified_at": datetime.utcnow().isoformat(),
        }
