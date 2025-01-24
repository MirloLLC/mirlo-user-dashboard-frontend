import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import AddCardModal from '../components/Payment/AddCardModal';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
}

const Checkout: React.FC = () => {
  const { number, packageId } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [showAddCard, setShowAddCard] = useState(false);

  // Mock data - replace with actual data
  const paymentMethods: PaymentMethod[] = [
    { id: '1', type: 'visa', last4: '4242' },
    { id: '2', type: 'mastercard', last4: '8353' }
  ];

  // Mock package data - replace with actual data lookup
  const packageData = {
    data: 5,
    days: 15,
    minutes: 200,
    sms: 100,
    price: 199,
  };

  const handleAddCard = (paymentMethodId: string) => {
    // Here you would typically update the payment methods list
    console.log('New payment method added:', paymentMethodId);
    // For now, we'll just select the new card
    setSelectedCard(paymentMethodId);
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

      <Header 
        title="Finaliza tu compra" 
        subtitle="Selecciona tu método de pago preferido"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCard === method.id
                      ? 'border-brand bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedCard === method.id}
                      onChange={(e) => setSelectedCard(e.target.value)}
                      className="w-4 h-4 text-brand"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                        {method.type === 'visa' ? (
                          <span className="text-blue-600 font-bold text-sm">VISA</span>
                        ) : (
                          <span className="text-orange-600 font-bold text-sm">MC</span>
                        )}
                      </div>
                      <span className="font-medium">•••• {method.last4}</span>
                    </div>
                  </div>
                </label>
              ))}

              <button 
                onClick={() => setShowAddCard(true)}
                className="flex items-center gap-2 text-brand hover:text-orange-600 transition-colors mt-4"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar tarjeta nueva</span>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Resumen de compra</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Recarga de {packageData.data}GB</p>
                  <p className="text-sm text-gray-600">Número: {number}</p>
                </div>
                <span className="font-medium">${packageData.price} MXN</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Datos</span>
                  <span className="font-medium">{packageData.data}GB</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Minutos</span>
                  <span className="font-medium">{packageData.minutes}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">SMS</span>
                  <span className="font-medium">{packageData.sms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Vigencia</span>
                  <span className="font-medium">{packageData.days} días</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total a pagar</span>
                <span className="text-xl font-semibold">${packageData.price} MXN</span>
              </div>

              <button
                onClick={() => {/* Handle payment */}}
                disabled={!selectedCard}
                className="w-full py-3 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-medium"
              >
                <CreditCard className="w-5 h-5" />
                Pagar ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddCardModal
        isOpen={showAddCard}
        onClose={() => setShowAddCard(false)}
        onSuccess={handleAddCard}
      />
    </div>
  );
};

export default Checkout;