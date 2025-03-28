"use client"

import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

interface Prediction {
  className: string;
  probability: number;
}

const ImageRecognizer: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (imageRef.current && e.target?.result) {
        imageRef.current.src = e.target.result as string;
        setLoading(true);
        const model = await mobilenet.load();
        const results = await model.classify(imageRef.current);
        setPredictions(results);
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <img
        ref={imageRef}
        alt="Uploaded Preview"
        className="max-w-md border rounded"
        style={{ display: predictions.length ? 'block' : 'none' }}
      />
      {loading && <p>Analyzing image... ⏳</p>}
      {predictions.length > 0 && (
        <ul className="mt-4">
          {predictions.map((pred, index) => (
            <li key={index}>
              {pred.className} - {(pred.probability * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageRecognizer;