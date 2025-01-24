import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Clock, Phone, Calendar, Bot, Tag } from 'lucide-react';
import Header from '../components/Header';
import TranscriptModal from '../components/AgentEvents/TranscriptModal';

const AgentEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showTranscript, setShowTranscript] = useState(false);

  // Mock event data - replace with actual data fetching
  const event = {
    id,
    callId: 'CALL-001',
    phoneNumber: '+52 55 1234 5678',
    date: '2024-03-20',
    time: '14:30',
    duration: '2:35',
    action: 'Transferido',
    tags: ['banco', 'urgente'],
    matchedRule: 'urgente'
  };

  // Mock transcript data - replace with actual data
  const mockTranscript = [
    { time: '00:00', role: 'agent' as const, content: 'Hola, soy el asistente personal de Germán. ¿En qué puedo ayudarte?' },
    { time: '00:03', role: 'user' as const, content: 'Hola, soy Rafa, socio de Germán. Necesito hablar con él urgentemente.' },
    { time: '00:08', role: 'agent' as const, content: 'Entiendo. Por ser un contacto prioritario, transferiré tu llamada inmediatamente.' },
  ];

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
        title="Detalle del evento" 
        subtitle={`ID de llamada: ${event.callId}`}
      />

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Call Information */}
          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Número</span>
            </div>
            <p className="font-medium">{event.phoneNumber}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Fecha</span>
            </div>
            <p className="font-medium">{event.date}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Hora</span>
            </div>
            <p className="font-medium">{event.time}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duración</span>
            </div>
            <p className="font-medium">{event.duration}</p>
          </div>

          {event.matchedRule && (
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Bot className="w-4 h-4" />
                <span className="text-sm">Regla</span>
              </div>
              <Link 
                to="/agent#keyword-rules"
                className="inline-flex items-center gap-2 group"
              >
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium group-hover:bg-orange-200 transition-colors">
                  {event.matchedRule}
                </span>
              </Link>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Tag className="w-4 h-4" />
              <span className="text-sm">Etiquetas</span>
            </div>
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
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Grabación y transcripción</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {/* Add audio playback logic */}}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Play className="w-4 h-4" />
            Escuchar grabación
          </button>
          <button
            onClick={() => setShowTranscript(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Ver transcripción
          </button>
        </div>
      </div>

      <TranscriptModal
        isOpen={showTranscript}
        onClose={() => setShowTranscript(false)}
        messages={mockTranscript}
      />
    </div>
  );
};

export default AgentEventDetail;