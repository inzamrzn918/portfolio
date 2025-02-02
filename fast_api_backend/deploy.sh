#!/bin/bash

cd /var/www/html/portfolio

# Install system dependencies
sudo apt-get update
sudo apt-get install -y python3-pip python3-dev libssl-dev

# Install and configure pipenv
python3 -m pip install --user pipenv
export PATH="$PATH:$HOME/.local/bin"

# Remove existing virtual environment if it exists
rm -rf .venv

# Install dependencies from Pipfile
pipenv --python 3.11 install
# Install MongoDB dependencies correctly
pipenv install pymongo dnspython certifi

# Kill any existing uvicorn process
pkill -f uvicorn || true
sleep 2

# Start the FastAPI server using uvicorn with more verbose logging
nohup pipenv run uvicorn app.main:app --host 0.0.0.0 --port 8001 --log-level debug > uvicorn.log 2>&1 &

# Wait for startup
sleep 5

# Debug information
echo "=== Process Status ==="
ps aux | grep uvicorn
echo "=== MongoDB Connection Test ==="
pipenv run python3 -c "
import certifi
import pymongo
from pymongo import MongoClient
print(f'Using certifi version: {certifi.__version__}')
print(f'Using pymongo version: {pymongo.__version__}')
print(f'SSL/TLS cert path: {certifi.where()}')
"
echo "=== Last 50 lines of uvicorn.log ==="
tail -n 50 uvicorn.log 