import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { webinarDates, webinars } from "@/data/mockData";
import { format, isBefore, isSameDay, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCardSkeleton } from "@/components/webinar/WebinarCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { UpcomingWebinar } from "@/components/webinar/UpcomingWebinar";

const fetchWebinarDates = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return webinarDates;
};

const fetchWebinars = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return webinars;
};

const fetchCurrentWebinar = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return webinars.find((w) => w.status === "live");
};

const fetchWebinarsForDate = async (date) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!date) return [];

  const hasWebinars = webinarDates.some((webinarDate) =>
    isSameDay(webinarDate, date)
  );

  if (hasWebinars) {
    return webinars.slice(0, 3);
  }

  return [];
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const yesterday = subDays(new Date(), 1);

  const disabledDays = (day: Date) => {
    return isBefore(day, yesterday);
  };

  const { data: webinarDatesData, isLoading: datesLoading } = useQuery({
    queryKey: ["webinarDates"],
    queryFn: fetchWebinarDates,
  });

  const { data: webinarsData } = useQuery({
    queryKey: ["webinars"],
    queryFn: fetchWebinars,
  });

  const { data: currentWebinar, isLoading: currentWebinarLoading } = useQuery({
    queryKey: ["currentWebinar"],
    queryFn: fetchCurrentWebinar,
  });

  const { data: webinarsForDate, isLoading: dateWebinarsLoading } = useQuery({
    queryKey: ["webinarsForDate", date ? date.toISOString() : null],
    queryFn: () => fetchWebinarsForDate(date),
    enabled: !!date,
  });

  const hasWebinarsOnDate = (date: Date) => {
    if (!webinarDatesData) return false;

    return webinarDatesData.some((webinarDate) => isSameDay(webinarDate, date));
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Calendrier des webinaires
          </h1>
          <p className="text-muted-foreground">
            Restez informer sur les prochains thèmes et rendez-vous pour votre
            prochain webinaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Calendrier</CardTitle>
            </CardHeader>
            <CardContent>
              {datesLoading ? (
                <Skeleton className="h-[340px] w-full rounded-md" />
              ) : (
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                  className="rounded-md border"
                  modifiers={{
                    webinarDay: webinarDatesData || [],
                  }}
                  modifiersStyles={{
                    webinarDay: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  disabled={disabledDays}
                />
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle>
                {date
                  ? format(date, "d MMMM yyyy", { locale: fr })
                  : "Sélectionnez une date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {date && (
                <>
                  {dateWebinarsLoading ? (
                    <div className="space-y-6">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <div className="space-y-4">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <WebinarCardSkeleton key={index} />
                          ))}
                      </div>
                    </div>
                  ) : webinarsForDate && webinarsForDate.length > 0 ? (
                    <div className="space-y-6">
                      <h3 className="font-semibold">
                        Webinaires du {format(date, "d MMMM", { locale: fr })}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {webinarsForDate.map((webinar) => (
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
                      <h3 className="font-semibold text-lg">
                        Aucun webinaire prévu
                      </h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Il n'y a pas de webinaire programmé pour cette date.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Proposition de thème</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!webinarsData
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <WebinarCardSkeleton key={index} />)
              : webinarsData
                  .filter((webinar) => webinar.status === "upcoming")
                  .slice(0, 3)
                  .map((webinar) => (
                    <UpcomingWebinar key={webinar.id} {...webinar} />
                  ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
