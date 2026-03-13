from datetime import datetime, timedelta, timezone
import hashlib
import hmac
import secrets
from typing import Any, Dict

import jwt

from ..core.config import settings

PBKDF2_ALGORITHM = "sha256"
PBKDF2_ITERATIONS = 390000


def _pbkdf2_hash(password: str, salt: str) -> str:
    derived_key = hashlib.pbkdf2_hmac(
        PBKDF2_ALGORITHM,
        password.encode("utf-8"),
        salt.encode("utf-8"),
        PBKDF2_ITERATIONS,
    )
    return derived_key.hex()


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = _pbkdf2_hash(password, salt)
    return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${salt}${digest}"


def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        scheme, iterations, salt, expected_digest = password_hash.split("$", 3)
        if scheme != "pbkdf2_sha256":
            return False

        computed_digest = hashlib.pbkdf2_hmac(
            PBKDF2_ALGORITHM,
            plain_password.encode("utf-8"),
            salt.encode("utf-8"),
            int(iterations),
        ).hex()
        return hmac.compare_digest(computed_digest, expected_digest)
    except (ValueError, TypeError):
        return False


def create_access_token(subject: Dict[str, Any]) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {**subject, "exp": expire}
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> Dict[str, Any]:
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
