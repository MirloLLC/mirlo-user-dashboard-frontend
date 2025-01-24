import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAgentSettings } from '../hooks/useAgentSettings';

interface Rule {
  id: string;
  keyword: string;
  action: 'Transferir' | 'No Transferir';
}

export const KeywordRules = () => {
  const { state, updateField } = useAgentSettings();
  const [keyword, setKeyword] = useState('');
  const [action, setAction] = useState<'Transferir' | 'No Transferir'>('Transferir');

  const handleAddRule = () => {
    if (!keyword) return;

    const newRule = {
      id: Date.now().toString(),
      keyword,
      action,
    };

    const updatedRules = [...(state.settings.rules || []), newRule];
    updateField('rules', updatedRules, 'keywordRules');
    setKeyword('');
  };

  const handleDeleteRule = (id: string) => {
    const updatedRules = (state.settings.rules || []).filter(rule => rule.id !== id);
    updateField('rules', updatedRules, 'keywordRules');
  };

  return (
    <div id="keyword-rules" className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold">Reglas por palabras clave</h2>
          <p className="text-gray-600">Define acciones basadas en palabras clave.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <div className="flex flex-col md:flex-row gap-4 md:w-[600px]">
          <input
            type="text"
            placeholder="Palabra clave"
            className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="w-full md:w-72 h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
            value={action}
            onChange={(e) => setAction(e.target.value as 'Transferir' | 'No Transferir')}
          >
            <option value="Transferir">Transferir</option>
            <option value="No Transferir">No Transferir</option>
          </select>
        </div>
        <button
          onClick={handleAddRule}
          className="whitespace-nowrap w-[200px] h-10 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-base font-medium"
        >
          <Plus className="w-5 h-5" />
          Agregar regla
        </button>
      </div>

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
            {(state.settings.rules || []).map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap">{rule.keyword}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    rule.action === 'Transferir'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rule.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
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