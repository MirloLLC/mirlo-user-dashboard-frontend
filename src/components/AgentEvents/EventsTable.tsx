import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Play, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';
import TranscriptModal from './TranscriptModal';
import type { Event, SortConfig } from '../../types/events';

interface EventsTableProps {
  events: Event[];
  onEventClick: (id: string) => void;
  sortConfig: SortConfig;
  onSort: (key: keyof Event) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({
  events,
  onEventClick,
  sortConfig,
  onSort,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const getSortIcon = (key: keyof Event) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Mock transcript data - replace with actual data
  const mockTranscript = [
    { time: '00:00', role: 'agent' as const, content: 'Hola, soy el asistente personal de Germán. ¿En qué puedo ayudarte?' },
    { time: '00:03', role: 'user' as const, content: 'Hola, soy Rafa, socio de Germán. Necesito hablar con él urgentemente.' },
    { time: '00:08', role: 'agent' as const, content: 'Entiendo. Por ser un contacto prioritario, transferiré tu llamada inmediatamente.' },
  ];

  const handlePlayAudio = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Add audio playback logic here
    console.log('Playing audio for event:', id);
  };

  const handleShowTranscript = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedEventId(id);
    setShowTranscript(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'callId', label: 'ID Llamada' },
                { key: 'phoneNumber', label: 'Número' },
                { key: 'date', label: 'Fecha' },
                { key: 'time', label: 'Hora' },
                { key: 'duration', label: 'Duración' },
                { key: 'action', label: 'Acción' },
                { key: 'matchedRule', label: 'Regla' },
                { key: 'tags', label: 'Etiquetas' },
                { key: 'recording', label: 'Grabación' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => key !== 'tags' && key !== 'recording' && onSort(key as keyof Event)}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap font-sans",
                    key !== 'tags' && key !== 'recording' && "cursor-pointer hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {getSortIcon(key as keyof Event)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 font-sans">
            {events.map((event) => (
              <tr
                key={event.id}
                onClick={() => onEventClick(event.id)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {event.callId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {event.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {event.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {event.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {event.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.action === 'Transferido'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {event.action}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.matchedRule && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {event.matchedRule}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handlePlayAudio(e, event.id)}
                      className="group relative p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      title="Escuchar grabación"
                    >
                      <Play className="w-4 h-4" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Escuchar grabación
                      </span>
                    </button>
                    <button
                      onClick={(e) => handleShowTranscript(e, event.id)}
                      className="group relative p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      title="Leer transcripción"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Leer transcripción
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TranscriptModal
        isOpen={showTranscript}
        onClose={() => setShowTranscript(false)}
        messages={mockTranscript}
      />
    </>
  );
};

export default EventsTable;