import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  password: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); 
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newUser = { name, password, email };
      await axios.post('http://localhost:5000/api/signup', newUser);
      setName('');
      setPassword('');
      setEmail('');
      fetchUsers(); // Refresh the list of users
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`); // Assuming your API endpoint for deleting users is '/api/users/:id'
      fetchUsers(); // Refresh the list of users
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <form onSubmit={addUser}>
        <h2>Add User</h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Add User</button>
        </div>
      </form>
      <hr></hr>

      <h2>Users</h2>
      <hr></hr>
      Search: <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => (
            <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
            </td>
            </tr>
        ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Users;
