import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Link Acasă */}
        <Link to="/" className="text-white text-xl font-bold hover:text-blue-100 transition">
          CMS Conferințe
        </Link>

        {/* Meniul din dreapta */}
        <div className="space-x-4 flex items-center">
          
          {/* Link Dashboard - Apare pentru toți cei logați */}
          {user && (
            <Link to="/" className="text-white hover:text-blue-200 font-medium">
              Dashboard
            </Link>
          )}

          {/* MENIU ORGANIZATOR - Apare doar dacă ai rolul 'ORGANIZER' */}
          {user && user.role === 'ORGANIZER' && (
            <Link to="/create-conference" className="bg-white text-blue-600 px-3 py-1 rounded font-bold hover:bg-gray-100 transition">
              + Conferință
            </Link>
          )}

          {/* MENIU AUTOR - Apare doar dacă ai rolul 'AUTHOR' */}
          {user && user.role === 'AUTHOR' && (
            <Link to="/submit-paper" className="bg-green-500 text-white px-3 py-1 rounded font-bold hover:bg-green-600 transition">
              Propune Articol
            </Link>
          )}

          {/* MENIU RECENZOR - Apare doar dacă ai rolul 'REVIEWER' */}
          {user && user.role === 'REVIEWER' && (
            <Link to="/reviews" className="bg-purple-600 text-white px-3 py-1 rounded font-bold hover:bg-purple-700 transition">
              Evaluări ({2})
            </Link>
          )}

          {/* Zona Utilizator sau Buton Login */}
          {user ? (
            <div className="flex items-center gap-4 border-l pl-4 ml-4 border-blue-400">
              <div className="text-right leading-tight">
                <div className="text-blue-50 font-bold text-sm">{user.name}</div>
                <div className="text-blue-200 text-xs uppercase">{user.role}</div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-red-200 hover:text-white font-semibold text-sm border border-red-300 px-2 py-1 rounded hover:bg-red-500 hover:border-red-500 transition"
              >
                Ieși
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white font-bold hover:underline">
              Autentificare
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;