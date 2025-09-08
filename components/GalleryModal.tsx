import React, { useEffect, useRef } from 'react';
import Gallery from './Gallery';
import { GalleryImage } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  onUseAsBase: (base64: string) => void;
  onCreateVideo: (base64: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  setIsDraggingFromGallery: (isDragging: boolean) => void;
  t: (key: string, ...args: any[]) => string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, t, ...galleryProps }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4">
      <div 
        ref={modalRef} 
        className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl text-slate-200 flex flex-col relative w-full h-full max-w-7xl max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-2xl font-bold">{t('myCreations')}</h2>
          <button onClick={onClose} className="text-slate-400 text-3xl hover:text-white" title={t('close')}>&times;</button>
        </header>
        <main className="p-4 overflow-y-auto flex-grow">
          <Gallery {...galleryProps} t={t} />
        </main>
      </div>
    </div>
  );
};

export default GalleryModal;