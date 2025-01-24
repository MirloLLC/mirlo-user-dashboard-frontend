import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { createSetupIntent } from '../../api/stripe';

const stripePromise = loadStripe('pk_test_51OwVCMP0vcGwtLuhGdutUMyH17TadjAIE0xOf7hXzCEMuH1t3RvcaSxN1C1vZYuT5nY0FvGQcXPGUryU265rFkR200OAwaU7cr');

interface AddCardFormProps {
  onSuccess: (paymentMethodId: string) => void;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ onSuccess }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const { clientSecret } = await createSetupIntent();
        
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Failed to load Stripe');

        const elements = stripe.elements({
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#FF5C1C',
              colorBackground: '#ffffff',
              colorText: '#1f2937',
              colorDanger: '#dc2626',
              fontFamily: 'Inter, system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '8px',
            },
          },
        });

        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');

        setStripe(stripe);
        setElements(elements);
      } catch (err) {
        setError('Error al inicializar el formulario de pago');
        console.error('Error al inicializar Stripe:', err);
      }
    };

    initializeStripe();

    // Cleanup function
    return () => {
      if (elements) {
        elements.getElement('payment')?.unmount();
      }
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { setupIntent, error } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setError(error.message || 'Error al agregar la tarjeta');
        return;
      }

      if (setupIntent.payment_method) {
        onSuccess(setupIntent.payment_method);
      }
    } catch (err) {
      setError('Ocurrió un error inesperado');
      console.error('Error de pago:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div id="payment-element" className="min-h-[150px]" />
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-brand text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base font-medium"
      >
        {loading ? 'Procesando...' : 'Agregar tarjeta'}
      </button>
    </form>
  );
};

export default AddCardForm;