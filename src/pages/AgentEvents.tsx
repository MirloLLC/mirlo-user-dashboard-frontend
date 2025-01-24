import React, { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AIUsageSummary from '../components/AgentEvents/AIUsageSummary';
import EventsTable from '../components/AgentEvents/EventsTable';
import type { Event, SortConfig } from '../types/events';

const AgentEvents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'date',
    direction: 'desc'
  });

  const [events] = useState<Event[]>([
    {
      id: '1',
      callId: 'CALL-001',
      phoneNumber: '+52 55 1234 5678',
      date: '2024-03-20',
      time: '14:30',
      duration: '2:35',
      action: 'Transferido',
      tags: ['banco', 'urgente'],
      matchedRule: 'urgente'
    },
    {
      id: '2',
      callId: 'CALL-002',
      phoneNumber: '+52 55 8765 4321',
      date: '2024-03-20',
      time: '15:45',
      duration: '1:15',
      action: 'No Transferido',
      tags: ['familiar']
    }
  ]);

  const handleEventClick = (id: string) => {
    navigate(`/agent/events/${id}`);
  };

  const handleSort = (key: keyof Event) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedEvents = useMemo(() => {
    if (!sortConfig.key) return events;

    return [...events].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [events, sortConfig]);

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <Header 
        title="Eventos del Agente" 
        subtitle="Historial de llamadas recibidas"
      />
      
      <AIUsageSummary used={3} total={10} />
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por número o etiqueta..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center w-10 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 sm:w-auto sm:px-4">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Exportar</span>
          </button>
        </div>

        <EventsTable
          events={sortedEvents}
          onEventClick={handleEventClick}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default AgentEvents;