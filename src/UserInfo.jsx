import React, { useContext } from 'react'; // useContext를 import
import UserContext from './UserContext';

const UserInfo = () => {
    const { users } = useContext(UserContext); // UserContext에서 users 데이터를 가져옴
    console.log(users);
    const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

    return (
        <div style={{ width: '45%', backgroundColor: '#555', padding: '20px', borderRadius: '10px' }}>
            <h3>Users</h3>
            {users.map(user => (
                <div key={user.name} style={{ margin: '10px 0', color: '#fff' }}>
                    <span style={{ color: colors[users.indexOf(user) % colors.length], marginRight: '10px' }}>■</span>
                    {user.name}
                </div>
            ))}
        </div>
    );
}

export default UserInfo;
