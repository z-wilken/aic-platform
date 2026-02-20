"""
Signing service used by analysis endpoints to sign audit hashes.

Delegates to app.core.signing for key management and crypto operations.
This ensures a single key pair is used across the entire engine, loaded
from AUDIT_SIGNING_KEY / AUDIT_VERIFY_KEY env vars in production or
auto-generated in development.

This module provides the `signing_service` singleton consumed by analysis.py.
"""

from app.core.signing import sign_data, get_public_key_pem, is_signing_available


class SigningService:
    """Thin wrapper around the signing module for backward compatibility."""

    def sign_hash(self, hash_str: str) -> str:
        """Sign an audit hash and return base64-encoded signature."""
        result = sign_data(hash_str)
        return result or ""

    def get_public_key_pem(self) -> str:
        pem = get_public_key_pem()
        return pem or ""

    @property
    def available(self) -> bool:
        return is_signing_available()


signing_service = SigningService()
