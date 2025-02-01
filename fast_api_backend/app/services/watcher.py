from typing import Dict, Any
import asyncio
from motor.motor_asyncio import AsyncIOMotorCollection
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import datetime
from .email_template import get_email_template

load_dotenv()

class RequestWatcher:
    def __init__(self):
        """Watcher service to monitor new requests and send notifications"""
        print("Initializing RequestWatcher")
        self.smtp_server = os.getenv("SMTP_SERVER")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.smtp_username = os.getenv("SMTP_USERNAME")
        self.smtp_password = os.getenv("SMTP_PASSWORD")
        self.notification_email = os.getenv("NOTIFICATION_EMAIL")
        self.known_ips = set()
        self.display_name = "Portfolio Analytics"

    async def start_watching(self, collection: AsyncIOMotorCollection):
        try:
            print("Starting change stream watcher")
            pipeline = [{'$match': {'operationType': 'insert'}}]
            async with collection.watch(pipeline) as change_stream:
                async for change in change_stream:
                    await self.handle_new_request(change['fullDocument'])
        except Exception as e:
            print(f"Watcher error: {e}")

    async def handle_new_request(self, document: Dict[str, Any]):
        ip_address = document.get('ip_address')
        print(f"New request from IP: {ip_address}")
        if ip_address and ip_address not in self.known_ips:
            self.known_ips.add(ip_address)
            await self.send_notification(ip_address, document)
        else:
            print(f"IP address already known: {ip_address}")

    async def send_notification(self, ip_address: str, data: Dict[str, Any]):
        try:
            message = MIMEMultipart('alternative')
            message["From"] = f"{self.display_name} <{self.smtp_username}>"
            message["To"] = self.notification_email
            message["Subject"] = f"New Portfolio Visitor: {ip_address}"
            
            html_content = get_email_template(data)
            message.attach(MIMEText(html_content, 'html'))
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(message)
        except Exception as e:
            print(f"Email notification failed: {e}")