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

# Start the FastAPI server using uvicorn in detached mode
nohup pipenv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > uvicorn.log 2>&1 &

# Wait a few seconds to check if the process started successfully
sleep 5

# Check if uvicorn is running
ps aux | grep uvicorn

# Show the last few lines of the log
tail -n 20 uvicorn.log 