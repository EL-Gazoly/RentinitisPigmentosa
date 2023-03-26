from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Hasher():
    def get_password_hash(password):
        return pwd_context.hash(password)
    
    def verify_password(plain_password, hash_password):
        return pwd_context.verify(plain_password, hash_password)