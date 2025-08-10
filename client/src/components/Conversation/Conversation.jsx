import React, { useEffect, useState, useRef } from 'react';
import './Conversation.css';

const Conversation = ({ userId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const fetchConversation = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/messages/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setMessages(data.messages);
        setReceiver(data.receiver);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchConversation();
  }, [userId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          receiver_id: userId,
          message: newMessage,
        }),
      });
      if (res.ok) {
        const sentMessage = await res.json();
        setMessages((prev) => [...prev, sentMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!userId) return null;

return (
  <div className="conversation-container">
    <div className="conversation-header">
      <h3>{receiver ? receiver.name : 'Loading...'}</h3>
      <button onClick={onClose}>X</button>
    </div>
    <div className="conversation-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender_id === userId ? 'sent' : 'received'}`}
        >
          <p>{msg.message}</p>
          <div className="message-time">
            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
    <div className="conversation-input-container">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  </div>
);

};

export default Conversation;
