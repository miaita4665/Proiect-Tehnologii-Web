import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

function SubmitPaper() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Pentru a dezactiva butonul în timpul upload-ului
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    conferenceId: '',
    file: null
  });

  const availableConferences = [
    { id: 1, name: "Conferința de Robotică 2026" },
    { id: 2, name: "Simpozionul de Medicină Avansată" },
    { id: 3, name: "Tech Summit București" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validare minima
    if (!formData.file) {
      alert("Te rugăm să selectezi un fișier PDF!");
      return;
    }

    setLoading(true);

    try {
      // 2. Cream obiectul FormData (necesar pentru Multer din Backend)
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('abstract', formData.abstract);
      dataToSend.append('conferenceId', formData.conferenceId);
      dataToSend.append('file', formData.file); // Numele 'file' trebuie să fie identic cu cel din backend: upload.single('file')

      // 3. Luam token-ul de login (fara el, backend-ul ne va da 401 Unauthorized)
      const token = localStorage.getItem('token');

      // 4. Trimitem cererea către Backend
      const response = await axios.post('http://localhost:5000/api/papers/upload', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Răspuns server:", response.data);
      alert("Articolul a fost încărcat cu succes în Cloudinary!");
      
      // 5. Redirectionam utilizatorul către Dashboard
      navigate('/');
      
    } catch (error) {
      console.error("Eroare la upload:", error);
      alert(error.response?.data?.message || "A apărut o eroare la încărcarea fișierului.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelStyle = "block font-bold mb-2 text-gray-700";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-4">
        Propune un Articol Științific
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className={labelStyle}>Titlul Lucrării</label>
          <input 
            type="text"
            className={inputStyle}
            placeholder="Ex: Utilizarea AI în diagnosticarea..."
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="mb-5">
          <label className={labelStyle}>Alege Conferința</label>
          <select 
            className={inputStyle}
            onChange={(e) => setFormData({...formData, conferenceId: e.target.value})}
            required
          >
            <option value="">-- Selectează o conferință --</option>
            {availableConferences.map(conf => (
              <option key={conf.id} value={conf.id}>{conf.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className={labelStyle}>Abstract (Rezumat)</label>
          <textarea 
            className={inputStyle}
            placeholder="O scurtă descriere a cercetării..."
            rows="5"
            onChange={(e) => setFormData({...formData, abstract: e.target.value})}
            required
          ></textarea>
        </div>

        <div className="mb-8">
          <label className={labelStyle}>Încarcă PDF</label>
          <input 
            type="file" 
            accept=".pdf"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-gray-300 rounded p-2 bg-gray-50"
            onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 px-6 rounded-lg transition duration-200 shadow-md`}
        >
          {loading ? "Se încarcă fișierul..." : "Trimite Propunerea"}
        </button>
      </form>
    </div>
  );
}

export default SubmitPaper;