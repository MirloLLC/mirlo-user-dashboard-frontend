import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './ui/Modal';

interface CancelServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  phoneNumber: string;
}

const CancelServiceModal: React.FC<CancelServiceModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  phoneNumber,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Confirmar cancelación
        </h3>
        
        <p className="text-sm text-gray-600 mb-6">
          Se cancelará el servicio inmediatamente de la línea {phoneNumber}.
          <br /><br />
          No podrás hacer y recibir llamadas, enviar y recibir SMS, ni usar datos.
          <br /><br />
          Tienes 3 meses para activar un plan o perderás el número.
        </p>
        
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelServiceModal;