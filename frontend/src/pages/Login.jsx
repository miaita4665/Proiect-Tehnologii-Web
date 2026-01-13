import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRealLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });


      const { token, user } = response.data;

      login(user, token); 
      
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Eroare la conectare. Verifică serverul!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-3xl font-bold mb-2 text-blue-600">Conectare</h2>
        <p className="mb-6 text-gray-500">Introdu datele tale reale</p>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleRealLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Adresa de email"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Parola"
            className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition shadow"
          >
            AUTENTIFICARE
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          * Datele sunt verificate în baza de date MySQL.
        </p>
      </div>
    </div>
  );
}

export default Login;