
import { Layout } from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  BarChart3, 
  PieChart, 
  CalendarDays, 
  Users 
} from "lucide-react";
import { useEffect, useState } from "react";
import { 
  reportSummary, 
  monthlyAttendanceData, 
  webinarCategoryData, 
  topWebinarsData 
} from "@/data/mockData";

// Simple Bar Chart Component
const BarChartComponent = ({ data }: { data }) => {
  const maxValue = Math.max(...data.map(item => item.value)) * 1.1; // 10% padding
  
  return (
    <div className="flex items-end h-64 gap-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div 
            className="w-full bg-primary rounded-t transition-all duration-500 ease-in-out hover:bg-primary/80"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          ></div>
          <div className="text-xs mt-2 text-center w-full truncate" title={item.name}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

// Simple Pie Chart Component
const PieChartComponent = ({ data }: { data }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  let startAngle = 0;
  
  return (
    <div className="relative h-64 w-64 mx-auto">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const endAngle = startAngle + angle;
          
          // Calculate path coordinates
          const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
          
          // Path flag
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          // Create path
          const path = `
            M 50 50
            L ${x1} ${y1}
            A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `;
          
          const currentStartAngle = startAngle;
          startAngle = endAngle;
          
          return (
            <path
              key={i}
              d={path}
              fill={`hsl(${i * 60}, 70%, 60%)`}
              stroke="white"
              strokeWidth="1"
              className="transition-all duration-300 hover:opacity-80"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
        {total}
      </div>
    </div>
  );
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
            <p className="text-muted-foreground">
              Analysez les données de participation et de performance.
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" /> Exporter
          </Button>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportSummary.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div 
                    className={`p-2 rounded-full ${
                      stat.trend > 0 ? 'bg-green-100 text-green-600' : 
                      stat.trend < 0 ? 'bg-red-100 text-red-600' : 
                      'bg-gray-100 text-gray-600'
                    } dark:bg-opacity-20`}
                  >
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Onglets des graphiques */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="attendance">
              <CalendarDays className="h-4 w-4 mr-2" /> Participation mensuelle
            </TabsTrigger>
            <TabsTrigger value="categories">
              <PieChart className="h-4 w-4 mr-2" /> Catégories
            </TabsTrigger>
            <TabsTrigger value="popular">
              <BarChart3 className="h-4 w-4 mr-2" /> Top Webinaires
            </TabsTrigger>
            <TabsTrigger value="completion">
              <Users className="h-4 w-4 mr-2" /> Taux de complétion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Participation mensuelle aux webinaires</CardTitle>
                <CardDescription>
                  Nombre total de participants par mois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartComponent data={monthlyAttendanceData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par catégorie de webinaire</CardTitle>
                <CardDescription>
                  Distribution des webinaires par thématique
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PieChartComponent data={webinarCategoryData} />
                <div className="space-y-2 ml-8">
                  {webinarCategoryData.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div 
                        className="h-3 w-3 mr-2 rounded-full" 
                        style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                      ></div>
                      <span>{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webinaires les plus populaires</CardTitle>
                <CardDescription>
                  Classement par nombre de participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topWebinarsData.map((webinar, i) => (
                    <div key={i} className="flex items-center">
                      <div className="text-xl font-bold w-8">{i + 1}.</div>
                      <div className="flex-1">
                        <div className="font-medium">{webinar.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {webinar.presenter} • {webinar.date}
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="font-semibold">{webinar.attendees} participants</div>
                        <div className="text-xs text-muted-foreground">
                          {webinar.completionRate}% de complétion
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Taux de complétion des formations</CardTitle>
                <CardDescription>
                  Pourcentage de stagiaires ayant terminé leur formation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="10"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 45 * 0.72} ${2 * Math.PI * 45 * (1 - 0.72)}`}
                        strokeDashoffset={2 * Math.PI * 45 * 0.25}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold">72%</div>
                      <div className="text-sm text-muted-foreground">Taux de complétion</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
