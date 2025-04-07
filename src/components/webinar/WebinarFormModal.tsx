import { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { format } from "date-fns";
import {
  Upload,
  Tag,
  Info,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface WebinarFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  webinar?;
  onSubmit: (webinar) => void;
}

export function WebinarFormModal({
  isOpen,
  setIsOpen,
  webinar,
  onSubmit,
}: WebinarFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    presenter: "",
    date: "",
    time: "",
    duration: "",
    category: "",
    status: "upcoming",
    imageUrl: "/placeholder.svg",
    thumbnailUrl: "",
    videoUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  useEffect(() => {
    if (webinar) {
      const dateObj = new Date(webinar.date);
      setFormData({
        ...webinar,
        date: format(dateObj, "yyyy-MM-dd"),
        time: format(dateObj, "HH:mm"),
        imageUrl: webinar.imageUrl || webinar.thumbnailUrl || "/placeholder.svg",
        thumbnailUrl: webinar.thumbnailUrl || webinar.imageUrl || "",
        videoUrl: webinar.videoUrl || "", // Initialiser videoUrl
      });
      if (webinar.imageUrl || webinar.thumbnailUrl) {
        setImagePreviewUrl(webinar.imageUrl || webinar.thumbnailUrl);
      }
      if (webinar.videoUrl) {
        setVideoPreviewUrl(webinar.videoUrl);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        presenter: "",
        date: "",
        time: "",
        duration: "",
        category: "",
        status: "upcoming",
        imageUrl: "/placeholder.svg",
        thumbnailUrl: "",
        videoUrl: "",
      });
      setImageFile(null);
      setVideoFile(null);
      setImagePreviewUrl("");
      setVideoPreviewUrl("");
    }
  }, [webinar, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB en octets
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 5MB)");
      return;
    }
    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreviewUrl(objectUrl);
    setFormData((prev) => ({
      ...prev,
      imageUrl: objectUrl,
      thumbnailUrl: objectUrl,
    }));
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("video/")) {
      toast.error("Veuillez sélectionner un fichier vidéo");
      return;
    }
    const maxSize = 50 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 50MB)");
      return;
    }
    setVideoFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setVideoPreviewUrl(objectUrl);
    setFormData((prev) => ({
      ...prev,
      videoUrl: objectUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
    const submittedData = {
      ...formData,
      date: combinedDateTime,
      id: webinar?.id,
      imageUrl: formData.imageUrl || formData.thumbnailUrl,
      thumbnailUrl: formData.thumbnailUrl || formData.imageUrl,
      videoUrl: formData.videoUrl,
    };
    onSubmit(submittedData);
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border border-border/40 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-semibold text-center">
              {webinar ? "Modifier le webinaire" : "Ajouter un nouveau webinaire"}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {webinar
                ? "Modifiez les détails du webinaire existant."
                : "Remplissez le formulaire pour créer un nouveau webinaire."}
            </DialogDescription>
          </DialogHeader>
          {/* Informations générales */}
          <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow transition-shadow duration-200">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Informations générales</h3>
              </div>
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="title" className="font-medium flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-primary" />
                    Titre du webinaire
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Entrez un titre"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="description" className="font-medium flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-primary" />
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez le contenu du webinaire"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                    <Label
                      htmlFor="category"
                      className="font-medium flex items-center gap-1.5"
                    >
                      <Briefcase className="h-4 w-4 text-primary" />
                      Catégorie
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger
                        id="category"
                        className="border-input/60 focus:ring-primary/20 transition-all"
                      >
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent className="bg-background/95 backdrop-blur-sm">
                        <SelectItem value="developpememt">
                          Développement Web
                        </SelectItem>
                        <SelectItem value="frontend">
                          Design Front-end
                        </SelectItem>
                        <SelectItem value="programmation">
                          Programmation
                        </SelectItem>
                        <SelectItem value="backend">
                          Backend
                        </SelectItem>
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="logicielle">
                          Qualité logicielle
                        </SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
            </CardContent>
          </Card>
          {/* Gestion de l'image */}
          <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow transition-shadow duration-200">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Image du webinaire</h3>
              </div>
              <div className="space-y-4">
                {imagePreviewUrl && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden border border-border/50 shadow-inner">
                    <img
                      src={imagePreviewUrl}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="imageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-2 text-sm font-medium">
                        <span className="text-primary">Cliquez pour uploader</span>
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG ou GIF (max 5MB)</p>
                    </div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Gestion de la vidéo */}
          <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow transition-shadow duration-200">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Vidéo du webinaire</h3>
              </div>
              <div className="space-y-4">
                {videoPreviewUrl && (
                  <div className="relative w-full h-48 rounded-md overflow-hidden border border-border/50 shadow-inner">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="videoUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-primary" />
                      <p className="mb-2 text-sm font-medium">
                        <span className="text-primary">Cliquez pour uploader</span>
                      </p>
                      <p className="text-xs text-muted-foreground">MP4 (max 50MB)</p>
                    </div>
                    <Input
                      id="videoUpload"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsOpen(false)}
              className="border-border/60 hover:bg-background/80"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 transition-colors"
            >
              {webinar ? "Mettre à jour" : "Envoyer à MGIT Service votre webinaire"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}