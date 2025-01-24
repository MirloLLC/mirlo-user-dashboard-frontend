import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Copy, CreditCard, RefreshCcw } from 'lucide-react';
import Header from '../components/Header';
import UsageCircle from '../components/Lines/UsageCircle';
import CancelServiceModal from '../components/CancelServiceModal';

const LineDetails = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const formattedNumber = number?.replace(/\s+/g, '');

  const usageData = [
    { title: 'Datos', used: 0.5, total: 1, unit: 'GB' },
    { title: 'Llamadas', used: 30, total: 100, unit: 'min' },
    { title: 'SMS', used: 10, total: 50, unit: 'SMS' }
  ];

  const lineData = {
    number: formattedNumber || '',
    simId: '12342342123',
    plan: '5 GB',
    startDate: '03/03/2024',
    price: '$150.00',
    status: 'Activo',
    simType: 'SIM',
    endDate: '03/03/2024',
  };

  const history = [
    {
      type: 'Plan recurrente',
      date: '03/03/2024',
      plan: '5 GB',
      price: '$219.00 MXN',
    },
    {
      type: 'Recarga',
      date: '03/03/2024',
      plan: '5 GB',
      price: '$219.00 MXN',
    },
  ];

  const portability = {
    portedNumber: formattedNumber || '',
    portDate: '03/03/2024',
    requestDate: '03/03/2024',
    status: 'Completado',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCancelService = () => {
    setShowCancelModal(false);
    navigate('/lines');
  };

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Header title="Detalle de línea" />
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Link 
            to={`/lines/${formattedNumber}/recharge`}
            className="px-4 py-2 bg-[#0F1822] text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <CreditCard className="w-4 h-4" />
            <span className="whitespace-nowrap">RECARGAR LÍNEA</span>
          </Link>
          <Link
            to={`/lines/${formattedNumber}/change-plan`}
            className="px-4 py-2 bg-[#0F1822] text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <RefreshCcw className="w-4 h-4" />
            <span className="whitespace-nowrap">CAMBIAR PLAN</span>
          </Link>
          <button 
            onClick={() => setShowCancelModal(true)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            CANCELAR
          </button>
        </div>
      </div>

      {/* Usage Circles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {usageData.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center">
              <UsageCircle
                title={data.title}
                used={data.used}
                total={data.total}
                unit={data.unit}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Line Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Datos de línea</h3>
          <span className="text-sm text-blue-600">Renovación mensual</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Número</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">{lineData.number}</span>
              <button 
                onClick={() => copyToClipboard(lineData.number)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">ID SIM</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">{lineData.simId}</span>
              <button 
                onClick={() => copyToClipboard(lineData.simId)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Plan actual</p>
            <p className="font-medium">{lineData.plan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Inicio de servicio</p>
            <p className="font-medium">{lineData.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Precio</p>
            <p className="font-medium">{lineData.price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Estado</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {lineData.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Tipo de SIM</p>
            <p className="font-medium">{lineData.simType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Fecha fin de servicio</p>
            <p className="font-medium">{lineData.endDate}</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Historial de línea</h3>
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.type}</h4>
                  <p className="text-sm text-gray-600">Fecha: {item.date}</p>
                  <p className="text-sm text-gray-600">Plan: {item.plan}</p>
                </div>
                <p className="text-sm text-gray-600">Precio: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portability */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Portabilidad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Número portado</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">{portability.portedNumber}</span>
              <button 
                onClick={() => copyToClipboard(portability.portedNumber)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Fecha de portabilidad</p>
            <p className="font-medium">{portability.portDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Fecha de solicitud</p>
            <p className="font-medium">{portability.requestDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Estado</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {portability.status}
            </span>
          </div>
        </div>
      </div>

      <CancelServiceModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelService}
        phoneNumber={formattedNumber || ''}
      />
    </div>
  );
};

export default LineDetails;