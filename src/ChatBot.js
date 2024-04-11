import React, { useEffect, useRef, useState } from "react";
import { GrTrash, GrChat } from "react-icons/gr";
import { FaTimes } from "react-icons/fa"; // cross icon
import "./App.css";

const OPENAI_API_KEY = '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';
const MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY = 5;

const ChatBot = () => {
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, I am your heart health assistant",
      sender: "ChatGPT",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleUserMessage = async (userMessage) => {
    const newUserMessage = {
      message: userMessage,
      sender: 'user',
      direction: 'outgoing',
    };

    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);

    setIsChatbotTyping(true);

    await processUserMessageToChatGPT(updatedChatMessages);
  };

  async function processUserMessageToChatGPT(messages, retryCount = 0) {
    try {
      let apiMessages = messages.map((messageObject) => {
        let role = '';
        if (messageObject.sender === 'ChatGPT') {
          role = 'assistant';
        } else {
          role = 'user';
        }
        return { role: role, content: messageObject.message };
      });

      const systemMessage = {
        role: 'system',
        content:
          'This chatbot serves as your knowledgeable companion, providing valuable information on heart diseases and the broader domain of cardiovascular health. It offers clear and concise explanations about symptoms, preventive measures, and general insights into maintaining a healthy heart. With a user-friendly interface, the chatbot aims to simplify complex medical information, empowering users to make informed decisions and take proactive steps towards a healthier lifestyle.',
      };

      const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...apiMessages],
      };

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + OPENAI_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (response.status === 429 && retryCount < MAX_RETRIES) {
        const retryDelay = Math.pow(2, retryCount) * DEFAULT_RETRY_DELAY;
        await new Promise((resolve) => setTimeout(resolve, retryDelay * 1000));
        return processUserMessageToChatGPT(messages, retryCount + 1);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setChatMessages([
          ...messages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
          },
        ]);
      } else {
        console.error(
          'Unexpected response format from ChatGPT API',
          data
        );
      }

      setIsChatbotTyping(false);
    } catch (error) {
      console.error('Error processing user message:', error);
      setIsChatbotTyping(false);
    }
  }

  const handleMessageSend = () => {
    if (inputValue.trim() === "") return;

    handleUserMessage(inputValue);

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSend();
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <div id="chatBotContainer" className={isOpen ? 'open' : 'closed'}>
      <div className="header">
        {isOpen ? (
          <FaTimes className="cross-icon" onClick={() => setIsOpen(false)} /> // Cross icon when open
        ) : (
          <GrChat className="chat-icon" onClick={() => setIsOpen(true)} />
        )}
        {isOpen && <h2 className="chatBotTitle">Heart Health Advisor</h2>}
      </div>
      {isOpen && (
        <>
          <div className="messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.sender === "user" ? "user" : "bot"}`}>
                {message.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about heart disease risk..."
            />
            <button onClick={handleMessageSend}>Send</button>
            <GrTrash className="delete-icon" size="18px" onClick={clearChat} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
