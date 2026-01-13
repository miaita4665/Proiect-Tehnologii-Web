import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/papers/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArticles(res.data);
      } catch (err) {
        console.error("Eroare la preluarea articolelor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const getStatusBadge = (status) => {
    let style = "bg-gray-700 text-gray-300"; 
    if (status === 'ACCEPTED') style = "bg-green-900 text-green-300 border border-green-700";
    if (status === 'REJECTED') style = "bg-red-900 text-red-300 border border-red-700";
    if (status === 'PENDING') style = "bg-yellow-900 text-yellow-300 border border-yellow-700";

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${style}`}>
        {status}
      </span>
    );
  };

  if (loading && user) return <div className="text-center p-20 text-white">Se încarcă datele din baza de date...</div>;

  // --- 1. GUEST VIEW ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">CMS Conferințe</h1>
        <p className="text-gray-300 mb-8 max-w-lg">Platforma pentru gestiunea lucrărilor științifice.</p>
        <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Autentificare
        </Link>
      </div>
    );
  }

  // --- 2. ORGANIZER & AUTHOR VIEW (UNIFICATE) ---
  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {user.role === 'ORGANIZER' ? 'Panou Organizator' : 'Articolele Mele'}
          </h1>
          <p className="text-sm text-gray-400">Salut, {user.email}!</p>
        </div>
        <div className="flex gap-3">
          {user.role === 'AUTHOR' && (
            <Link to="/submit-paper" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Propune Articol
            </Link>
          )}
          <button onClick={handleLogout} className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-2 rounded hover:bg-red-900/50 transition">
            Ieși
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-xs uppercase font-semibold">
              <th className="px-6 py-3 border-b border-gray-700">Titlu Articol</th>
              <th className="px-6 py-3 border-b border-gray-700">Autor</th>
              <th className="px-6 py-3 border-b border-gray-700">Status</th>
              <th className="px-6 py-3 border-b border-gray-700">Fișier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{art.title}</td>
                <td className="px-6 py-4 text-gray-300">
                  {/* Backend-ul tău returnează obiectul author, deci luăm email-ul */}
                  {art.author?.email || 'Anonim'}
                </td>
                <td className="px-6 py-4">{getStatusBadge(art.status)}</td>
                <td className="px-6 py-4">
                  <a 
                    href={art.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-bold"
                  >
                    Deschide PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;