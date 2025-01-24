import React from 'react';
import { X } from 'lucide-react';
import Modal from '../ui/Modal';
import AddCardForm from './AddCardForm';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentMethodId: string) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose, onSuccess }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-md">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Agregar nueva tarjeta</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AddCardForm onSuccess={(paymentMethodId) => {
          onSuccess(paymentMethodId);
          onClose();
        }} />
      </div>
    </Modal>
  );
};

export default AddCardModal;