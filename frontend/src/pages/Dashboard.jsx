import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- DATE SIMULATE ---
  const allArticles = [
    { id: 1, title: "Utilizarea AI în Medicină", author: "Studentul Autor", conference: "Tech 2026", status: "PENDING" },
    { id: 2, title: "Impactul 5G", author: "Maria Ionescu", conference: "Tech 2026", status: "ACCEPTED" },
    { id: 3, title: "Algoritmi de Sortare", author: "Andrei Popa", conference: "InfoEdu", status: "REJECTED" },
  ];

  const myArticles = [
    { id: 1, title: "Utilizarea AI în Medicină", conference: "Tech 2026", date: "12.01.2026", status: "PENDING" },
    { id: 4, title: "Securitatea Datelor", conference: "CyberSec 2025", date: "10.11.2025", status: "ACCEPTED" },
  ];

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

  // --- 1. GUEST VIEW (DARK) ---
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">CMS Conferințe</h1>
        <p className="text-gray-300 mb-8 max-w-lg">
          Platforma completă pentru gestionarea conferințelor științifice.
        </p>
        <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Autentificare
        </Link>
      </div>
    );
  }

  // --- 2. ORGANIZER VIEW (DARK) ---
  if (user.role === 'ORGANIZER') {
    return (
      <div className="p-6 max-w-6xl mx-auto min-h-screen">
        <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Panou Organizator</h1>
            <p className="text-sm text-gray-400">Salut, {user.name}!</p>
          </div>
          <div className="flex gap-3">
            <Link to="/create-conference" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              + Conferință
            </Link>
            <button onClick={handleLogout} className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-2 rounded hover:bg-red-900/50 transition">
              Ieși
            </button>
          </div>
        </div>

        {/* Statistici Dark */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded shadow border-l-4 border-blue-500">
            <h3 className="text-gray-400 text-xs font-bold uppercase">Total Articole</h3>
            <p className="text-3xl font-bold text-white mt-2">{allArticles.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow border-l-4 border-yellow-500">
            <h3 className="text-gray-400 text-xs font-bold uppercase">În Așteptare</h3>
            <p className="text-3xl font-bold text-white mt-2">1</p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow border-l-4 border-green-500">
            <h3 className="text-gray-400 text-xs font-bold uppercase">Conferințe Active</h3>
            <p className="text-3xl font-bold text-white mt-2">2</p>
          </div>
        </div>

        {/* Tabel Dark */}
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-xs uppercase font-semibold">
                <th className="px-6 py-3 border-b border-gray-700">Titlu Articol</th>
                <th className="px-6 py-3 border-b border-gray-700">Autor</th>
                <th className="px-6 py-3 border-b border-gray-700">Status</th>
                <th className="px-6 py-3 border-b border-gray-700">Acțiuni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {allArticles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{art.title}</td>
                  <td className="px-6 py-4 text-gray-300">{art.author}</td>
                  <td className="px-6 py-4">{getStatusBadge(art.status)}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-bold border border-blue-900 px-3 py-1 rounded hover:bg-blue-900/30">
                      Alocă
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --- 3. AUTHOR VIEW (DARK) ---
  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
       <div className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <div>
            <h1 className="text-2xl font-bold text-white">Articolele Mele</h1>
            <p className="text-sm text-gray-400">Salut, {user.name}!</p>
          </div>
          <div className="flex gap-3">
            <Link to="/submit-paper" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Propune
            </Link>
            <button onClick={handleLogout} className="bg-red-900/30 text-red-400 border border-red-800 px-4 py-2 rounded hover:bg-red-900/50 transition">
              Ieși
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-xs uppercase font-semibold">
                <th className="px-6 py-3 border-b border-gray-700">Titlu</th>
                <th className="px-6 py-3 border-b border-gray-700">Conferință</th>
                <th className="px-6 py-3 border-b border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {myArticles.map((art) => (
                <tr key={art.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{art.title}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{art.conference}</td>
                  <td className="px-6 py-4">{getStatusBadge(art.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Dashboard;