import { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewDashboard() {
  const [assignedPapers, setAssignedPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Luăm articolele alocate acestui recenzor din Backend
  useEffect(() => {
    const fetchAssignedPapers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/papers/reviewer/assigned', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignedPapers(response.data);
      } catch (err) {
        console.error("Eroare la încărcarea articolelor alocate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, []);

  // 2. Trimitem verdictul în baza de date
  const handleVerdict = async (id, verdict) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/papers/${id}/review`, 
        { status: verdict }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Verdictul "${verdict}" a fost salvat în baza de date!`);
      
      // Actualizăm starea local ca să se schimbe culoarea în UI
      setAssignedPapers(assignedPapers.map(paper => 
        paper.id === id ? { ...paper, status: verdict } : paper
      ));
    } catch (err) {
      alert("Eroare la salvarea verdictului.");
    }
  };

  if (loading) return <div className="text-white p-10">Se încarcă articolele de evaluat...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8">Evaluări Active</h2>
      
      <div className="space-y-4">
        {assignedPapers.length > 0 ? assignedPapers.map((paper) => (
          <div key={paper.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{paper.title}</h3>
                <p className="text-gray-600 font-medium">Autor ID: {paper.authorId}</p>
                {/* BUTON PENTRU CITIRE PDF */}
                <a 
                  href={paper.fileUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-2 inline-block text-purple-600 font-bold hover:underline"
                >
                  📖 Deschide lucrarea (PDF)
                </a>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                ${paper.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${paper.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : ''}
                ${paper.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {paper.status}
              </div>
            </div>

            {paper.status === 'PENDING' && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleVerdict(paper.id, 'ACCEPTED')}
                    className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition"
                  >
                    Acceptă
                  </button>
                  <button 
                    onClick={() => handleVerdict(paper.id, 'REJECTED')}
                    className="flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition"
                  >
                    Respinge
                  </button>
                </div>
              </div>
            )}
          </div>
        )) : (
          <p className="text-gray-400 italic">Nu ai nicio lucrare alocată pentru evaluare.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewDashboard;