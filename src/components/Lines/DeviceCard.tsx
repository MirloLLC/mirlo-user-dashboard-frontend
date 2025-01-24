import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeviceCardProps {
  name: string;
  imageUrl: string;
  serialNumber: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ name, imageUrl, serialNumber }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <img src={imageUrl} alt={name} className="w-24 h-24 object-contain" />
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">{name}</h3>
          <Link 
            to={`/devices/${serialNumber}`}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
          >
            Ver detalle
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;