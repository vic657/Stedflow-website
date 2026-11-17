import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, labelledBy, children, className = 'max-w-md' }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!isOpen || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={ref} aria-labelledby={labelledBy} onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className={'fixed inset-0 m-auto w-[calc(100%-2rem)] max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#173539]/10 backdrop:bg-black/60 backdrop:backdrop-blur-sm ' + className}>
      {children}
    </dialog>
  );
};
