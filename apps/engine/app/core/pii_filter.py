"""
PII Redaction Filter for Python logging.
Ensures no personally identifiable information leaks into log output.
Required for POPIA compliance.
"""

import logging
import re
from typing import List, Tuple


class PIIRedactionFilter(logging.Filter):
    """
    Logging filter that detects and redacts PII patterns before they reach log output.
    Covers: email addresses, SA ID numbers, phone numbers, and credit card patterns.
    """

    PATTERNS: List[Tuple[re.Pattern, str]] = [
        # Email addresses
        (re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'), '[REDACTED_EMAIL]'),
        # South African ID numbers (13 digits)
        (re.compile(r'\b\d{13}\b'), '[REDACTED_SA_ID]'),
        # Phone numbers — SA format (+27, 0xx) and general international
        (re.compile(r'\+27\s?\d{2}\s?\d{3}\s?\d{4}'), '[REDACTED_PHONE]'),
        (re.compile(r'\b0\d{2}[\s-]?\d{3}[\s-]?\d{4}\b'), '[REDACTED_PHONE]'),
        # Credit card patterns (13-19 digits with optional separators)
        (re.compile(r'\b(?:\d{4}[\s-]?){3,4}\d{1,4}\b'), '[REDACTED_CARD]'),
        # Password hashes (bcrypt pattern)
        (re.compile(r'\$2[aby]?\$\d{2}\$[A-Za-z0-9./]{53}'), '[REDACTED_HASH]'),
        # UUID patterns in query context (keep for audit trail, but redact from general logs)
        # Not redacted — UUIDs are not PII by themselves
    ]

    def filter(self, record: logging.LogRecord) -> bool:
        """Redact PII from the log message. Always returns True (never drops records)."""
        if isinstance(record.msg, str):
            record.msg = self._redact(record.msg)
        if record.args:
            if isinstance(record.args, dict):
                record.args = {k: self._redact(str(v)) if isinstance(v, str) else v for k, v in record.args.items()}
            elif isinstance(record.args, tuple):
                record.args = tuple(self._redact(str(a)) if isinstance(a, str) else a for a in record.args)
        return True

    def _redact(self, text: str) -> str:
        for pattern, replacement in self.PATTERNS:
            text = pattern.sub(replacement, text)
        return text


def install_pii_filter():
    """Install the PII redaction filter on the root logger and all handlers."""
    pii_filter = PIIRedactionFilter()
    root = logging.getLogger()
    root.addFilter(pii_filter)
    for handler in root.handlers:
        handler.addFilter(pii_filter)
    return pii_filter
