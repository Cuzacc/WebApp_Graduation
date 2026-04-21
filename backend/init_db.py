import logging
from database import engine, Base
import models  # Cần import để Base.metadata quét được các bảng

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_database():
    logger.info("Đang khởi tạo các bảng trong Database...")
    try:
        # Lệnh này sẽ tạo toàn bộ bảng nếu nó chưa tồn tại (MVP Style)
        Base.metadata.create_all(bind=engine)
        logger.info("💪 Database tables đã được tạo thành công gốc DB!")
    except Exception as e:
        logger.error(f"❌ Khởi tạo Database thất bại: {e}")

if __name__ == "__main__":
    init_database()
