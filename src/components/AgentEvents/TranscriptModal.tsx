import React from 'react';
import { X } from 'lucide-react';
import Modal from '../ui/Modal';

interface Message {
  time: string;
  role: 'agent' | 'user';
  content: string;
}

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
}

const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  messages
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Transcripción de la llamada</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-3">
              <div className="text-xs text-gray-400 w-16 flex-shrink-0">
                {message.time}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">
                  {message.role === 'agent' ? '🤖 Agente' : '👤 Usuario'}:
                </div>
                <p className="text-gray-700">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TranscriptModal;