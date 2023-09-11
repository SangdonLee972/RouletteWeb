import React, { useState, useEffect, useContext } from 'react';
import Roulette from './Roulette';
import UserInfo from './UserInfo';
import History from './History';
import './Home.css'; // CSS import
import UserContext from './UserContext';

const Home = ({ addUser ,resetUsers }) => { // addUser 함수를 props로 받아옴


  // ...

  return (
    <div className="home-container">
      <div className="home-main">
      <Roulette onRouletteEnd={resetUsers} />   
           <UserInfo />
        {/* "참여하기" 버튼을 추가하고 클릭 시 addUser 함수 호출 */}
        <button onClick={addUser}>참여하기</button>
      </div>
      <div>
        <History />
      </div>
    </div>
  );
}

export default Home;
