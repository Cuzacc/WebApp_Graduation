import os
from dotenv import load_dotenv

# Xác định thư mục gốc của dự án
# Nếu chạy ở máy thật: BASE_DIR là thư mục cha của /backend
# Nếu chạy ở Docker: BASE_DIR chính là /app (nơi chứa backend)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if os.path.exists(os.path.join(os.path.dirname(CURRENT_DIR), "database")):
    # Chạy ở Local (thư mục database nằm cạnh thư mục backend)
    BASE_DIR = os.path.dirname(CURRENT_DIR)
else:
    # Chạy ở Docker (thư mục database nằm ngay bên trong /app)
    BASE_DIR = CURRENT_DIR

ENV_PATH = os.path.join(BASE_DIR, ".env")

# Nạp biến môi trường
load_dotenv(dotenv_path=ENV_PATH)

class Settings:
    # --- CẤU HÌNH DATABASE ---
    # Ưu tiên lấy từ ENV (Docker), nếu không có thì tính toán thủ công
    DATABASE_URL_ENV = os.getenv("DATABASE_URL")
    if DATABASE_URL_ENV:
        SQLALCHEMY_DATABASE_URL = DATABASE_URL_ENV
    else:
        DATABASE_PATH = os.path.join(BASE_DIR, "database", "graduation.db")
        SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

    # --- CẤU HÌNH JWT & BẢO MẬT ---
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_insecure_secret_change_me")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))

    # --- CẤU HÌNH SMTP (EMAIL WORKER) ---
    SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

    # --- CẤU HÌNH CORS ---
    # Cho phép nhiều origin, cách nhau bởi dấu phẩy trong .env
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

# Khởi tạo instance duy nhất để dùng toàn hệ thống
settings = Settings()
