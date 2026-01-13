import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Stări pentru datele din backend
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- FETCH DATE REALE ---
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('token');
        // Chemăm ruta ta de dashboard (asigură-te că URL-ul e corect)
        const response = await axios.get('http://localhost:5000/api/papers/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setArticles(response.data);
      } catch (err) {
        console.error("Eroare la încărcarea articolelor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchArticles();
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

  if (loading) return <div className="text-center p-10 text-white">Se încarcă datele din baza de date...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      {/* Header-ul (păstrăm stilul tău) */}
      <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {user?.role === 'ORGANIZER' ? 'Panou Organizator' : 'Articolele Mele'}
          </h1>
          <p className="text-sm text-gray-400">Salut, {user?.email}!</p>
        </div>
        <div className="flex gap-3">
          {user?.role === 'AUTHOR' && (
            <Link to="/submit-paper" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Propune Articol
            </Link>
          )}
          <button onClick={handleLogout} className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-2 rounded hover:bg-red-900/50 transition">
            Ieși
          </button>
        </div>
      </div>

      {/* Tabelul cu date din MySQL */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 text-gray-400 text-xs uppercase font-semibold">
              <th className="px-6 py-3 border-b border-gray-700">Titlu Articol</th>
              <th className="px-6 py-3 border-b border-gray-700">Status</th>
              <th className="px-6 py-3 border-b border-gray-700">Fișier Cloudinary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {articles.length > 0 ? (
              articles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{art.title}</td>
                  <td className="px-6 py-4">{getStatusBadge(art.status)}</td>
                  <td className="px-6 py-4">
                    <a 
                      href={art.fileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2"
                    >
                      📄 Vezi PDF
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-10 text-center text-gray-500 italic">
                  Nu am găsit nicio lucrare în baza de date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;