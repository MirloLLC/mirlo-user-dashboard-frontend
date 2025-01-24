import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const PriorityContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Rafael',
      phone: '+52 55 3987 5848'
    }
  ]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = () => {
    if (!name || !phone) return;
    
    const newContact = {
      id: Date.now().toString(),
      name,
      phone: `+52 ${phone}`,
    };
    
    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Configura contactos prioritarios</h2>
      <p className="text-gray-600 mb-6">Transferiremos la llamada automáticamente.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="flex flex-col md:flex-row gap-4 md:w-[600px]">
          <input
            type="text"
            placeholder="Nombre del contacto"
            className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-2">
            <select className="h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="+52">🇲🇽 +52</option>
            </select>
            <input
              type="tel"
              placeholder="00 0000 0000"
              className="w-40 h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleAddContact}
          className="whitespace-nowrap w-[200px] h-10 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-base font-medium"
        >
          <Plus className="w-5 h-5" />
          Agregar contacto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-600 hover:text-blue-600 mr-3">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};