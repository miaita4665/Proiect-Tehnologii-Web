import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Funcție pentru simulare rapidă a logării
  const handleSimulatedLogin = (role) => {
    let fakeUser = {};

    // Creăm un user fictiv în funcție de butonul apăsat
    switch (role) {
      case 'ORGANIZER':
        fakeUser = { name: 'Domnul Organizator', role: 'ORGANIZER' };
        break;
      case 'AUTHOR':
        fakeUser = { name: 'Studentul Autor', role: 'AUTHOR' };
        break;
      case 'REVIEWER':
        fakeUser = { name: 'Prof. Recenzor', role: 'REVIEWER' };
        break;
      default:
        fakeUser = { name: 'Vizitator', role: 'GUEST' };
    }
    
    login(fakeUser); // Salvăm userul în contextul global
    navigate('/');   // Redirecționăm către Dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-3xl font-bold mb-2 text-blue-600">Bun venit!</h2>
        <p className="mb-6 text-gray-500">Platforma de Conferințe Științifice</p>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mb-6 text-sm text-yellow-800">
          <strong>Mod Dezvoltare:</strong><br/>
          Alege un rol pentru a testa aplicația fără parolă.
        </div>
        
        <div className="space-y-3">
          {/* Buton Organizator */}
          <button 
            onClick={() => handleSimulatedLogin('ORGANIZER')}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition shadow"
          >
            Loghează-te ca ORGANIZATOR
          </button>

          {/* Buton Autor */}
          <button 
            onClick={() => handleSimulatedLogin('AUTHOR')}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded hover:bg-green-700 transition shadow"
          >
            Loghează-te ca AUTOR
          </button>

          {/* Buton Recenzor */}
          <button 
            onClick={() => handleSimulatedLogin('REVIEWER')}
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded hover:bg-purple-700 transition shadow"
          >
            Loghează-te ca RECENZOR
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          * Această pagină este temporară până la conectarea cu Backend-ul.
        </p>
      </div>
    </div>
  );
}

export default Login;