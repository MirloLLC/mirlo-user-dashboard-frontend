import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy } from 'lucide-react';
import Header from '../components/Header';

const DeviceDetail: React.FC = () => {
  const { serialNumber } = useParams();
  const navigate = useNavigate();

  const deviceData = {
    image: "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Ff89a16b547d089fc90bb7c57f504561e.cdn.bubble.io%2Ff1733184532912x499022335313091600%2Fxiaomi-redmi-a3-img-1.png?w=256&h=256&auto=compress&dpr=1&fit=max",
    name: "Samsung Galaxy A14",
    purchaseDate: "02/03/24",
    brand: "Samsung",
    model: "Galaxy A14 5G Negro",
    shipmentDate: "10/03/24",
    serialNumber: "123412342123812352",
    price: "3290 MXN",
    imei: "123456789876543345",
    status: "Entregado"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <Header title="Detalle del dispositivo" />

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Device Image */}
          <div className="w-full md:w-1/3">
            <img 
              src={deviceData.image} 
              alt={deviceData.name}
              className="w-full object-contain rounded-lg"
            />
          </div>

          {/* Device Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-6">{deviceData.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha de compra</p>
                <p className="font-medium">{deviceData.purchaseDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">Marca</p>
                <p className="font-medium">{deviceData.brand}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Modelo</p>
                <p className="font-medium">{deviceData.model}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Fecha de envío</p>
                <p className="font-medium">{deviceData.shipmentDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Número de serie</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{deviceData.serialNumber}</span>
                  <button 
                    onClick={() => copyToClipboard(deviceData.serialNumber)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Precio</p>
                <p className="font-medium">{deviceData.price}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">IMEI</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{deviceData.imei}</span>
                  <button 
                    onClick={() => copyToClipboard(deviceData.imei)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Estado</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {deviceData.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;