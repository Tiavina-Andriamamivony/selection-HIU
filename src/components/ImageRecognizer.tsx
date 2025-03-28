"use client"

import React, { useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';

const ImageRecognizer = () => {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (imageRef.current && e.target?.result) {
        imageRef.current.src = e.target.result as string;
        setLoading(true);
        
        const worker = await createWorker();
        
        try {
          await worker.load();
          const { data: { text } } = await worker.recognize(imageRef.current);
          setText(text);
        } catch (error) {
          console.error("Erreur lors de la reconnaissance:", error);
        } finally {
          await worker.terminate();
          setLoading(false);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">OCR Simple</h1>
          <p className="text-gray-600 mt-1">Extrayez le texte de vos images</p>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
            <label className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="block text-sm font-medium text-gray-700">
                {loading ? 'Traitement en cours...' : 'Cliquez pour uploader une image'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>

          {imageRef.current?.src && (
            <div className="relative">
              <img
                ref={imageRef}
                alt="Aperçu"
                className="rounded-lg shadow-sm w-full"
              />
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                  <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-sm font-medium">Analyse en cours</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {text && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium text-gray-800">Texte extrait</h2>
                <button 
                  onClick={() => navigator.clipboard.writeText(text)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Copier
                </button>
              </div>
              <div className="bg-white p-3 rounded border border-gray-300">
                <pre className="whitespace-pre-wrap text-sm">{text}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageRecognizer;