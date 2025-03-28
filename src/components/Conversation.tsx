'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff } from "lucide-react";

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: 'MhWI9q4y4mCk1OtfXm2e',
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Mic className="w-5 h-5" />
          AI Conversation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <Button
              onClick={startConversation}
              disabled={conversation.status === 'connected'}
              variant="default"
              className="flex items-center gap-2 min-w-[160px]"
            >
              <Mic className="w-4 h-4" />
              Start Conversation
            </Button>
            <Button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected'}
              variant="destructive"
              className="flex items-center gap-2 min-w-[160px]"
            >
              <MicOff className="w-4 h-4" />
              Stop Conversation
            </Button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant={conversation.status === 'connected' ? 'default' : 'secondary'} 
                     className={conversation.status === 'connected' ? 'bg-green-500' : ''}>
                {conversation.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Agent is</span>
              <Badge variant="outline" className={conversation.isSpeaking ? 'border-blue-500 text-blue-500' : ''}>
                {conversation.isSpeaking ? 'speaking' : 'listening'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
