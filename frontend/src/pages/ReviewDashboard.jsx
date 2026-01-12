import { useState } from 'react';

function ReviewDashboard() {
  const [assignedPapers, setAssignedPapers] = useState([
    { id: 101, title: "Algoritmi cuantici în 2026", author: "Popescu Ion", status: "PENDING" },
    { id: 102, title: "Impactul 5G asupra agriculturii", author: "Maria Ionescu", status: "PENDING" },
    { id: 103, title: "Securitatea rețelelor neurale", author: "Alex Dima", status: "ACCEPTED" } // Unul deja rezolvat
  ]);

  const handleVerdict = (id, verdict) => {
    alert(`Ai dat verdictul: ${verdict} pentru articolul ${id}`);
    setAssignedPapers(assignedPapers.map(paper => 
      paper.id === id ? { ...paper, status: verdict } : paper
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Evaluări Active</h2>
        <span className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold">
          {assignedPapers.filter(p => p.status === 'PENDING').length} în așteptare
        </span>
      </div>
      
      <div className="space-y-4">
        {assignedPapers.map((paper) => (
          // IMPORTANT: bg-white și text-gray-800 pentru contrast corect
          <div key={paper.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{paper.title}</h3>
                <p className="text-gray-600 font-medium">Autor: {paper.author}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">ID Articol: #{paper.id}</p>
              </div>
              
              {/* Eticheta Status */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                ${paper.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${paper.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : ''}
                ${paper.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {paper.status}
              </div>
            </div>

            {/* Zona de Acțiune - Doar dacă e PENDING */}
            {paper.status === 'PENDING' ? (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <textarea 
                  className="w-full border border-gray-300 bg-gray-50 text-gray-900 p-3 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                  placeholder="Scrie feedback pentru autor (obligatoriu pentru respingere)..."
                  rows="2"
                ></textarea>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleVerdict(paper.id, 'ACCEPTED')}
                    className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition shadow"
                  >
                    Acceptă
                  </button>
                  <button 
                    onClick={() => handleVerdict(paper.id, 'REJECTED')}
                    className="flex-1 bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700 transition shadow"
                  >
                    Respinge
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm font-bold text-gray-400 italic">
                Evaluare finalizată. Nu se mai pot face modificări.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewDashboard;