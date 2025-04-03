import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Phone, Mail } from 'lucide-react';

const ResidentCard = ({ resident }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/resident/${resident.id}`)}
    >
      <h3 className="text-xl font-semibold mb-2">{resident.name}</h3>
      <div className="space-y-2 text-gray-600">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>{resident.block} - {resident.flatNo}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{resident.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{resident.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ResidentCard;