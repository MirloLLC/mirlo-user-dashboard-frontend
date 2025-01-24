import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-600 mb-8">
          Tu recarga se ha procesado correctamente y estará activa en los próximos minutos.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Número</span>
            <span className="font-medium">55 1234 5678</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Plan</span>
            <span className="font-medium">5GB - 15 días</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monto</span>
            <span className="font-medium">$199.00 MXN</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/lines')}
          className="w-full py-3 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          Ver mis líneas
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;