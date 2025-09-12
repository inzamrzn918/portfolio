// Simple WebSocket test client
import WebSocket from 'ws';

const ws = new WebSocket('ws://127.0.0.1:8000/chat');

ws.on('open', function open() {
  console.log('Connected to WebSocket server');
  ws.send(JSON.stringify({ text: 'Hello from test client' }));
});

ws.on('message', function incoming(data) {
  console.log('Received message:', data.toString());
  process.exit(0); // Exit after receiving a message
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err.message);
  process.exit(1);
});

// Exit after 5 seconds if no response
setTimeout(() => {
  console.error('Timeout: No response from server after 5 seconds');
  process.exit(1);
}, 5000);