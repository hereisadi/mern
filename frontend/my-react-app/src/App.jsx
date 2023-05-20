// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from 'axios';
// import {   Link } from 'react-router-dom'
// import Details from "./Details";
function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("")
  const [scholarId, setScholarId] = useState("")

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


  const isUsernameUnique = () => {
    return !listOfUsers.some(user => user.username === username);
  }

  const isScholarIdUnique = () => {
    return !listOfUsers.some(user => user.scholarId === scholarId);
  }

  const isEmailUnique = () => {
    return !listOfUsers.some(user => user.email === email);
  }

  //checking if all required fiels are filled
  const isFormValid = () => {
    return name !== "" && email !== "" && username !== "" && age != "" && branch != "" && scholarId != "";
  };


  const createUser = () => {
    // Check if all inputs are filled
    if (!isFormValid()) {
      alert("Please fill all the required fields");
      return;
    }

    // Check if the scholarId is valid
    if (!/^221\d{4}$/.test(scholarId)) {
      alert("Invalid scholar id");
      return;
    }



    //check email is unique
    if (!isEmailUnique()) {
      alert("Email is not unique");
      return;
    }

    // check if scholar id is unique
    if (!isScholarIdUnique()) {
      alert("Scholar id already exists")
      return;
    }

    // Check if the username is unique
    if (!isUsernameUnique()) {
      alert("Username is not unique");
      return;
    }

    // Check if the email matches the allowed domains
    const allowedDomains = ["cse.nits.ac.in", "civil.nits.ac.in", "me.nits.ac.in", "ece.nits.ac.in", "ee.nits.ac.in", "ei.nits.ac.in"];
    const domain = email.split("@")[1];

    if (!allowedDomains.includes(domain)) {
      alert("Only nits insitute email accepted.");
      return;
    }



    axios.post("http://localhost:3001/createUser", { name, age, username, email, branch, scholarId }).then((response) => {
      setName("");
      setAge("");
      setUsername("");
      setEmail("");
      setBranch("");
      setScholarId("")
      alert("User created 😍");
    });

    
  };

  return (
    <div>
      {listOfUsers.map((user) => (
        <div key={user.id}>
          <h1>name: {user.name}</h1>
          <h1>age: {user.age}</h1>
          <h1>username: {user.username}</h1>
          <h1>branch: {user.branch}</h1>
        </div>
      ))}
      <div>
        <input type="text" placeholder="name..." value={name} onChange={(event) => { setName(event.target.value); }} />
        <input type="text" placeholder="age" value={age} onChange={(event) => { setAge(event.target.value); }} />
        <input type="text" placeholder="username" value={username} onChange={(event) => { setUsername(event.target.value); }} />
        <input type="email" placeholder="your institute email" value={email}
          onChange={(event) => { setEmail(event.target.value); }}
        />

        <input type="text" placeholder="your scholar id" value={scholarId} onChange={(event) => { setScholarId(event.target.value); }} />
        <div>
          <label>
            <input type="radio" name="branch" value="CSE" checked={branch === "CSE"} onChange={(event) => { setBranch(event.target.value); }} />
            CSE
          </label>
          <label>
            <input type="radio" name="branch" value="Civil" checked={branch === "Civil"} onChange={(event) => { setBranch(event.target.value); }} />
            Civil
          </label>
          <label>
            <input type="radio" name="branch" value="ME" checked={branch === "ME"} onChange={(event) => { setBranch(event.target.value); }} />
            ME
          </label>
          <label>
            <input type="radio" name="branch" value="ECE" checked={branch === "ECE"} onChange={(event) => { setBranch(event.target.value); }} />
            ECE
          </label>
          <label>
            <input type="radio" name="branch" value="EE" checked={branch === "EE"} onChange={(event) => { setBranch(event.target.value); }} />
            EE
          </label>
          <label>
            <input type="radio" name="branch" value="EI" checked={branch === "EI"} onChange={(event) => { setBranch(event.target.value); }} />
            EI
          </label>
        </div>
        <button onClick={createUser}>Create User</button>
        {/* <Link to="/details">Details page</Link> */}
        {/* <Routes>
          <Route path="/details" component={Details} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
