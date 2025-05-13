import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { webinars } from "@/data/mockData";
import {
  Video,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import keycloak from "@/keycloak/keycloak";

const WebinarDetail = () => {
  const { webinaireId } = useParams();
  const keycloakId = keycloak.tokenParsed?.sub;
  const navigate = useNavigate();

  const getWebinaire = async (token: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/talentApprenant/getWebinaire/${keycloakId}/${webinaireId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error de récupération du webinaire", error);
      throw Error;
    }
  };

  const {
    data: webinaire = { decryptWebinaire: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["webinaire"],
    queryFn: async () => {
      if (!keycloak.token) {
        throw new Error("Pas de token disponible");
      }
      console.log("webinaire: ", webinaire);

      return await getWebinaire(keycloak.token);
    },
  });

  const web = webinaire;

  // États pour le lecteur vidéo
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fonctions de contrôle pour le lecteur vidéo
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          toast.error("Erreur lors de la lecture de la vidéo");
          console.error("Erreur de lecture:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Fonction pour avancer de 5 secondes
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  // Fonction pour reculer de 5 secondes
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 5,
        0
      );
    }
  };

  // Fonction pour basculer en mode plein écran
  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((error) => {
          toast.error("Impossible d'activer le mode plein écran");
          console.error("Erreur plein écran:", error);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Formatage du temps (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        {/* En-tête du webinaire */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Lecteur vidéo */}
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              >
                {/* Utilisez une URL de vidéo de démonstration ou celle du webinaire si disponible */}
                <source
                  src={`http://localhost:5000/uploads/${web.source}`}
                  type="video/mp4"
                />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
              {/* Contrôles vidéo personnalisés */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex flex-col space-y-2">
                  {/* Barre de progression */}
                  <div className="flex items-center w-full">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>

                  {/* Boutons de contrôle et affichage du temps */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-primary"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-primary"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-primary"
                        onClick={skipBackward}
                      >
                        <span className="text-xs">-5s</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-primary"
                        onClick={skipForward}
                      >
                        <span className="text-xs">+5s</span>
                      </Button>
                      <span className="text-xs text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-primary"
                        onClick={toggleFullScreen}
                      >
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2">
                  {web.categorie}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mt-2">
                {web.titre}
              </h1>
            </div>

            <Separator className="my-6" />

            {/* Description du webinaire */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">
                {web.description ||
                  "Aucune description disponible pour ce webinaire."}
              </p>
            </div>
          </div>

          {/* Informations latérales */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regarder le webinaire</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={togglePlay}>
                  <Video className="mr-2 h-4 w-4" /> Regarder
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webinaires similaires</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {webinars
                  .filter(
                    (w) =>
                      w.category === web.categorie && w.id !== web.webinaireId
                  )
                  .slice(0, 3)
                  .map((relatedWebinar) => (
                    <div
                      key={relatedWebinar.id}
                      className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md cursor-pointer"
                      onClick={() =>
                        navigate(`/webinaire/${relatedWebinar.id}`)
                      }
                    >
                      <div className="h-12 w-12 rounded overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={relatedWebinar.thumbnailUrl}
                          alt={relatedWebinar.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium text-sm line-clamp-1">
                          {relatedWebinar.title}
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebinarDetail;
