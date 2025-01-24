export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
  try {
    const response = await fetch('https://mirlo.mx/version-test/api/1.1/wf/paymentintent', {
      method: 'POST', // Cambiamos el método a POST
      headers: {
        'Content-Type': 'application/json', // Indicamos que el cuerpo será JSON
      },
      body: JSON.stringify({
        amount: 10000,
        type: 'nnat',
        user_email: 'mauroramiro19@gmail.com',
        offer_altan: '1809904534',
        phone: '+543735636388',
        uuid: 'asdfasdf',
      }), // Agregamos los parámetros en el cuerpo
    });

    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error('Failed to create PaymentIntent');
    }

    return {
      clientSecret: data.response.id, // Ajusta según la estructura de la respuesta de la API
    };
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    throw error;
  }
};