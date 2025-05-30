import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Dialog as={Fragment} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <Dialog.Title className="text-lg font-semibold text-red-600">¿Eliminar producto?</Dialog.Title>
          <Dialog.Description className="text-gray-600">
            Esta acción eliminará el producto permanentemente. ¿Deseas continuar?
          </Dialog.Description>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
