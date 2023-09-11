import React, { useRef, useState, useEffect,useContext } from 'react';
import './Roulette.css';
import UserContext from './UserContext';

const Roulette = ( { onRouletteEnd  }  ) => {

    const canvasRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [rouletteKey, setRouletteKey] = useState(0);
    const [timer, setTimer] = useState(120);
    const [GetReady,setReady] = useState(false);
    const { users } = useContext(UserContext);
    const [rotating, setRotating] = useState(false);
    const lineWidth = 10;
    const totalRate = users.reduce((acc, user) => acc + user.rate, 0);
    const colors = [
      "#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236",
      "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"
    ];
    const userAngles = [];
    const textContainerRef = useRef(null); // textContainerRef를 추가합니다.

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const [cw, ch] = [canvas.width / 2, canvas.height / 2];
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        if (users.length === 0) {
            setReady(false);
          // users 배열이 비어있을 때 회색 원을 그립니다.
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.arc(cw, ch, cw - lineWidth, 0, 2 * Math.PI);
          ctx.strokeStyle = '#ccc'; // 회색으로 설정
          ctx.stroke();
        } else {
            setReady(true);

          // users 배열이 비어있지 않을 때 각 사용자에 대한 확률 원을 그립니다.
          let startAngle = (3 * Math.PI) / 2;
          users.forEach(user => {
            const arc = 2 * Math.PI * (user.rate / totalRate);
            userAngles.push({ start: startAngle, end: startAngle + arc });
      
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.arc(cw, ch, cw - lineWidth, startAngle + 0.005, startAngle + arc - 0.005);
            ctx.strokeStyle = colors[users.indexOf(user) % colors.length];
            ctx.stroke();
      
            startAngle += arc;
          });
      
          users.forEach(user => {
            const probability = (user.rate / totalRate) * 100;
            console.log(`${user.name}의 확률: ${probability.toFixed(2)}%`);
          });
        }
      
        const textContainer = textContainerRef.current;
        textContainer.style.position = 'absolute';
        textContainer.style.left = `${cw}px`;
        textContainer.style.top = `${ch + 50}px`;
        textContainer.style.transform = 'translateX(-50%)';
        textContainer.style.color = '#fff'; // 텍스트 색상 변경
        textContainer.style.font = '24px Pretendard'; // 텍스트 크기 변경
        textContainer.style.textAlign = 'center';
        textContainer.innerHTML = `<span style="color: #000; font-size: 20px;">GAME BANK</span><br><span style="font-size: 33px;">$${totalRate.toFixed(2)}</span>`;
      
        // 나머지 코드는 그대로 유지
      }, [users]);
      
    
    const rotate = () => {
        if (rotating) return; // 이미 룰렛이 돌고 있으면 무시
        if(!GetReady) return;
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
            canvas.style.transition = 'none'; // 애니메이션 비활성화
            canvas.style.transform = ''; // 룰렛을 초기 위치로 이동
            setRotating(false); // 룰렛 돌리기가 끝났으므로 false로 설정
            onRouletteEnd();
        }, 3000);
    };

// 코드
return (
    <div className="roulette-container" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} width="380" height="380" key={rouletteKey}></canvas>
        {/* 텍스트 컨테이너를 추가 */}
        <div ref={textContainerRef}></div>
      </div>
      <button onClick={rotate}>룰렛 돌리기</button>
    </div>
  );
  
      
    }      
export default Roulette;
