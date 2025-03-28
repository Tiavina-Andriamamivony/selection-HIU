"use client"

import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface Prediction {
  className: string;
  probability: number;
}

const ImageRecognizer: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (imageRef.current && e.target?.result) {
        imageRef.current.src = e.target.result as string;
        setLoading(true);
        setProgress(30);
        try {
          const model = await mobilenet.load();
          setProgress(70);
          const results = await model.classify(imageRef.current);
          setProgress(100);
          setPredictions(results);
        } catch (error) {
          console.error("Error analyzing image:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto bg-background rounded-xl shadow-md overflow-hidden p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Image Recognition</h1>
        <p className="text-muted-foreground">Upload an image to analyze its content</p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md">
          <label className="flex flex-col items-center px-4 py-6 bg-muted rounded-lg border-2 border-dashed border-muted-foreground cursor-pointer hover:bg-accent transition duration-150 ease-in-out">
            <svg className="w-12 h-12 text-muted-foreground mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-lg font-medium">Choose an image</span>
            <span className="text-sm text-muted-foreground mb-2">or drag and drop</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className={`relative ${predictions.length ? 'block' : 'hidden'}`}>
          <img
            ref={imageRef}
            alt="Uploaded Preview"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
          {loading && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <Progress value={progress} className="w-1/2" />
              <p className="text-sm font-medium">{progress}% Complete</p>
            </div>
          )}
        </div>

        {predictions.length > 0 && (
          <div className="w-full max-w-md bg-card rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-3">Analysis Results</h2>
            <div className="space-y-2">
              {predictions.map((pred, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                  <span className="capitalize">{pred.className.replace(/,/g, ', ')}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-primary mr-2">
                      {(pred.probability * 100).toFixed(1)}%
                    </span>
                    <div className="w-24 bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${pred.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognizer;