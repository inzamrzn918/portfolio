import datetime
from bson import ObjectId
from typing import Dict, Any

def format_headers(headers: dict) -> str:
    return "\n".join([f"<tr><td>{k}</td><td>{v}</td></tr>" for k,v in headers.items()])

def process_document(doc: Dict[str, Any]) -> Dict[str, Any]:
    """Convert MongoDB document to serializable format"""
    processed = doc.copy()
    if '_id' in processed and isinstance(processed['_id'], ObjectId):
        processed['_id'] = str(processed['_id'])
    return processed

def get_email_template(data: dict) -> str:
    # Process document to handle ObjectId
    processed_data = process_document(data)
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {{ font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 20px; border-radius: 8px; }}
            .section {{ background-color: #f8fafc; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
            .table {{ width: 100%; border-collapse: collapse; }}
            .table td, .table th {{ padding: 8px; border-bottom: 1px solid #e2e8f0; }}
            .label {{ font-weight: bold; color: #475569; width: 30%; }}
            .value {{ color: #1e293b; }}
            .footer {{ text-align: center; margin-top: 20px; color: #64748b; font-size: 0.9em; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Request Details</h2>
                <p>Document ID: {processed_data.get('_id')}</p>
            </div>
            
            <div class="section">
                <h3>🌐 Basic Information</h3>
                <table class="table">
                    <tr><td class="label">IP Address</td><td class="value">{processed_data.get('ip_address')}</td></tr>
                    <tr><td class="label">Timestamp</td><td class="value">{processed_data.get('timestamp')}</td></tr>
                    <tr><td class="label">Path</td><td class="value">{processed_data.get('path')}</td></tr>
                    <tr><td class="label">Referrer</td><td class="value">{processed_data.get('referrer')}</td></tr>
                    <tr><td class="label">User Agent</td><td class="value">{processed_data.get('userAgent')}</td></tr>
                </table>
            </div>

            <div class="section">
                <h3>📋 Request Headers</h3>
                <table class="table">
                    {format_headers(processed_data.get('metadata', {}).get('headers', {}))}
                </table>
            </div>

            <div class="section">
                <h3>🔍 Additional Metadata</h3>
                <table class="table">
                    <tr><td class="label">Client IP</td><td class="value">{processed_data.get('metadata', {}).get('client')}</td></tr>
                </table>
            </div>

            <div class="footer">
                <p>Sent by Portfolio Analytics System</p>
                <p>Generated at: {datetime.datetime.now(datetime.UTC).isoformat()}</p>
            </div>
        </div>
    </body>
    </html>
    """