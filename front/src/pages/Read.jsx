import React, { useState, useEffect } from 'react'
import { Container } from '../components';
import UserService from '../api/UserService';


const Read = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
      const fetchedUsers = await UserService.getAllUsers();
      setUsers(fetchedUsers)

      console.log(users);
    };

    
    
      return (
        <Container>
          <button onClick={fetchUsers}>Get All Users</button>
          <div>
                {users.length > 0 ? (
                    users.map((user, index) => (
                        <div key={index}>
                            <h3>{user.first_name} {user.last_name}</h3>
                            <p>ID: {user.id}</p>
                            <p>University: {user.university}</p>
                            <p>Email: {user.email_address}</p>
                            <p>Age: {user.age}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </Container>
        
      );
    }

export default Read