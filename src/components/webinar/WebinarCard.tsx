import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_KEY = "";

interface WebinarCardProps {
  id: string;
  title: string;
  presenter: string;
  description?: string; 
  date: Date | string;
  duration: number | string;
  category: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function WebinarCard({ 
  id,
  title, 
  presenter, 
  description, 
  date, 
  duration, 
  category, 
  imageUrl,
  thumbnailUrl,
  className,
}: WebinarCardProps) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  let webinarDate: Date;
  if (date instanceof Date) {
    webinarDate = date;
  } else {
    webinarDate = new Date(date);
  }

  let dateFormatted = "Date invalide";
  let timeFormatted = "--:--";
  
  if (isValid(webinarDate)) {
    try {
      dateFormatted = format(webinarDate, 'dd MMMM yyyy', { locale: fr });
      timeFormatted = format(webinarDate, 'HH:mm', { locale: fr });
    } catch (error) {
      console.error("Error formatting date:", error, "Date value:", date);
    }
  } else {
    console.warn("Invalid date value:", date);
  }
  
  const displayImage = imageUrl || thumbnailUrl || '/placeholder.svg';
  
  // Naviguer vers la page détaillée quand on clique sur la carte
  const handleCardClick = () => {
    navigate(`/webinaire/${id}`);
    speakWebinar();
  };

  // Fonction pour arrêter l'audio en cours si un nouveau est joué
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  // Fonction pour créer le texte à lire
  const getTextToSpeak = () => {
    let text = `${title}. Présenté par ${presenter}.`;
    
    if (description) {
      text += ` Description: ${description}.`;
    }
    
    text += ` Ce webinaire aura lieu le ${dateFormatted} à ${timeFormatted}.`;
    text += ` La durée prévue est de ${duration}.`;
    text += ` Catégorie: ${category}.`;
    
    return text;
  };

  // Fonction pour lire le webinaire
  const speakWebinar = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (!API_KEY) {
      toast.error("Veuillez configurer votre clé API ElevenLabs");
      return;
    }

    if (isPlaying && audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": API_KEY,
          },
          body: JSON.stringify({
            text: getTextToSpeak(),
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.5,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };
      
      newAudio.onerror = () => {
        setIsPlaying(false);
        toast.error("Erreur lors de la lecture audio");
      };

      setAudio(newAudio);
      newAudio.play();

    } catch (error) {
      console.error("Erreur de synthèse vocale:", error);
      toast.error("Erreur lors de la génération de l'audio");
      setIsPlaying(false);
    }
  };
  
  return (
    <>
      <Card 
        className={`overflow-hidden hover:shadow-md transition-shadow group ${className || ''} cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
          </div>
          <CardTitle className="text-lg line-clamp-2 h-12">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </>
  );
}
