
"use client"

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ListOfConversation from "@/components/ListOfConversation";
import ImageAnalysisList from "@/components/ImageAnalysisList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default  function ProfilePage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.firstName} {user.lastName}</CardTitle>
              <p className="text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="chat">
              <AccordionTrigger>Chat avec Toky</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Toky est votre assistant personnel pour affiner vos compétences professionnelles à votre rythme.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Pratique conversationnelle adaptée à votre niveau</li>
                    <li>Feedback personnalisé sur vos réponses</li>
                    <li>Progression à votre propre rythme</li>
                    <li>Disponible 24/7 pour vous entraîner</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="image-analysis">
              <AccordionTrigger>Analyse de Photo LinkedIn</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Notre IA analyse votre photo de profil pour vous donner un aperçu de la première impression que vous faites aux recruteurs.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Analyse du professionnalisme de la photo</li>
                    <li>Évaluation de la qualité de l&apos;image</li>
                    <li>Suggestions d&apos;amélioration</li>
                    <li>Perspective du point de vue recruteur</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="max-w-7xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Mes Conversations</h2>
          <ListOfConversation />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Mes Analyses d&apos;Images</h2>
          <ImageAnalysisList />
        </section>
      </div>
    </div>
  );
}
