#!/bin/bash

cd /var/www/html/portfolio

# Install system dependencies
sudo apt-get update
sudo apt-get install -y python3-pip

# Install and configure pipenv
python3 -m pip install --user pipenv
export PATH="$PATH:$HOME/.local/bin"

# Remove existing virtual environment if it exists
rm -rf .venv

# Install dependencies from Pipfile
pipenv --python 3.11 install
pipenv install uvicorn

# Kill any existing uvicorn process
pkill -f uvicorn || true
sleep 2

# Start the FastAPI server using uvicorn in detached mode on port 8001
nohup pipenv run uvicorn app.main:app --host 0.0.0.0 --port 8001 > uvicorn.log 2>&1 &

# Wait a few seconds to check if the process started successfully
sleep 5

# Debug information
echo "=== Process Status ==="
ps aux | grep uvicorn
echo "=== Netstat for port 8001 ==="
sudo netstat -tulpn | grep 8001
echo "=== Last 50 lines of uvicorn.log ==="
tail -n 50 uvicorn.log
echo "=== Testing connection ==="
curl -v http://localhost:8001 