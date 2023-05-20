// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Details = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getUsers");
                setListOfUsers(response.data);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div>

            {listOfUsers.map((user) => (
                <div key={user.id}>
                    <h1>name: {user.name}</h1>
                    <h1>age: {user.age}</h1>
                    <h1>username: {user.username}</h1>
                </div>
            ))}
        </div>
    )
}

export default Details