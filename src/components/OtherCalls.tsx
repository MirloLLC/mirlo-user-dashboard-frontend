import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface KeywordRule {
  id: string;
  keyword: string;
  action: 'Transferir' | 'No Transferir';
}

const OtherCalls = () => {
  const [rules, setRules] = useState<KeywordRule[]>([
    { id: '1', keyword: 'mirlo', action: 'Transferir' },
    { id: '2', keyword: 'cobros', action: 'No Transferir' },
    { id: '3', keyword: 'familiar', action: 'Transferir' },
    { id: '4', keyword: 'Otros', action: 'No Transferir' },
  ]);

  const toggleAction = (id: string) => {
    setRules(rules.map(rule => {
      if (rule.id === id) {
        return {
          ...rule,
          action: rule.action === 'Transferir' ? 'No Transferir' : 'Transferir'
        };
      }
      return rule;
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-2">Otras Llamadas</h2>
      <p className="text-gray-600 mb-6">Define la acción por defecto para todas tus otras llamadas.</p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Palabra clave</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap">{rule.keyword}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleAction(rule.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      rule.action === 'Transferir'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {rule.action}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-600 hover:text-blue-600 mr-3">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
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

export default OtherCalls;