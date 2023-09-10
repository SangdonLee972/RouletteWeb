import React, { useRef, useState, useEffect,useContext } from 'react';
import './Roulette.css';
import UserContext from './UserContext';

const Roulette = ( { onRouletteEnd }  ) => {

    const canvasRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [rouletteKey, setRouletteKey] = useState(0); // 추가: 룰렛의 key 값을 관리하는 state
    const [timer, setTimer] = useState(120); // 타이머 상태 추가
    const { users } = useContext(UserContext);
    const [rotating, setRotating] = useState(false); // 룰렛이 돌아가는 동안 true로 설정
    const lineWidth = 10;  // 선의 두께를 변수로 지정
    const totalRate = users.reduce((acc, user) => acc + user.rate, 0);
    const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];
    console.log(users);

    const userAngles = [];  // 각 사용자의 시작과 종료 각도를 저장하는 배열

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const [cw, ch] = [canvas.width / 2, canvas.height / 2];
    
   

        let startAngle = (3 * Math.PI) / 2;
        users.forEach(user => {
            const arc = 2 * Math.PI * (user.rate / totalRate);
            userAngles.push({ start: startAngle, end: startAngle + arc });
    
            // 외곽선만 그리기
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.arc(cw, ch, cw - lineWidth, startAngle + 0.005, startAngle + arc - 0.005); // 각도를 조금씩 조절
            ctx.strokeStyle = colors[users.indexOf(user) % colors.length];
            ctx.stroke();
    
            ctx.fillStyle = "#000";
            ctx.font = "24px Pretendard";
            ctx.textAlign = "center";
            ctx.fillText("룰렛 돌리기", cw, ch - 20);
            ctx.font = "50px Pretendard";
            ctx.fillText(timer, cw, ch + 50); // 타이머 표시

    
            startAngle += arc;
        });

        users.forEach(user => {
            const probability = (user.rate / totalRate) * 100;
            console.log(`${user.name}의 확률: ${probability.toFixed(2)}%`);
        });


    }, [users]);
    const rotate = () => {
        if (rotating) return; // 이미 룰렛이 돌고 있으면 무시

        setRotating(true); // 룰렛을 돌리는 중으로 설정


        const canvas = canvasRef.current;

        const randomNum = Math.random() * totalRate;
        let sum = 0;
        let selectedUser;

        for (let i = 0; i < users.length; i++) {
            sum += users[i].rate;
            if (randomNum <= sum) {
                selectedUser = users[i];
                break;
            }
        }

        const degreeToRotate = 3600 + 360 * randomNum / totalRate;

        const newRotation = rotation + degreeToRotate;

        canvas.style.transition = `3s`;
        canvas.style.transform = `rotate(-${newRotation}deg)`;


     


        setTimeout(() => {
            alert(`${selectedUser.name}님이 이겼습니다!`);
            setRotation(0);
            onRouletteEnd(); // 이 부분에서 onRouletteEnd 콜백을 호출하여 룰렛이 끝났음을 알립니다.
            setRotating(false); // 룰렛 돌리기가 끝났으므로 false로 설정
        }, 3000);
    };

    return (
        <div>
            <canvas ref={canvasRef} width="380" height='380' key={rouletteKey}></canvas> {/* 변경: canvas에 key prop 추가 */}
            <button onClick={rotate}>룰렛 돌리기</button>
        </div>
    );
}

export default Roulette;
