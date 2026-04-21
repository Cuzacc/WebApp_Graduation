import smtplib
import os
from email.message import EmailMessage
import logging
from config import settings

logger = logging.getLogger(__name__)

# Sử dụng cấu hình tập trung
SMTP_HOST = settings.SMTP_HOST
SMTP_PORT = settings.SMTP_PORT
SMTP_USER = settings.SMTP_USER
SMTP_PASSWORD = settings.SMTP_PASSWORD

def send_thank_you_email_background(guest_email: str, guest_name: str):
    """
    [BACKGROUND WORKER] Phục vụ mục tiêu đưa vào thiết kế DevOps.
    """
    if not guest_email or not SMTP_USER or not SMTP_PASSWORD:
        logger.warning(f"🚧 Bỏ qua gửi email cho {guest_name} vì thiếu cấu hình SMTP hoặc Email Khách.")
        return

    try:
        msg = EmailMessage()
        msg['Subject'] = 'Cảm ơn bạn đã tham dự Lễ Tốt Nghiệp của tớ! 🎉'
        msg['From'] = SMTP_USER
        msg['To'] = guest_email

        content = f"""
Chào {guest_name},

Cảm ơn bạn rất nhiều vì đã dành thời gian xác nhận và để lại lời chúc cho buổi Lễ Tốt Nghiệp sắp tới của tớ.
Sự hiện diện (hoặc lời chúc) của bạn là món quà vô giá khiến ngày lễ này trở nên đặc biệt trọn vẹn.

Hẹn gặp bạn tại buổi lễ nhé!

Thân mến!
"""
        msg.set_content(content)

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
            
        logger.info(f"✅ [WORKER] Gửi email thành công tới: {guest_email}")
    except Exception as e:
        logger.error(f"❌ Lỗi Pipeline gửi mail: {e}")
