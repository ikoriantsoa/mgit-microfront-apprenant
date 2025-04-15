
import { Layout } from "@/components/layout/Layout";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCardSkeleton } from "@/components/webinar/WebinarCardSkeleton";
import { useState } from "react";
import { webinars } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WebinarFormModal } from "@/components/webinar/WebinarFormModal";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

// Simulation d'une fonction d'API
const fetchWebinars = async () => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 2000));
  return webinars;
};

const WebinarList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [webinarToEdit, setWebinarToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Utiliser react-query pour charger les webinaires
  const { data: webinarsList, isLoading, isError } = useQuery({
    queryKey: ['webinars'],
    queryFn: fetchWebinars
  });

  // État local pour les modifications après le chargement initial
  const [localWebinarsList, setLocalWebinarsList] = useState(webinars);

  // Mettre à jour la liste locale quand les données sont chargées
  useEffect(() => {
    if (webinarsList) {
      setLocalWebinarsList(webinarsList);
    }
  }, [webinarsList]);
  
  // Obtenir les catégories uniques pour le filtre
  const categories = Array.from(new Set((webinarsList || []).map(webinar => webinar.category)));
  
  // Filtrer les webinaires en fonction des critères de recherche
  const filteredWebinars = localWebinarsList ? localWebinarsList.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(search.toLowerCase()) || 
                          webinar.presenter.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || webinar.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || webinar.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }) : [];

  const handleAddWebinar = (newWebinar) => {
    const webinarWithId = {
      ...newWebinar,
      id: `webinar-${Date.now()}`,
    };
    setLocalWebinarsList([...localWebinarsList, webinarWithId]);
    toast.success("Webinaire ajouté avec succès!");
    setIsFormOpen(false);
  };

  const handleUpdateWebinar = (updatedWebinar) => {
    setLocalWebinarsList(
      localWebinarsList.map((webinar) => 
        webinar.id === updatedWebinar.id ? updatedWebinar : webinar
      )
    );
    setWebinarToEdit(null);
    toast.success("Webinaire mis à jour avec succès!");
    setIsFormOpen(false);
  };

  const handleDeleteWebinar = (id) => {
    setLocalWebinarsList(localWebinarsList.filter((webinar) => webinar.id !== id));
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

  // Composant pour les filtres
  const FiltersContent = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="category-filter" className="text-sm font-medium mb-2 block">Catégorie</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger id="category-filter" className="w-full">
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
      </div>
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => {
          setSearch("");
          setCategoryFilter("all");
          setStatusFilter("all");
        }}
      >
        <Filter className="h-4 w-4 mr-2" /> Réinitialiser
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Liste des webinaires</h1>
            <p className="text-muted-foreground">
              Partage ton talent et monte en compétences avec les autres apprenants.
            </p>
          </div>
          <Button onClick={openAddForm} className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" /> Déposer un webinaire
          </Button>
        </div>

        {/* Filtres - Version Mobile */}
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 mr-2">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filtres
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80%] rounded-t-xl">
                  <SheetHeader>
                    <SheetTitle>Filtrer les webinaires</SheetTitle>
                    <SheetDescription>
                      Affinez votre recherche en utilisant les filtres ci-dessous.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <FiltersContent />
                  </div>
                </SheetContent>
              </Sheet>
              
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
              <Button variant="outline" onClick={() => {
                setSearch("");
                setCategoryFilter("all");
                setStatusFilter("all");
              }}>
                Réinitialiser
              </Button>
            </div>
          )}
        </div>
        
        {/* Résultats */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array(6).fill(0).map((_, index) => (
              <WebinarCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-lg">Erreur de chargement</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Une erreur s'est produite lors du chargement des webinaires. Veuillez réessayer.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
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
              Aucun webinaire ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
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

// Ajout de l'import manquant
import { useEffect } from 'react';

export default WebinarList;
