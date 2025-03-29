import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    };
    fetchUsers();
  }, [page]);

  return (
    <div>
      <h2>User List</h2>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <h3>{user.first_name} {user.last_name}</h3>
            <p>{user.email}</p>
            <Link to={`/edit-user/${user.id}`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); 
    } catch (err) {
      alert('Error deleting user');8*i()
    }
  };
};

export default UserList;
