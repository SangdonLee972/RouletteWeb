// Home.jsx

import React, { useState, useEffect } from 'react';
import Roulette from './Roulette';
import UserInfo from './UserInfo';
import History from './History';
import './Home.css'; // CSS import
import UserContext from './UserContext';

const Home = () => {
    const [resetRoulette, setResetRoulette] = useState(false); // 룰렛 초기화 상태 추가

    // Roulette 컴포넌트의 룰렛이 끝났을 때 호출될 콜백 함수
    const handleRouletteEnd = () => {
        setResetRoulette(true); // 룰렛 초기화를 요청
    };

    useEffect(() => {
        if (resetRoulette) {
            // 룰렛 초기화 상태가 변경되면 초기화를 요청하고 다시 초기화 상태를 false로 설정
            setResetRoulette(false);
        }
    }, [resetRoulette]);

    return (
        <div className="home-container">
            <div className="home-main">
                {/* Roulette 컴포넌트에 초기화 콜백 함수와 resetRoulette 상태를 전달 */}
                <Roulette onRouletteEnd={handleRouletteEnd} resetRoulette={resetRoulette} />
                <UserInfo />
            </div>
            <div>
                <History />
            </div>
        </div>
    );
}

export default Home;
