import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/config';
import PulseLoader from "react-spinners/PulseLoader";

const Chat = ({ userId, onClose }) => {
  const [messages, setMessages] = useState([
    { user: false, text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState('');
  const [chatUUID, setChatUUID] = useState(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (chatUUID) {
        try {
          const response = await fetch(`${API_BASE_URL}/chat?uuid=${chatUUID}`);
          if (response.ok) {
            const data = await response.json();
            setMessages(data.chat);
          }
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      }
    };

    fetchChatHistory();
  }, [chatUUID]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setTyping(true);
    setMessages((prevMessages) => [
        ...prevMessages,
        { user: true, text: input },
      ]);
      setInput('');

    const payload = chatUUID
      ? { uuid: chatUUID, input }
      : { user_id: userId, input };

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setChatUUID(data.uuid);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: data.content.response },
        ]);
        setTyping(false);
        console.log("response:", data);
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
        <div className='flex justify-end mr-3 font-bold cursor-pointer' onClick={onClose}>x</div>
      <div className="chat-history">
        {messages.map((message, index) => (
          <div className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}>
            <div key={index} className={`justify-start chat-message ${message.user ? 'user' : 'bot'}`}> 
                {message.text}
            </div>
          </div>
        ))}
      </div>
      { typing && (
      <div className='flex justify-start m-2'>
        <PulseLoader
          color={"#F4CE14"}
          loading={typing}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
          
        />
      </div>)
        }
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
