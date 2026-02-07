"""
Unit tests for PII redaction filter.
"""

import logging
from app.core.pii_filter import PIIRedactionFilter


def make_filter():
    return PIIRedactionFilter()


class TestPIIRedaction:

    def test_email_redacted(self):
        f = make_filter()
        assert f._redact("User email is admin@enterprise.co.za") == "User email is [REDACTED_EMAIL]"

    def test_sa_id_redacted(self):
        f = make_filter()
        assert f._redact("ID number: 9001015009087") == "ID number: [REDACTED_SA_ID]"

    def test_phone_sa_format_redacted(self):
        f = make_filter()
        assert "[REDACTED_PHONE]" in f._redact("Call +27 82 123 4567")

    def test_phone_local_format_redacted(self):
        f = make_filter()
        assert "[REDACTED_PHONE]" in f._redact("Call 082-123-4567")

    def test_bcrypt_hash_redacted(self):
        f = make_filter()
        text = "Hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
        assert "[REDACTED_HASH]" in f._redact(text)

    def test_clean_text_unchanged(self):
        f = make_filter()
        text = "Bias analysis completed with score 85"
        assert f._redact(text) == text

    def test_multiple_pii_types(self):
        f = make_filter()
        text = "User admin@test.com with ID 9001015009087 called 082-123-4567"
        result = f._redact(text)
        assert "[REDACTED_EMAIL]" in result
        assert "[REDACTED_SA_ID]" in result
        assert "[REDACTED_PHONE]" in result
        assert "admin@test.com" not in result
        assert "9001015009087" not in result

    def test_log_record_filter(self):
        f = make_filter()
        record = logging.LogRecord(
            name="test", level=logging.INFO, pathname="", lineno=0,
            msg="Login by admin@enterprise.co.za", args=None, exc_info=None,
        )
        f.filter(record)
        assert "admin@enterprise.co.za" not in record.msg
        assert "[REDACTED_EMAIL]" in record.msg
