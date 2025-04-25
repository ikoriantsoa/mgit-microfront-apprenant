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

// Données mockées fournies
const mockWebinars = [
  {
    id: "1",
    title: "Introduction à React pour débutants",
    category: "Développement Web",
    thumbnailUrl: "public/f64815e6-3df2-40f5-90df-32208f468511.jpeg",
    description:
      "Apprenez les fondamentaux de React, de la création de composants à la gestion d'état.",
  },
  {
    id: "2",
    title: "Maîtriser Tailwind CSS en entreprise",
    category: "Design Front-end",
    thumbnailUrl: "public/tailwind.png",
    description:
      "Découvrez les meilleures pratiques pour utiliser Tailwind CSS dans vos projets d'entreprise, avec des conseils pour l'organisation du code et l'optimisation des performances.",
  },
  {
    id: "3",
    title: "TypeScript Avancé pour les équipes de développement",
    category: "Programmation",
    thumbnailUrl: "public/typescriptAvancée.webp",
    description:
      "Ce webinaire aborde les fonctionnalités avancées de TypeScript : génériques, types conditionnels, inférence de types et stratégies pour améliorer la qualité du code dans les grandes bases de code.",
  },
  {
    id: "4",
    title: "API RESTful avec Node.js et Express",
    category: "Backend",
    thumbnailUrl: "public/nodejsAPI.png",
    description:
      "Créez des API RESTful robustes avec Node.js et Express. Nous couvrirons la structure des routes, la validation des données, l'authentification et la documentation.",
  },
  {
    id: "5",
    title: "Optimisation des performances React",
    category: "Développement Web",
    thumbnailUrl: "public/reactPerformance.jpeg",
    description:
      "Améliorez les performances de vos applications React avec des techniques avancées : memoization, code splitting, lazy loading, et optimisation du rendu.",
  },
  {
    id: "6",
    title: "Introduction à GraphQL",
    category: "API",
    thumbnailUrl: "public/graphql.png",
    description:
      "Découvrez comment GraphQL peut remplacer les API REST traditionnelles avec un modèle plus efficace et flexible pour les requêtes de données.",
  },
  {
    id: "7",
    title: "Tests automatisés avec Jest et React Testing Library",
    category: "Qualité logicielle",
    thumbnailUrl: "public/reactTestingLibraire.jpeg",
    description:
      "Apprenez à mettre en place une stratégie de tests efficace pour vos applications React avec Jest et React Testing Library.",
  },
  {
    id: "8",
    title: "Déploiement continu avec GitHub Actions",
    category: "DevOps",
    thumbnailUrl: "public/githubActions.jpeg",
    description:
      "Automatisez vos workflows de développement avec GitHub Actions pour des déploiements fluides et sans erreur.",
  },
];

// Fonction simulant un appel API fictif
const fetchWebinars = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simuler un délai réseau
  return mockWebinars; // Retourner les données mockées
};

const WebinarList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [webinarToEdit, setWebinarToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();

  // Utilisation de React Query pour récupérer les webinaires
  const {
    data: webinarsList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["webinars"],
    queryFn: fetchWebinars,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <img src="/error-icon.png" alt="Erreur" className="w-20 h-20" />
        <h2 className="text-xl font-semibold">
          Erreur lors du chargement des webinaires.
        </h2>
        <p className="text-muted-foreground">
          Veuillez réessayer plus tard ou vérifier votre connexion.
        </p>
      </div>
    );
  }

  // Obtenir les catégories uniques pour le filtre
  const categories = Array.from(
    new Set(webinarsList.map((webinar) => webinar.category))
  );

  // Filtrer les webinaires en fonction des critères de recherche
  const filteredWebinars = webinarsList.filter((webinar) => {
    const matchesSearch = webinar.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || webinar.category === categoryFilter;
    const matchesStatus = statusFilter === "all";

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddWebinar = (newWebinar) => {
    console.log("Nouveau webinaire ajouté :", newWebinar);
    toast.success("Webinaire ajouté avec succès!");
    setIsFormOpen(false);
  };

  const handleUpdateWebinar = (updatedWebinar) => {
    console.log("Webinaire mis à jour :", updatedWebinar);
    toast.success("Webinaire mis à jour avec succès!");
    setIsFormOpen(false);
  };

  const handleDeleteWebinar = (id) => {
    console.log("Webinaire supprimé :", id);
    toast.success("Webinaire supprimé avec succès!");
  };

  const openAddForm = () => {
    setWebinarToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (webinar) => {
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-[200px] rounded-lg" />
            ))}
          </div>
        ) : filteredWebinars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredWebinars.map((webinar) => (
              <WebinarCard
                key={webinar.id}
                {...webinar}
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

      {/* Modal pour ajouter/éditer un webinaire */}
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
