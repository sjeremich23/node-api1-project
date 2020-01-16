import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user-list.css";
import Family from "./family.jpg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", bio: "" });
  const api = "http://localhost:4000/api/users/";

  useEffect(() => {
    axios
      .get(api)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err, err.response);
      });
  }, [render]);

  const addUser = () => {
    axios
      .post(api, newUser)
      .then(() => {
        setNewUser({ name: "", bio: "" });
        setRender(!render);
      })
      .catch(err => {
        console.log(err, err.response);
      });
  };

  const deleteUser = id => {
    axios
      .delete(`${api}${id}`)
      .then(() => {
        setRender(!render);
      })
      .catch(err => {
        console.log(err, err.response);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="App">
      <img src={Family} alt="family" />
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
          value={newUser.bio}
        />

        <button type="submit">Submit</button>
        <h1>My Family</h1>
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
};

export default UserList;
