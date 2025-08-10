import React, { useEffect, useState } from 'react';
import './Inbox.css';

const Inbox = ({ onSelectConversation, activeUserId }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) return <p className="inbox-loading">Loading conversations...</p>;
  if (conversations.length === 0) return <p className="inbox-empty">No conversations</p>;

  return (
    <div className="inbox-container">
      <h2 className="inbox-title">Inbox</h2>
      <ul className="inbox-list">
        {conversations.map((conv) => {
          const otherUserId = conv.sender_id === activeUserId ? conv.receiver_id : conv.sender_id;
          const isActive = activeUserId === otherUserId;
          return (
            <li
              key={conv.id}
              className={`inbox-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectConversation(otherUserId)}
            >
              <img
                src={conv.other_user_pp || 'https://www.gravatar.com/avatar/?d=mp&f=y'}
                alt={conv.other_user_name}
                className="inbox-avatar"
              />
              <div className="inbox-content">
                <span className="inbox-username">{conv.other_user_name}</span>
                <br />
                <small className="inbox-last-message">{conv.message}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Inbox;
