
"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Calendar, Clock, Percent } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

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

export default function History() {
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
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Historique des Analyses</h1>
      <div className="grid grid-cols-1 gap-8">
        {analyses.map((analysis) => (
          <Card 
            key={analysis.id}
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card/50 to-card border-muted/20"
          >
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl font-semibold">
                    Analyse détaillée
                  </CardTitle>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(analysis.createdAt), 'dd MMMM yyyy', { locale: fr })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {format(new Date(analysis.createdAt), 'HH:mm')}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                  <Image
                    src={analysis.imageUrl}
                    alt="Image analysée"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Analysée {formatDistanceToNow(new Date(analysis.createdAt), { 
                    addSuffix: true,
                    locale: fr
                  })}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Résultats de l&apos;analyse
                  </h3>
                  <div className="space-y-4">
                    {analysis.predictions
                      .sort((a, b) => b.probability - a.probability)
                      .map((prediction, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{prediction.className}</span>
                            <span className="text-primary">
                              {(prediction.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress 
                            value={prediction.probability * 100} 
                            className="h-2"
                          />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
