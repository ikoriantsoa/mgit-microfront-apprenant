
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCardSkeleton } from "@/components/webinar/WebinarCardSkeleton";
import { WebinarCalendar } from "@/components/dashboard/WebinarCalendar";
import { UpcomingWebinar } from "@/components/webinar/UpcomingWebinar";
import { 
  Users,
  Video,
  Calendar,
  TrendingUp 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { webinars, upcomingWebinarsSimple, stats } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

// Simulations de fonctions d'API à remplacer par les vraies
const fetchStats = async () => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1500));
  return stats;
};

const fetchWebinars = async () => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 2000));
  return webinars;
};

const fetchUpcomingWebinars = async () => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1800));
  return upcomingWebinarsSimple;
};

const Dashboard = () => {
  // Utilisation de react-query pour charger les données
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats
  });

  const { data: webinarsData, isLoading: webinarsLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: fetchWebinars
  });

  const { data: upcomingWebinarsData, isLoading: upcomingLoading } = useQuery({
    queryKey: ['upcomingWebinars'],
    queryFn: fetchUpcomingWebinars
  });

  // Récupérer les webinaires récents
  const recentWebinars = webinarsData?.slice(0, 3) || [];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue sur le tableau de bord des webinaires de nos stagiaires.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/webinars">Tous les webinaires</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calendar">Calendrier</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Webinaires récents</h2>
              <Button variant="link" asChild>
                <Link to="/webinars">Voir tous les webinaires</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {webinarsLoading ? (
                // Afficher des skeletons pendant le chargement
                Array(3).fill(0).map((_, index) => (
                  <WebinarCardSkeleton key={index} />
                ))
              ) : (
                recentWebinars.map((webinar) => (
                  <WebinarCard key={webinar.id} {...webinar} />
                ))
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webinaires à venir</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingLoading ? (
                  // Skeleton pour les webinaires à venir
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))
                ) : (
                  upcomingWebinarsData?.map((webinar, index) => (
                    <UpcomingWebinar key={index} {...webinar} />
                  ))
                )}
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
