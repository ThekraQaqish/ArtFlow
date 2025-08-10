import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MessagesPage.css';


import Inbox from '../../components/Inbox/Inbox';
import Conversation from '../../components/Conversation/Conversation';

const MessagesPage = () => {
  const location = useLocation();
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.activeUserId) {
      setActiveUserId(location.state.activeUserId);
    }
  }, [location.state]);

  return (
    <div className='messages-page'>
      <div className='inbox-container'>
        <Inbox onSelectConversation={setActiveUserId} activeUserId={activeUserId} />
      </div>

      <div className="conversation-container">
        {activeUserId ? (
          <Conversation userId={activeUserId} onClose={() => setActiveUserId(null)} />
        ) : (
          <p>Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
