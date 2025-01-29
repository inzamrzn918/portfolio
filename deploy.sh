#!/bin/bash

# Define Variables
SERVER_USER="ubuntu"
SERVER_IP="inzam.xyz"
REMOTE_PATH="/home/ubuntu/dist"
APACHE_PATH="/var/www/html"

echo "🚀 Deploying files to $SERVER_IP..."

# Step 1: Upload Files via SCP
scp -r ./dist/* $SERVER_USER@$SERVER_IP:$REMOTE_PATH

# Step 2: Move Files to Apache Directory
ssh $SERVER_USER@$SERVER_IP << EOF
  sudo mv $REMOTE_PATH/* $APACHE_PATH/
  sudo chown -R www-data:www-data $APACHE_PATH/
  sudo chmod -R 755 $APACHE_PATH/
  sudo systemctl restart apache2
EOF

echo "✅ Deployment successful!"
