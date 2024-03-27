import React from 'react'
import { Container } from '../components';
import UserService from '../api/UserService';


const Read = () => {
    const fetchUsers = async () => {
        const users = await UserService.getAllUsers();

        console.log(users);
      };
    
      return (
        <Container>
          <button onClick={fetchUsers}>Get All Users</button>
        </Container>
      );
    }

export default Read