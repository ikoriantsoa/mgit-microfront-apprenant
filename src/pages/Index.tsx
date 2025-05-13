import { Layout } from "@/components/layout/Layout";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCalendar } from "@/components/dashboard/WebinarCalendar";
import { UpcomingWebinar } from "@/components/webinar/UpcomingWebinar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { webinars, upcomingWebinarsSimple } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import keycloak from "../../src/keycloak/keycloak";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Ban } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  // Récupérer les webinaires récents
  const recentWebinars = webinars.slice(0, 3);

  const recentWebinaire = async (token: string) => {
    const response = await axios.get(
      "http://localhost:3000/talentApprenant/recentWebinaire",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    console.log("data: ", data);

    return data;
  };

  const {
    data: webinaire = { decryptWebinaire: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentWebinaire"],
    queryFn: async () => {
      if (!keycloak.token) {
        throw new Error("Pas de token disponible");
      }
      return await recentWebinaire(keycloak.token);
    },
  });

  const web = webinaire.decryptWebinaire;
  console.log("webinaire résultat: ", web);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Bienvenue Amboara
            </h1>
            <p className="text-muted-foreground">
              Partage ton talent et monte en compétences avec les autres
              apprenants.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              className="bg-[#74c9b2] hover:bg-[#f2f0f1] hover:text-[#74c9b2]"
            >
              <Link to="/webinaires">Tous les webinaires</Link>
            </Button>
            <Button
              asChild
              className="bg-[#74c9b2] hover:bg-[#f2f0f1] hover:text-[#74c9b2]"
            >
              <Link to="/calendrier">Calendrier</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Webinaires récents</h2>
              <Button variant="link" asChild className="text-[#74c9b2]">
                <Link to="/webinaires">Voir tous les webinaires</Link>
              </Button>
            </div>
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-[200px] rounded-lg" />
                ))}
              </div>
            )}
            {isError && (
              <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
                <Ban size={28} className="text-red-300" />
                <h2 className="text-xl font-semibold">
                  Erreur lors du chargement des webinaires récents.
                </h2>
                <p className="text-muted-foreground">
                  {"Veuillez réessayer plus tard ou vérifier votre connexion."}
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {webinaire.decryptWebinaire.map((webinar) => (
                <WebinarCard webinar={webinar} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggestion de thème de webinaire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingWebinarsSimple.map((webinar, index) => (
                  <UpcomingWebinar key={index} {...webinar} />
                ))}
              </CardContent>
            </Card>

            <WebinarCalendar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
