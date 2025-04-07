import { Layout } from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { webinars } from "@/data/mockData";
import {
  Calendar,
  Clock,
  Users,
  Video,
  ArrowLeft,
  Share2,
  MessageCircle,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

const WebinarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Trouver le webinaire correspondant à l'ID
  const webinar = webinars.find((w) => w.id === id);

  // États pour le lecteur vidéo
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Si le webinaire n'existe pas, rediriger vers la page 404
  if (!webinar) {
    navigate("/404", { replace: true });
    return null;
  }

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
                poster={webinar.thumbnailUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              >
                {/* Utilisez une URL de vidéo de démonstration ou celle du webinaire si disponible */}
                <source
                  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
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
                      <span className="text-xs text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2">
                  {webinar.category}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mt-2">
                {webinar.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{webinar.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {webinar.time} · {webinar.duration}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    {webinar.attendees} participants
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Description du webinaire */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-muted-foreground">
                {webinar.description ||
                  "Aucune description disponible pour ce webinaire."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Ressources
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Discussion
              </Button>
            </div>
          </div>

          {/* Informations latérales */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Intervenant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${webinar.presenter}`}
                    />
                    <AvatarFallback>
                      {webinar.presenter.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{webinar.presenter}</p>
                    <p className="text-sm text-muted-foreground">
                      {webinar.category}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participer au webinaire</CardTitle>
                <CardDescription>
                  Rejoignez ce webinaire et accédez au contenu
                </CardDescription>
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
                      w.category === webinar.category && w.id !== webinar.id
                  )
                  .slice(0, 3)
                  .map((relatedWebinar) => (
                    <div
                      key={relatedWebinar.id}
                      className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md cursor-pointer"
                      onClick={() => navigate(`/webinars/${relatedWebinar.id}`)}
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
                        <p className="text-xs text-muted-foreground">
                          {relatedWebinar.date}
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
