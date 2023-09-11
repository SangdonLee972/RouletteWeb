import React, {useState } from 'react';
import './App.css';
import Home from './Home'; // 올바른 상대 경로
import UserContext from './UserContext';

// App.js

// ...

function App() {
  const initialUsers = [
    
    // ... 나머지 사용자들
  ];

  const [users, setUsers] = useState(initialUsers);
  const addUser = () => {
    // 랜덤한 사용자 생성 (임시 예시)
    const newUser = { name: '새 사용자', rate: Math.floor(Math.random() * 1000) };
    
    // 기존 사용자 배열에 새 사용자를 추가하고 상태 업데이트
    setUsers([...users, newUser]);
  };

  const resetUsers = () => {
    // 사용자 배열 초기화 로직
    setUsers([]);
  };


  return (
    <UserContext.Provider value={{ users }}>
      <Home addUser={addUser} resetUsers={resetUsers}  />
    </UserContext.Provider>
  );
}

export default App;
