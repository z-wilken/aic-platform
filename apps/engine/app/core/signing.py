"""
Cryptographic Signing Service for Audit Records.

Provides RSA-3072 digital signatures for audit trail integrity,
ensuring non-repudiation and tamper-evidence for POPIA Section 71 compliance.

Key management:
  - Private key: loaded from AUDIT_SIGNING_KEY env var (PEM-encoded)
  - Public key: loaded from AUDIT_VERIFY_KEY env var (PEM-encoded)
  - In development, keys are auto-generated if not provided.
"""

import os
import logging
from typing import Dict, Any, Optional, Tuple

logger = logging.getLogger("aic.engine.signing")

# Key size for auto-generated keys
RSA_KEY_SIZE = 3072


def _load_keys() -> Tuple[Optional[Any], Optional[Any]]:
    """
    Load RSA key pair from environment variables.
    Falls back to auto-generated keys in development.
    """
    try:
        from cryptography.hazmat.primitives import serialization
        from cryptography.hazmat.primitives.asymmetric import rsa
    except ImportError:
        logger.warning("cryptography library not installed — signing disabled")
        return None, None

    private_key = None
    public_key = None

    # Try loading from environment
    private_pem = os.environ.get("AUDIT_SIGNING_KEY")
    public_pem = os.environ.get("AUDIT_VERIFY_KEY")

    if private_pem:
        try:
            private_key = serialization.load_pem_private_key(
                private_pem.encode(), password=None
            )
            public_key = private_key.public_key()
            logger.info("Loaded signing key from AUDIT_SIGNING_KEY")
        except Exception as e:
            logger.error(f"Failed to load AUDIT_SIGNING_KEY: {e}")
    elif public_pem:
        try:
            public_key = serialization.load_pem_public_key(public_pem.encode())
            logger.info("Loaded verification key from AUDIT_VERIFY_KEY (verify-only mode)")
        except Exception as e:
            logger.error(f"Failed to load AUDIT_VERIFY_KEY: {e}")

    # Auto-generate in development
    if private_key is None and os.environ.get("NODE_ENV") != "production":
        logger.info("Auto-generating RSA key pair for development")
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=RSA_KEY_SIZE,
        )
        public_key = private_key.public_key()

    return private_key, public_key


# Module-level key pair (loaded once at import)
_private_key, _public_key = _load_keys()


def is_signing_available() -> bool:
    """Check if signing is available (private key loaded)."""
    return _private_key is not None


def is_verification_available() -> bool:
    """Check if verification is available (public key loaded)."""
    return _public_key is not None


def sign_data(data: str) -> Optional[str]:
    """
    Sign a string (typically a hash) with the private key.

    Args:
        data: String to sign (e.g., a chain_hash).

    Returns:
        Base64-encoded signature, or None if signing is unavailable.
    """
    if _private_key is None:
        return None

    try:
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.asymmetric import padding
        import base64

        signature = _private_key.sign(
            data.encode("utf-8"),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH,
            ),
            hashes.SHA256(),
        )
        return base64.b64encode(signature).decode("ascii")

    except Exception as e:
        logger.error(f"Signing failed: {e}")
        return None


def verify_signature(data: str, signature_b64: str) -> Dict[str, Any]:
    """
    Verify a signature against the public key.

    Args:
        data: Original string that was signed.
        signature_b64: Base64-encoded signature.

    Returns:
        Dict with verification result.
    """
    if _public_key is None:
        return {
            "valid": False,
            "error": "Verification key not available",
        }

    try:
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.asymmetric import padding
        import base64

        signature = base64.b64decode(signature_b64)

        _public_key.verify(
            signature,
            data.encode("utf-8"),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH,
            ),
            hashes.SHA256(),
        )
        return {"valid": True, "message": "Signature is valid"}

    except Exception as e:
        return {
            "valid": False,
            "error": f"Signature verification failed: {str(e)}",
        }


def get_public_key_pem() -> Optional[str]:
    """Export the public key in PEM format for external verification."""
    if _public_key is None:
        return None

    try:
        from cryptography.hazmat.primitives import serialization

        pem = _public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        )
        return pem.decode("ascii")
    except Exception:
        return None
