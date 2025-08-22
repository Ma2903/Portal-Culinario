import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {
  FaPizzaSlice, FaBookOpen, FaBirthdayCake,
  FaPlusCircle, FaArrowLeft, FaMoon, FaSun, FaUtensils, FaHeart
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './App.css';

const socket = io("http://localhost:3001");

const roomDetails = {
  'pizza-vs-hamburguer': {
    name: 'Pizza vs. Hambúrguer',
    icon: <FaPizzaSlice />,
    description: 'Debate épico entre os clássicos da culinária mundial'
  },
  'receitas-da-vovo': {
    name: 'Receitas da Vovó',
    icon: <FaBookOpen />,
    description: 'Compartilhe e descubra receitas tradicionais de família'
  },
  'dicas-confeitaria': {
    name: 'Dicas de Confeitaria',
    icon: <FaBirthdayCake />,
    description: 'Segredos e técnicas para criar doces perfeitos'
  },
};

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('chat-username') || '');
  const [page, setPage] = useState(() => (localStorage.getItem('chat-username') ? 'chat' : 'username'));
  const [joinedRooms, setJoinedRooms] = useState(() => JSON.parse(localStorage.getItem('chat-joinedRooms')) || []);
  const [activeRoom, setActiveRoom] = useState(() => localStorage.getItem('chat-activeRoom') || null);
  
  const [messages, setMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLobbyModalOpen, setIsLobbyModalOpen] = useState(() => !localStorage.getItem('chat-activeRoom') && localStorage.getItem('chat-username'));
  const [theme, setTheme] = useState(() => localStorage.getItem('chat-theme') || 'light');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chat-username', username);
    localStorage.setItem('chat-joinedRooms', JSON.stringify(joinedRooms));
    localStorage.setItem('chat-activeRoom', activeRoom || '');
  }, [username, joinedRooms, activeRoom]);

  // Efeito dedicado a gerenciar o tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chat-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (name) => {
    if (name.trim() !== '') {
      setUsername(name);
      setPage('chat');
      setIsLobbyModalOpen(true);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você será desconectado do chat.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button-custom',
        cancelButton: 'swal-cancel-button-custom'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('chat-username');
        localStorage.removeItem('chat-joinedRooms');
        localStorage.removeItem('chat-activeRoom');
        setUsername('');
        setJoinedRooms([]);
        setActiveRoom(null);
        setMessages({});
        setPage('username');
      }
    });
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
    joinedRooms.forEach(room => socket.emit('joinRoom', room));

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
  }, [joinedRooms]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages[activeRoom]]);

  if (page === 'username') {
    return (
      <div className="login-page-wrapper">
        <UsernameScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="chat-container">
      {isLobbyModalOpen && (
        <LobbyModal
          onJoin={handleJoinRoom}
          onBack={() => setIsLobbyModalOpen(false)}
          showBackButton={joinedRooms.length > 0}
        />
      )}

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-info">
            <div className="user-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="user-status">
              <div className="user-name">Olá, {username}</div>
              <div className="online-indicator">
                <div className="status-dot"></div>
                Online
              </div>
            </div>
          </div>
          <div className="theme-toggle">
          <div className="toggle-icons" onClick={toggleTheme}><FaSun size={14} /></div>
          <label className="toggle-switch" onClick={toggleTheme}>
            <input type="checkbox" checked={theme === 'dark'} readOnly style={{ pointerEvents: 'none' }} />
            <span className="slider"></span>
          </label>
          <div className="toggle-icons" onClick={toggleTheme}><FaMoon size={12} /></div>
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
              <div className="chat-item-info">
                <div className="chat-item-name">{roomDetails[roomKey].name}</div>
                <div className="chat-item-preview">Toque para abrir</div>
              </div>
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
              <div className="chat-header-info">
                <h3>{roomDetails[activeRoom].name}</h3>
                <p>{roomDetails[activeRoom].description}</p>
              </div>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
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
            <div className="welcome-icon">
              <FaUtensils />
            </div>
            <h2>Selecione uma sala para começar a conversar!</h2>
            <p>Explore nossas salas temáticas e compartilhe sua paixão pela culinária com outros entusiastas!</p>
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
      <h1><FaUtensils /> Bate-Papo Culinário</h1>
      <h2>Como podemos te chamar?</h2>
      <input type="text" placeholder="Digite seu nome..." value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onLogin(name)}
      />
      <button onClick={() => onLogin(name)}>
        <FaHeart /> Entrar no Chat
      </button>
    </div>
  );
};

const LobbyModal = ({ onJoin, onBack, showBackButton }) => (
  <div className="modal-overlay">
    <div className="lobby-container card">
      {showBackButton && (
        <button onClick={onBack} className="back-button"><FaArrowLeft /></button>
      )}
      <h2>Escolha uma sala para conversar:</h2>
      <div className="room-list">
        {Object.keys(roomDetails).map(roomKey => (
          <div key={roomKey} className="room-card card" onClick={() => onJoin(roomKey)}>
            <div className="room-icon">{roomDetails[roomKey].icon}</div>
            <div className="room-info">
              <div className="room-name">{roomDetails[roomKey].name}</div>
              <div className="room-description">{roomDetails[roomKey].description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default App;