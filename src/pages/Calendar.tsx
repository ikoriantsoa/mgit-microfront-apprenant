import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { webinarDates, webinars } from "@/data/mockData";
import { addDays, format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebinarCard } from "@/components/webinar/WebinarCard";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "day">("month");

  // Fonction pour déterminer si une date a des webinaires
  const hasWebinarsOnDate = (date: Date) => {
    return webinarDates.some((webinarDate) => isSameDay(webinarDate, date));
  };

  // Obtenir les webinaires pour la date sélectionnée
  const getWebinarsForDate = (date: Date | undefined) => {
    if (!date) return [];

    // Simulons quelques webinaires pour la date sélectionnée
    // Dans une vraie application, ces données viendraient d'une API
    if (hasWebinarsOnDate(date)) {
      return webinars.slice(0, 3); // Utilisons les 3 premiers webinaires mockés
    }
    return [];
  };

  // Obtenir le webinaire en cours (s'il y en a un)
  const currentWebinar = webinars.find((w) => w.status === "live");

  // Fonction pour naviguer entre les jours en vue quotidienne
  const navigateDay = (direction: number) => {
    if (date) {
      const newDate = addDays(date, direction);
      setDate(newDate);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Calendrier des webinaires
          </h1>
          <p className="text-muted-foreground">
            Consultez tous les webinaires programmés pour suivre la montée en
            compétences de nos stagiaires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Calendrier</CardTitle>
                <div className="space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView("month")}
                    className={view === "month" ? "bg-secondary" : ""}
                  >
                    Mois
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView("day")}
                    className={view === "day" ? "bg-secondary" : ""}
                  >
                    Jour
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={fr}
                className="rounded-md border"
                modifiers={{
                  webinarDay: webinarDates,
                }}
                modifiersStyles={{
                  webinarDay: {
                    fontWeight: "bold",
                    backgroundColor: "hsl(var(--primary) / 0.2)",
                    color: "hsl(var(--primary))",
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-4">
            <CardHeader className="pb-2">
              {view === "day" && (
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateDay(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>
                    {date
                      ? format(date, "EEEE d MMMM yyyy", { locale: fr })
                      : "Sélectionnez une date"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateDay(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {view === "month" && (
                <CardTitle>
                  {date
                    ? format(date, "d MMMM yyyy", { locale: fr })
                    : "Sélectionnez une date"}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent>
              {date && view === "day" && (
                <div className="space-y-4">
                  {hasWebinarsOnDate(date) ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getWebinarsForDate(date).map((webinar) => (
                          <div
                            key={webinar.id}
                            className="p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <Badge>{webinar.time}</Badge>
                              <Badge variant="outline">
                                {webinar.duration}
                              </Badge>
                            </div>
                            <h3 className="font-medium">{webinar.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Présenté par {webinar.presenter}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg"></h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Il n'y a pas de webinaire programmé pour cette date.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {date && view === "month" && (
                <>
                  {hasWebinarsOnDate(date) ? (
                    <div className="space-y-6">
                      <h3 className="font-semibold">
                        Webinaires du {format(date, "d MMMM", { locale: fr })}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {getWebinarsForDate(date).map((webinar) => (
                          <WebinarCard
                            key={webinar.id}
                            {...webinar}
                            className="w-full"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg">Aucun webinaire</h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Il n'y a pas eu de webinaire ce jour.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Webinaires à venir */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Suggestion de thème de webinaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars
              .filter((webinar) => webinar.status === "upcoming")
              .slice(0, 3)
              .map((webinar) => (
                <WebinarCard key={webinar.id} {...webinar} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
