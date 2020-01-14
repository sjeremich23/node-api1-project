import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", bio: "" });
  const url = "http://localhost:4000/api/users/";

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err, err.response);
      });
  }, [render]);

  const addUser = () => {
    axios
      .post(url, newUser)
      .then(res => {
        console.log("addUser Successful", res);
        setNewUser({ name: "", bio: "" });
        setRender(!render);
      })
      .catch(error => {
        console.log("addUser Unsuccessful", error);
      });
  };

  const deleteUser = id => {
    axios
      .delete(`${url}${id}`)
      .then(res => {
        console.log("deleteUser Successful", res);
        setRender(!render);
      })
      .catch(error => {
        console.log("deleteUser Unsuccessful", error);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="App">
      <form onSubmit={addUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={newUser.name}
        />

        <input
          type="text"
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
          value={newUser.age}
        />

        <button type="submit">Submit</button>
      </form>

      <div className="users">
        {users.map(user => (
          <div className="card" key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.bio}</h3>
            <div className="delete" onClick={() => deleteUser(user.id)}>
              ✖
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
