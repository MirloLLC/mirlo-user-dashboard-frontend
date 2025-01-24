export const createSetupIntent = async (): Promise<{ clientSecret: string }> => {
  try {
    const response = await fetch('https://mirlo.mx/version-test/api/1.1/wf/setupidstripe');
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error('Failed to create SetupIntent');
    }

    return {
      clientSecret: data.response.id
    };
  } catch (error) {
    console.error('Error creating SetupIntent:', error);
    throw error;
  }
};