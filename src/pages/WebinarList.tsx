import { Layout } from "@/components/layout/Layout";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WebinarFormModal } from "@/components/webinar/WebinarFormModal";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import keycloak from "../../src/keycloak/keycloak";

interface Webinar {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  description: string;
}

const getAllWeb = async (
  token: string
): Promise<{ decryptWebinaire: Webinar[] }> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/talentApprenant/allWebinaire",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching webinars:", error);
    throw error;
  }
};

const WebinarList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [webinarToEdit, setWebinarToEdit] = useState<Webinar | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  const {
    data: webinarsData = { decryptWebinaire: [] },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      if (!keycloak?.token) {
        throw new Error("No authentication token available");
      }
      return await getAllWeb(keycloak.token);
    },
  });

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
          <img src="/error-icon.png" alt="Erreur" className="w-20 h-20" />
          <h2 className="text-xl font-semibold">
            Erreur lors du chargement des webinaires.
          </h2>
          <p className="text-muted-foreground">
            {error.message ||
              "Veuillez réessayer plus tard ou vérifier votre connexion."}
          </p>
        </div>
      </Layout>
    );
  }

  // Obtenir les catégories uniques pour le filtre
  const categories = Array.from(
    new Set(webinarsData.decryptWebinaire.map((webinar) => webinar.category))
  );

  console.log(webinarsData.decryptWebinaire);
  // Filtrer les webinaires
  // const filteredWebinars = webinarsData.decryptWebinaire.filter((webinar) => {
  //   // Vérifier que webinar et webinar.title existent
  //   if (!webinar || !webinar.title) return false;

  //   const matchesSearch = webinar.title
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   // const matchesCategory =
  //   //   categoryFilter === "all" || webinar.category === categoryFilter;
  //   // const matchesStatus = statusFilter === "all";

  //   // return matchesSearch && matchesCategory && matchesStatus;
  //   return matchesSearch;
  // });

  const filteredWebinars = webinarsData.decryptWebinaire;

  console.log(filteredWebinars);

  const handleAddWebinar = (newWebinar: Webinar) => {
    console.log("Nouveau webinaire ajouté :", newWebinar);
    toast.success("Webinaire ajouté avec succès!");
    setIsFormOpen(false);
  };

  const handleUpdateWebinar = (updatedWebinar: Webinar) => {
    console.log("Webinaire mis à jour :", updatedWebinar);
    toast.success("Webinaire mis à jour avec succès!");
    setIsFormOpen(false);
  };

  const handleDeleteWebinar = (id: string) => {
    console.log("Webinaire supprimé :", id);
    toast.success("Webinaire supprimé avec succès!");
  };

  const openAddForm = () => {
    setWebinarToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (webinar: Webinar) => {
    setWebinarToEdit(webinar);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Liste des webinaires
            </h1>
            <p className="text-muted-foreground">
              Partage ton talent et monte en compétences avec les autres
              apprenants.
            </p>
          </div>
          <Button onClick={openAddForm} className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" /> Déposez un webinaire
          </Button>
        </div>

        {/* Filtres */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un webinaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          {isMobile ? (
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="flex-1 mr-2"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
              >
                Réinitialiser
              </Button>
              <Button onClick={openAddForm} className="flex-shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          )}
        </div>

        {/* Résultats */}
        {filteredWebinars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredWebinars.map((webinar) => (
              <WebinarCard
                key={webinar.id}
                webinar={webinar}
                onEdit={() => openEditForm(webinar)}
                onDelete={() => handleDeleteWebinar(webinar.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Aucun webinaire trouvé</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Aucun webinaire ne correspond à vos critères de recherche. Essayez
              d'ajuster vos filtres.
            </p>
          </div>
        )}
      </div>

      <WebinarFormModal
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        webinar={webinarToEdit}
        onSubmit={webinarToEdit ? handleUpdateWebinar : handleAddWebinar}
      />
    </Layout>
  );
};

export default WebinarList;
