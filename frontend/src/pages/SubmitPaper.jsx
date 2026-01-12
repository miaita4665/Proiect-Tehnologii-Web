import { useState } from 'react';

function SubmitPaper() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Articol propus:", formData);
    alert("Articolul a fost încărcat cu succes! (Status: In Review)");
  };

  // Stil comun pentru input-uri (ca să arate toate la fel)
  const inputStyle = "w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelStyle = "block font-bold mb-2 text-gray-700";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-4">
        Propune un Articol Științific
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Titlu */}
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

        {/* Selectare Conferință */}
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

        {/* Abstract */}
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

        {/* Upload Fisier */}
        <div className="mb-8">
          <label className={labelStyle}>Încarcă PDF</label>
          <input 
            type="file" 
            accept=".pdf"
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer border border-gray-300 rounded p-2 bg-gray-50"
            onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
            required
          />
          <p className="text-xs text-gray-500 mt-1">Doar fișiere .pdf (Max 10MB)</p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Trimite Propunerea
        </button>
      </form>
    </div>
  );
}

export default SubmitPaper;