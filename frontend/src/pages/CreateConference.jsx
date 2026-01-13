import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateConference() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Trimitem datele către backend (verifică dacă ruta este corectă, ex: /api/conferences)
      const response = await axios.post('http://localhost:5000/api/conferences', formData, {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      console.log("Conferință creată:", response.data);
      alert("Conferința a fost creată cu succes în baza de date!");
      
      // Redirecționăm organizatorul la Dashboard
      navigate('/'); 
    } catch (error) {
      console.error("Eroare la crearea conferinței:", error);
      alert(error.response?.data?.message || "Eroare la comunicarea cu serverul.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelStyle = "block text-gray-700 font-bold mb-2";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Organizează o Conferință Nouă
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className={labelStyle}>Nume Conferință</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
            placeholder="Ex: Conferința de Robotică 2026"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 mb-5">
          <div>
            <label className={labelStyle}>Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <label className={labelStyle}>Descriere</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={inputStyle}
            placeholder="Detalii despre tematica conferinței..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 px-4 rounded-lg transition shadow-md`}
        >
          {loading ? "Se salvează..." : "Publică Conferința"}
        </button>
      </form>
    </div>
  );
}

export default CreateConference;