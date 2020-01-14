import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userList.css";
import Family from "./family.jpg";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", bio: "" });
  const url = "http://localhost:4000/api/users/";

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err, err.response);
      });
  }, [render]);

  const addUser = () => {
    axios
      .post(url, newUser)
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
      .delete(`${url}${id}`)
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
};

export default UserList;
