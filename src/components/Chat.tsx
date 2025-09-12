import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageCounterRef = useRef(0);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string>('');
  const maxRetries = 2;
  const [retryCount, setRetryCount] = useState(0);

  // Initial state
  useEffect(() => {
    messageCounterRef.current += 1;
    setMessages([]);
    setIsConnecting(false);
  }, []);

  // Connect WebSocket
  const connectWebSocket = () => {
    setIsConnecting(true);
    setError(null);

    let wsUrl: string;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    wsUrl =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'ws://127.0.0.1:8000/chat'
        : `${protocol}//${window.location.host}/api/chat`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setIsConnecting(false);
      setRetryCount(0);

      if (pendingMessageRef.current) {
        ws.send(JSON.stringify({ text: pendingMessageRef.current }));
        pendingMessageRef.current = '';
      }
    };

    ws.onmessage = (event) => {
      const data = event.data;
      let messageText = '';

      try {
        const parsed = JSON.parse(data);
        messageText = parsed.direct_answer || parsed.text || parsed.message || JSON.stringify(parsed);
      } catch {
        messageText = String(data);
      }

      messageCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-${messageCounterRef.current}`, text: messageText, sender: 'bot', timestamp: new Date() },
      ]);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setIsConnected(false);
      setIsConnecting(false);
      setError('Failed to connect to chat server.');
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      setIsConnecting(false);

      if (retryCount < maxRetries) {
        setRetryCount((prev) => prev + 1);
        setTimeout(connectWebSocket, 1500);
      } else {
        setError('Connection closed. Please refresh the page.');
      }
    };
  };

  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    messageCounterRef.current += 1;
    const newMessage: Message = {
      id: `${Date.now()}-${messageCounterRef.current}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    const userInput = inputMessage;
    setInputMessage('');

    if (!isConnected && !isConnecting) {
      pendingMessageRef.current = userInput;
      connectWebSocket();
      return;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text: userInput }));
    } else {
      pendingMessageRef.current = userInput;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0118] flex flex-col">
      {/* Header */}
      <div className="bg-[#0a0118]/95 backdrop-blur-md shadow-lg shadow-blue-500/10 border-b border-blue-500/20 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="text-xl font-bold text-white mx-auto">Chat with Inzamul</h1>
          <div className="flex items-center">
            {isConnecting ? (
              <span className="text-sm text-yellow-500 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                Connecting...
              </span>
            ) : isConnected ? (
              <span className="text-sm text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Connected
              </span>
            ) : error ? (
              <span className="text-sm text-red-500 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {error}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 container mx-auto p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                    : 'bg-purple-500/20 border border-purple-500/30 text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-3 flex items-end">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border-none outline-none resize-none text-white placeholder-gray-500 max-h-32"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="ml-2 p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
