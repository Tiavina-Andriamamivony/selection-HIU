"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Image as ImageIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

type Prediction = {
  className: string;
  probability: number;
};

type ImageAnalysis = {
  id: string;
  imageUrl: string;
  predictions: Prediction[];
  createdAt: string;
};

export default function ImageAnalysisList() {
  const [analyses, setAnalyses] = useState<ImageAnalysis[]>([]);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch('/api/image-analyses');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setAnalyses(data);
      } catch (error) {
        console.error('Error fetching analyses:', error);
      }
    };

    fetchAnalyses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {analyses.map((analysis) => (
        <Card 
          key={analysis.id}
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card/50 to-card border-muted/20"
        >
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold line-clamp-1">
                Analyse d&apos;image
              </CardTitle>
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(analysis.createdAt), { 
                addSuffix: true,
              })}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src={analysis.imageUrl}
                alt="Analyzed image"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Prédictions :</h4>
              <div className="text-sm text-muted-foreground">
                {analysis.predictions.map((prediction, index) => (
                  <p key={index} className="flex justify-between">
                    <span>{prediction.className}:</span>
                    <span className="font-medium">
                      {(prediction.probability * 100).toFixed(1)}%
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}