import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import AddCardForm from '../components/Payment/AddCardForm';

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
}

const Checkout: React.FC = () => {
  const { number, packageId } = useParams();
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stripeApiKey =
    'sk_test_51OwVCMP0vcGwtLuhGdutUMyH17TadjAIE0xOf7hXzCEMuH1t3RvcaSxN1C1vZYuT5nY0FvGQcXPGUryU265rFkR200OAwaU7cr';
  const customerId = 'cus_RbYg6e15XWd2CA';

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_methods?customer=${customerId}&type=card`,
          {
            headers: {
              Authorization: `Bearer ${stripeApiKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error fetching payment methods from Stripe');
        }

        const data = await response.json();
        const methods: PaymentMethod[] = data.data.map((method: any) => ({
          id: method.id,
          type: method.card.brand,
          last4: method.card.last4,
        }));

        setPaymentMethods(methods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleAddCard = (paymentMethodId: string) => {
    setPaymentMethods(prev => [...prev, { id: paymentMethodId, type: 'new', last4: '****' }]);
    setSelectedCard(paymentMethodId);
    setShowAddCard(false);
  };

  const handleCardSelection = (cardId: string) => {
    setSelectedCard(cardId);
    setShowAddCard(false);
  };

  const handleShowAddCard = () => {
    setShowAddCard(true);
    setSelectedCard('');
  };

  const packageData = {
    data: 5,
    days: 15,
    minutes: 200,
    sms: 100,
    price: 199,
  };

  const handlePayment = async () => {
    if (!selectedCard) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('https://mirlo.mx/version-test/api/1.1/wf/payment_card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000,
          type: 'nnat',
          user_email: 'mauroramiro19@gmail.com',
          offer_altan: '1809904534',
          phone: '+543735636388',
          uuid: 'asdfasdfaaaaaa',
          customer: customerId,
          payment_method: selectedCard,
        }),
      });

      const data = await response.json();

      if (data.status === 'success' && data.response.status === 'succeeded') {
        navigate('/payment-success');
      } else {
        setError('El pago falló. Por favor intenta nuevamente con otra tarjeta.');
      }
    } catch (error) {
      setError('Ocurrió un error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
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

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Método de pago</h2>
            {paymentMethods.length > 0 && !showAddCard && (
              <div className="space-y-4 mb-6">
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
                        onChange={(e) => handleCardSelection(e.target.value)}
                        className="w-4 h-4 text-brand"
                      />
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                          <div className="card-brand">{method.type}</div>
                          <span className="font-medium">•••• {method.last4}</span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {!showAddCard && (
              <button
                onClick={handleShowAddCard}
                className="flex items-center gap-2 text-brand hover:text-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar tarjeta nueva</span>
              </button>
            )}

            {showAddCard && (
              <div className="mt-6">
                <AddCardForm onSuccess={handleAddCard} amount={packageData.price} />
              </div>
            )}
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
                <span className="text-xl font-semibold">
                  ${packageData.price} MXN
                </span>
              </div>

              {!showAddCard && selectedCard && (
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full py-3 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-medium"
                >
                  <CreditCard className="w-5 h-5" />
                  {isProcessing ? 'Procesando...' : 'Pagar ahora'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;