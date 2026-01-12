import { useState } from 'react';

function CreateConference() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date conferință trimise:", formData);
    alert("Conferința a fost creată (simulare)!");
  };

  // Stiluri comune (același design ca la SubmitPaper)
  const inputStyle = "w-full p-3 border border-gray-300 rounded bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";
  const labelStyle = "block text-gray-700 font-bold mb-2";

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Organizează o Conferință Nouă
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Numele Conferinței */}
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

        {/* Data și Locația */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
          <div>
            <label className={labelStyle}>Locație</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Ex: București / Online"
              required
            />
          </div>
        </div>

        {/* Descriere */}
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

        {/* Buton Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Publică Conferința
        </button>
      </form>
    </div>
  );
}

export default CreateConference;