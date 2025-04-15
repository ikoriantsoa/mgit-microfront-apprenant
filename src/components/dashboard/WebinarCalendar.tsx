
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { format, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { webinarDates } from "@/data/mockData";
import { Button } from "@/components/ui/button";

export function WebinarCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Créer une date pour hier afin de désactiver les dates passées
  const yesterday = subDays(new Date(), 1);
  
  // Fonction qui désactive les dates avant hier
  const disabledDays = (day: Date) => {
    return isBefore(day, yesterday);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Calendrier des webinaires</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          className="rounded-md border"
          modifiers={{
            webinarDay: webinarDates
          }}
          modifiersStyles={{
            webinarDay: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--primary) / 0.2)",
              color: "hsl(var(--primary))"
            }
          }}
          disabled={disabledDays}
        />
        
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2">
            {date ? format(date, "d MMMM yyyy", { locale: fr }) : "Sélectionnez une date"}
          </h4>
          {date && 
            webinarDates.some(
              webinarDate => 
                webinarDate.getDate() === date.getDate() && 
                webinarDate.getMonth() === date.getMonth() && 
                webinarDate.getFullYear() === date.getFullYear()
            ) ? (
              <div className="space-y-2">
                <div className="p-2 text-sm rounded-md border bg-muted/50">
                  <p className="font-medium">Introduction à React</p>
                  <p className="text-xs text-muted-foreground">13:00 - 14:30</p>
                </div>
                <div className="p-2 text-sm rounded-md border bg-muted/50">
                  <p className="font-medium">Formation Tailwind CSS avancé</p>
                  <p className="text-xs text-muted-foreground">16:00 - 17:30</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun webinaire prévu ce jour</p>
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}
