import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: string;
}

export const UnwantedCalls = () => {
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: '1',
      name: 'Telcel',
      type: 'Servicios'
    }
  ]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleAddEntity = () => {
    if (!selectedEntity || !selectedType) return;

    const newEntity = {
      id: Date.now().toString(),
      name: selectedEntity,
      type: selectedType,
    };

    setEntities([...entities, newEntity]);
    setSelectedEntity('');
    setSelectedType('');
  };

  const handleDeleteEntity = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Filtra llamadas no deseadas</h2>
      <p className="text-gray-600 mb-6">Recibe el resumen en el canal seleccionado.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="flex flex-col md:flex-row gap-4 md:w-[600px]">
          <select
            className="w-full md:w-72 h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Selecciona un tipo</option>
            <option value="Banco">Banco</option>
            <option value="Servicios">Servicios</option>
            <option value="Telefonía">Telefonía</option>
          </select>
          <select
            className="w-full md:w-72 h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
          >
            <option value="">Selecciona una entidad</option>
            <option value="BBVA">BBVA</option>
            <option value="Santander">Santander</option>
            <option value="Telcel">Telcel</option>
          </select>
        </div>
        <button
          onClick={handleAddEntity}
          className="whitespace-nowrap w-[200px] h-10 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-base font-medium"
        >
          <Plus className="w-5 h-5" />
          Añadir entidad
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entities.map((entity) => (
              <tr key={entity.id}>
                <td className="px-6 py-4 whitespace-nowrap">{entity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{entity.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDeleteEntity(entity.id)}
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