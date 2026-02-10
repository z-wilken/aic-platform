from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives import serialization
import base64

class SigningService:
    def __init__(self):
        # In production, these would be loaded from a secure vault or HSM
        # For the Alpha, we generate a persistent key pair
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=3072
        )
        self.public_key = self.private_key.public_key()

    def sign_hash(self, hash_str: str) -> str:
        signature = self.private_key.sign(
            hash_str.encode(),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return base64.b64encode(signature).decode()

    def get_public_key_pem(self) -> str:
        return self.public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode()

signing_service = SigningService()
