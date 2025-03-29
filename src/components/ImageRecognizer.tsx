"use client"
import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { saveImageAnalysis } from '@/app/actions/saveImageAnalysis';

interface Prediction {
  className: string;
  probability: number;
}

const ImageRecognizer: React.FC = () => {
  const { user } = useUser();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (imageRef.current && e.target?.result) {
        const imageUrl = e.target.result as string;
        imageRef.current.src = imageUrl;
        setImageUrl(imageUrl);
        setLoading(true);
        
        try {
          const model = await mobilenet.load();
          const results = await model.classify(imageRef.current);
          setPredictions(results);

          // Save analysis if user is logged in
          if (user) {
            const saveResult = await saveImageAnalysis(
              user.id,
              imageUrl,
              results
            );
            
            if (saveResult.success) {
              toast.success('Analysis saved successfully!');
            } else {
              toast.error('Failed to save analysis');
            }
          }
        } catch (error) {
          toast.error('Error analyzing image');
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Image Recognition</h1>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload an image
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <img
            ref={imageRef}
            alt="Uploaded Preview"
            className="max-h-64 rounded-lg object-contain border border-gray-200"
            style={{ display: predictions.length ? 'block' : 'none' }}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Analyzing image...</span>
          </div>
        )}

        {predictions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Predictions</h2>
            <ul className="space-y-2">
              {predictions.map((pred, index) => (
                <li key={index} className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm">
                  <span className="text-gray-700 capitalize">{pred.className.toLowerCase()}</span>
                  <span className="font-medium text-blue-600">{(pred.probability * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognizer;