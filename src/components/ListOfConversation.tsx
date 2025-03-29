"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Conversation } from "@prisma/client";
export default function ListOfConversation() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {conversations.map((conversation: Conversation) => (
        <Card 
          key={conversation.id}
          className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card/50 to-card border-muted/20"
        >
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold line-clamp-1">
                {conversation.title}
              </CardTitle>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(conversation.createdAt), { 
                addSuffix: true,
              })}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {conversation.content}
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
