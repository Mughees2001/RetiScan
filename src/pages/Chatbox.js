import React, { useState } from 'react';
import axios from 'axios';

function Chatbox() {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = async () => {
  const message = {
    text: userInput,
    user: 'You',
  };
  // Update conversation state with the user's message
  setConversation(conversation => [...conversation, message]);
  

  try {
    // Post the message to the backend server
    const response = await axios.post('http://127.0.0.1:5000/api/send-message', { text: userInput });

    // Append the received message to the conversation
    const reply = {
      text: response.data.response,
      user: 'Dafne',
    };
    setConversation(conversation => [...conversation, reply]);
    
        console.log('Response from server:', response.data.response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
  // Clear the input for the next message
  setUserInput('');
};


  return (
<div style={{ backgroundColor: 'black', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div className="heading_container heading_center" style={{ textAlign: 'center', maxWidth: '600px', width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
    <h2 style={{ color: 'white' }}>Chat with Fedrick!</h2>
    <p style={{ color: 'white' }}>An AI-powered bot to give you expert advice on retinal procedures.</p>
    <div className="chatbox-container" style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '20px' }}> {/* Added borderRadius here for the chatbox itself */}
      <div className="messages-container">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'You' ? 'user' : 'dafne'}`}>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  </div>
</div>

  );
}

export default Chatbox;

