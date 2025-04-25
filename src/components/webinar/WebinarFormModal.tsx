import { useState, ChangeEvent } from "react";
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
import { Upload, Tag, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useMutation } from "@tanstack/react-query";

interface WebinarFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function WebinarFormModal({ isOpen, setIsOpen }: WebinarFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>("");

  // Mutation pour créer un webinaire
  const { mutate: createWebinar, isLoading } = useMutation({
    mutationFn: async (formDataToSend: FormData) => {
      const response = await fetch("https://votre-api.com/webinars", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du webinaire.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Webinaire créé avec succès !");
      setIsOpen(false); // Fermer le modal après succès
    },
    onError: (error) => {
      console.error("Erreur lors de la création du webinaire :", error);
      toast.error("Une erreur est survenue lors de la création du webinaire.");
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 5MB)");
      return;
    }
    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreviewUrl(objectUrl);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("video/")) {
      toast.error("Veuillez sélectionner un fichier vidéo");
      return;
    }
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 50MB)");
      return;
    }
    setVideoFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setVideoPreviewUrl(objectUrl);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Créer un objet FormData
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }
    if (videoFile) {
      formDataToSend.append("video", videoFile);
    }

    // Appeler la mutation pour envoyer les données à l'API
    createWebinar(formDataToSend);

    // Réinitialiser les prévisualisations après soumission
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
              Ajouter un nouveau webinaire
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Remplissez le formulaire pour créer un nouveau webinaire.
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
                    <Tag className="h-4 w-4 text-primary" />
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
                    <Tag className="h-4 w-4 text-primary" />
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
                  <Label htmlFor="category" className="font-medium flex items-center gap-1.5">
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
                    <SelectTrigger id="category" className="border-input/60 focus:ring-primary/20 transition-all">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm">
                      <SelectItem value="developpememt">Développement Web</SelectItem>
                      <SelectItem value="frontend">Design Front-end</SelectItem>
                      <SelectItem value="programmation">Programmation</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="logicielle">Qualité logicielle</SelectItem>
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
                    <img src={imagePreviewUrl} alt="Aperçu" className="w-full h-full object-cover" />
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
                    <video src={videoPreviewUrl} controls className="w-full h-full object-cover" />
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
              disabled={isLoading} // Désactiver le bouton pendant le chargement
            >
              {isLoading ? "Envoi en cours..." : "Envoyer à MGIT Service votre webinaire"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}