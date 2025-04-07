import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Mail,
  MapPin,
  BookOpen,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trainees } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const Trainees = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Filtrer les stagiaires
  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(search.toLowerCase()) ||
      trainee.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || trainee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenProfile = (trainee) => {
    setSelectedTrainee(trainee);
    setProfileOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stagiaires</h1>
            <p className="text-muted-foreground">
              Découvrez les profils de nos talents.
            </p>
          </div>
          <Button>Contacter MGIT service</Button>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un stagiaire..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          >
            <Filter className="h-4 w-4 mr-2" /> Réinitialiser
          </Button>
        </div>

        {/* Liste des stagiaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainees.map((trainee) => (
            <Card
              key={trainee.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center space-y-0 gap-4 pb-2">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-xl text-primary">
                    {trainee.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trainee.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {trainee.email}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Thème webinaire en cours
                    </span>
                    <span className="font-medium">{trainee.program}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progrès</span>
                    <span className="font-medium">{trainee.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mt-1">
                    <div
                      className={`h-full rounded-full ${
                        trainee.progress >= 80
                          ? "bg-green-500"
                          : trainee.progress >= 40
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${trainee.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button
                className="hover:bg-blue-700"
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenProfile(trainee)}
                >
                  Voir le profil
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTrainees.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">Aucun stagiaire trouvé</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Aucun stagiaire ne correspond à vos critères de recherche. Essayez
              d'ajuster vos filtres.
            </p>
          </div>
        )}

        {/* Dialogue du profil stagiaire */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTrainee && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    CV - {selectedTrainee.name}
                  </DialogTitle>
                  <DialogDescription>
                    Profil de formation et parcours professionnel
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-8">
                  {/* En-tête du CV */}
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex-shrink-0">
                      <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                        {selectedTrainee.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-bold">
                        {selectedTrainee.name}
                      </h2>
                      <p className="text-xl text-muted-foreground">
                        {selectedTrainee.title || selectedTrainee.program}
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {selectedTrainee.skills &&
                          selectedTrainee.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1 text-sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedTrainee.email}</span>
                      </div>
                      {selectedTrainee.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedTrainee.location}</span>
                        </div>
                      )}
                      
                    </div>
                  </div>

                  {/* Résumé */}
                  {selectedTrainee.bio && (
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />À propos
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedTrainee.bio}
                      </p>
                    </div>
                  )}

                  {/* Formation en cours */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Webinaire en préparation
                    </h3>
                    <div className="bg-muted/50 p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">
                            {selectedTrainee.program}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progression</span>
                          <span className="font-medium">
                            {selectedTrainee.progress}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              selectedTrainee.progress >= 80
                                ? "bg-green-500"
                                : selectedTrainee.progress >= 40
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${selectedTrainee.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Webinaires suivis */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      Webinaires effectués
                    </h3>
                    {selectedTrainee.attendedWebinars &&
                    selectedTrainee.attendedWebinars.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Titre</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedTrainee.attendedWebinars.map(
                              (webinar, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">
                                    {webinar.title}
                                  </TableCell>
                                  <TableCell>{webinar.date}</TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Aucun webinaire pour le moment.
                      </p>
                    )}
                  </div>

                  {/* Expérience professionnelle */}
                  {selectedTrainee.experience &&
                    selectedTrainee.experience.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Expérience professionnelle
                        </h3>
                        <div className="space-y-4">
                          {selectedTrainee.experience.map((exp, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-muted pl-4 pb-2"
                            >
                              <h4 className="font-medium">{exp.role}</h4>
                              <p className="text-sm text-muted-foreground">
                                {exp.company}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {exp.period}
                              </p>
                              <p className="text-sm mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Formation académique */}
                  {selectedTrainee.education &&
                    selectedTrainee.education.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          Formation académique
                        </h3>
                        <div className="space-y-4">
                          {selectedTrainee.education.map((edu, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-muted pl-4 pb-2"
                            >
                              <h4 className="font-medium">{edu.degree}</h4>
                              <p className="text-sm text-muted-foreground">
                                {edu.institution}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {edu.period}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Certifications */}
                  {selectedTrainee.certifications &&
                    selectedTrainee.certifications.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Certifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedTrainee.certifications.map((cert, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <h4 className="font-medium">{cert.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {cert.issuer}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {cert.date}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Button className="">Contacter MGIT Service pour ce profil</Button>
                      </div>
                    )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Trainees;
