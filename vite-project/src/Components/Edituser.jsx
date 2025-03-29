import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  

const EditUser = () => {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();  
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      navigate('/users');  
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditUser;
