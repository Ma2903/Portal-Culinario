import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
  FaPizzaSlice, FaBookOpen, FaBirthdayCake,
  FaPlusCircle, FaArrowLeft, FaMoon, FaSun
} from 'react-icons/fa';
import './App.css';

const socket = io("http://localhost:3001");

const roomDetails = {
  'pizza-vs-hamburguer': { name: 'Pizza vs. Hambúrguer', icon: <FaPizzaSlice /> },
  'receitas-da-vovo': { name: 'Receitas da Vovó', icon: <FaBookOpen /> },
  'dicas-confeitaria': { name: 'Dicas de Confeitaria', icon: <FaBirthdayCake /> },
};

function App() {
  const [page, setPage] = useState('username');
  const [username, setUsername] = useState('');
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLobbyModalOpen, setIsLobbyModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogin = (name) => {
    if (name.trim() !== '') {
      setUsername(name);
      setPage('chat');
      setIsLobbyModalOpen(true);
    }
  };

  const handleLogout = () => {
    setUsername('');
    setJoinedRooms([]);
    setActiveRoom(null);
    setMessages({});
    setPage('username');
  };

  const handleJoinRoom = (roomKey) => {
    if (!joinedRooms.includes(roomKey)) {
      socket.emit('joinRoom', roomKey);
      setJoinedRooms(prevRooms => [...prevRooms, roomKey]);
      setMessages(prevMessages => ({ ...prevMessages, [roomKey]: [] }));
    }
    setActiveRoom(roomKey);
    setIsLobbyModalOpen(false);
  };

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && activeRoom) {
      const messageData = {
        room: activeRoom,
        content: {
          sender: username,
          text: currentMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };

      await socket.emit("sendMessage", messageData);

      const myMessage = { ...messageData.content, senderId: 'me' };
      setMessages(prev => ({
        ...prev,
        [activeRoom]: [...(prev[activeRoom] || []), myMessage]
      }));
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      const incomingMessage = { ...data.content, senderId: 'other' };
      setMessages(prev => ({
        ...prev,
        [data.room]: [...(prev[data.room] || []), incomingMessage]
      }));
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  if (page === 'username') {
    return <UsernameScreen onLogin={handleLogin} />;
  }

  return (
    <div className="chat-container">
      {isLobbyModalOpen && (
        <LobbyModal onJoin={handleJoinRoom} onBack={() => joinedRooms.length > 0 && setIsLobbyModalOpen(false)} />
      )}

      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Olá, {username}</h3>
          <div className="theme-toggle" onClick={toggleTheme}>
            <div className="toggle-icons"><FaSun size={14} /></div>
            <label className="toggle-switch">
              <input type="checkbox" checked={theme === 'dark'} readOnly />
              <span className="slider"></span>
            </label>
            <div className="toggle-icons"><FaMoon size={12} /></div>
          </div>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </div>
        <div className="chat-list">
          {joinedRooms.map(roomKey => (
            <div
              key={roomKey}
              className={`chat-list-item ${activeRoom === roomKey ? 'active' : ''}`}
              onClick={() => setActiveRoom(roomKey)}
            >
              <div className="chat-item-icon">{roomDetails[roomKey].icon}</div>
              <div className="chat-item-name">{roomDetails[roomKey].name}</div>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <button onClick={() => setIsLobbyModalOpen(true)}>
            <FaPlusCircle /> Entrar em nova sala
          </button>
        </div>
      </div>

      <div className="chat-area">
        {activeRoom ? (
          <div className="chat-window-active">
            <div className="chat-header">
              <div className="chat-header-icon">{roomDetails[activeRoom].icon}</div>
              <p>{roomDetails[activeRoom].name}</p>
            </div>
            <div className="chat-body">
              {(messages[activeRoom] || []).map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.senderId === 'me' ? 'sent' : 'received'}`}>
                  <div className="avatar">
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                  <div className="message-bubble">
                    <div className="message-sender">{msg.senderId === 'other' ? msg.sender : ''}</div>
                    <div className="message-text">{msg.text}</div>
                    <div className="message-timestamp">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input type="text" value={currentMessage} placeholder="Digite sua mensagem..."
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>&#9658;</button>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">
            <h2>Selecione uma sala para começar a conversar!</h2>
            <p>Ou entre em uma nova sala clicando no botão na barra lateral.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const UsernameScreen = ({ onLogin }) => {
  const [name, setName] = useState('');
  return (
    <div className="username-container card">
      <h1>🍽️ Bate-Papo Culinário</h1>
      <h2>Como podemos te chamar?</h2>
      <input type="text" placeholder="Digite seu nome..." value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onLogin(name)}
      />
      <button onClick={() => onLogin(name)}>Entrar</button>
    </div>
  );
};

const LobbyModal = ({ onJoin, onBack }) => (
  <div className="modal-overlay">
    <div className="lobby-container card">
      <button onClick={onBack} className="back-button"><FaArrowLeft /></button>
      <h2>Escolha uma sala para conversar:</h2>
      <div className="room-list">
        {Object.keys(roomDetails).map(roomKey => (
          <div key={roomKey} className="room-card card" onClick={() => onJoin(roomKey)}>
            <div className="room-icon">{roomDetails[roomKey].icon}</div>
            <div className="room-name">{roomDetails[roomKey].name}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default App;