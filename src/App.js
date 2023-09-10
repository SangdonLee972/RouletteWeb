import React from 'react';
import './App.css';
import Home from './Home'; // 올바른 상대 경로
import UserContext from './UserContext';

function App() {
    const users = [
      { name: '떡볶이', rate: 136 },
      { name: '돈가스', rate: 130 },
      { name: '초밥1', rate: 101 },
      // ... 나머지 사용자들
  ];

  return (
<UserContext.Provider value={{ users }}>
  <Home />
</UserContext.Provider>
  );
}

export default App;
