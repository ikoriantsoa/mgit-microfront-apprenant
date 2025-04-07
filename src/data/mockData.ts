// Types pour les données
export interface Webinar {
  id: string;
  title: string;
  presenter: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  category: string;
  status: "upcoming" | "live" | "completed" | "cancelled";
  thumbnailUrl: string;
  description?: string;
}

export interface UpcomingWebinarSimple {
  title: string;
  date: string;
  time: string;
  presenter: string;
}

export interface StatData {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
}

export interface AttendedWebinar {
  id: string;
  title: string;
  date: string;
  presenter: string;
  rating?: number;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Trainee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  title?: string;
  bio?: string;
  program: string;
  progress: number;
  status: "active" | "inactive" | "completed";
  webinarsAttended: number;
  totalWebinars: number;
  enrollmentDate?: string;
  skills?: string[];
  attendedWebinars?: AttendedWebinar[];
  experience?: Experience[];
  education?: Education[];
  certifications?: Certification[];
}

// Données mockées pour les webinaires
export const webinars: Webinar[] = [
  {
    id: "1",
    title: "Introduction à React pour débutants",
    presenter: "Marie Dubois",
    date: "12 Juin 2023",
    time: "14:00",
    duration: "1h 30m",
    attendees: 45,
    category: "Développement Web",
    status: "completed",
    thumbnailUrl:
      "public/f64815e6-3df2-40f5-90df-32208f468511.jpeg",
    description:
      "Apprenez les fondamentaux de React, de la création de composants à la gestion d'état. Ce webinaire est conçu pour les développeurs ayant une connaissance de base en HTML, CSS et JavaScript.",
  },
  {
    id: "2",
    title: "Maîtriser Tailwind CSS en entreprise",
    presenter: "Thomas Martin",
    date: "15 Juin 2023",
    time: "10:00",
    duration: "2h",
    attendees: 32,
    category: "Design Front-end",
    status: "live",
    thumbnailUrl:
      "public/tailwind.png",
    description:
      "Découvrez les meilleures pratiques pour utiliser Tailwind CSS dans vos projets d'entreprise, avec des conseils pour l'organisation du code et l'optimisation des performances.",
  },
  {
    id: "3",
    title: "TypeScript Avancé pour les équipes de développement",
    presenter: "Julie Bernard",
    date: "20 Juin 2023",
    time: "15:30",
    duration: "1h 45m",
    attendees: 28,
    category: "Programmation",
    status: "upcoming",
    thumbnailUrl:
      "public/typescriptAvancée.webp",
    description:
      "Ce webinaire aborde les fonctionnalités avancées de TypeScript : génériques, types conditionnels, inférence de types et stratégies pour améliorer la qualité du code dans les grandes bases de code.",
  },
  {
    id: "4",
    title: "API RESTful avec Node.js et Express",
    presenter: "Alexandre Lefebvre",
    date: "25 Juin 2023",
    time: "11:00",
    duration: "2h",
    attendees: 40,
    category: "Backend",
    status: "upcoming",
    thumbnailUrl: "public/nodejsAPI.png",
    description:
      "Créez des API RESTful robustes avec Node.js et Express. Nous couvrirons la structure des routes, la validation des données, l'authentification et la documentation.",
  },
  {
    id: "5",
    title: "Optimisation des performances React",
    presenter: "Sophie Moreau",
    date: "30 Juin 2023",
    time: "14:00",
    duration: "1h 30m",
    attendees: 35,
    category: "Développement Web",
    status: "upcoming",
    thumbnailUrl:
      "public/reactPerformance.jpeg",
    description:
      "Améliorez les performances de vos applications React avec des techniques avancées : memoization, code splitting, lazy loading, et optimisation du rendu.",
  },
  {
    id: "6",
    title: "Introduction à GraphQL",
    presenter: "Marc Dubois",
    date: "5 Juillet 2023",
    time: "10:30",
    duration: "2h",
    attendees: 30,
    category: "API",
    status: "upcoming",
    thumbnailUrl: "public/graphql.png",
    description:
      "Découvrez comment GraphQL peut remplacer les API REST traditionnelles avec un modèle plus efficace et flexible pour les requêtes de données.",
  },
  {
    id: "7",
    title: "Tests automatisés avec Jest et React Testing Library",
    presenter: "Clara Martin",
    date: "10 Juillet 2023",
    time: "15:00",
    duration: "1h 45m",
    attendees: 25,
    category: "Qualité logicielle",
    status: "upcoming",
    thumbnailUrl:
      "public/reactTestingLibraire.jpeg",
    description:
      "Apprenez à mettre en place une stratégie de tests efficace pour vos applications React avec Jest et React Testing Library.",
  },
  {
    id: "8",
    title: "Déploiement continu avec GitHub Actions",
    presenter: "Antoine Bernard",
    date: "15 Juillet 2023",
    time: "11:00",
    duration: "1h 30m",
    attendees: 20,
    category: "DevOps",
    status: "upcoming",
    thumbnailUrl:
      "public/githubActions.jpeg",
    description:
      "Automatisez vos workflows de développement avec GitHub Actions pour des déploiements fluides et sans erreur.",
  },
];

// Données mockées pour les webinaires à venir (version simplifiée)
export const upcomingWebinarsSimple: UpcomingWebinarSimple[] = [
  {
    title: "Gestion de projet Agile",
    date: "22 Juin",
    time: "11:00",
    presenter: "Nicolas Petit",
  },
  {
    title: "UX/UI Design pour développeurs",
    date: "23 Juin",
    time: "14:30",
    presenter: "Amélie Lefebvre",
  },
  {
    title: "DevOps pour les startups",
    date: "24 Juin",
    time: "16:00",
    presenter: "Pierre Moreau",
  },
  {
    title: "Bases de données NoSQL",
    date: "27 Juin",
    time: "10:00",
    presenter: "Camille Blanc",
  },
];

// Dates pour le calendrier des webinaires
export const webinarDates = [
  new Date(),
  new Date(new Date().setDate(new Date().getDate() + 2)),
  new Date(new Date().setDate(new Date().getDate() + 5)),
  new Date(new Date().setDate(new Date().getDate() + 10)),
  new Date(new Date().setDate(new Date().getDate() + 15)),
];

// Statistiques pour le tableau de bord
export const stats = [
  {
    title: "Webinaires Totaux",
    value: "124",
    change: { value: "12%", positive: true },
    icon: "Video",
  },
  {
    title: "Participants",
    value: "1,893",
    change: { value: "8%", positive: true },
    icon: "Users",
    iconColor: "text-blue-500",
  },
  {
    title: "Sessions à venir",
    value: "18",
    change: { value: "2%", positive: false },
    icon: "Calendar",
    iconColor: "text-indigo-500",
  },
  {
    title: "Taux d'achèvement",
    value: "87%",
    change: { value: "5%", positive: true },
    icon: "TrendingUp",
    iconColor: "text-green-500",
  },
];

// Données mock pour la page Stagiaires
export const trainees: Trainee[] = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "06 12 34 56 78",
    location: "Lyon, France",
    title: "Développeuse Web Junior",
    bio: "Passionnée par le développement web et les nouvelles technologies, je suis en reconversion professionnelle après 5 ans dans le marketing digital. Je cherche à approfondir mes compétences en développement full stack pour créer des applications web performantes et accessibles.",
    program: "Développement Web Full Stack",
    progress: 85,
    status: "active",
    webinarsAttended: 12,
    totalWebinars: 15,
    enrollmentDate: "15/02/2023",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    attendedWebinars: [
      {
        id: "1",
        title: "Introduction à React pour débutants",
        date: "12 Juin 2023",
        presenter: "Marie Dubois",
        rating: 5,
      },
      {
        id: "2",
        title: "Maîtriser Tailwind CSS en entreprise",
        date: "15 Juin 2023",
        presenter: "Thomas Martin",
        rating: 4,
      },
      {
        id: "3",
        title: "TypeScript Avancé pour les équipes de développement",
        date: "20 Juin 2023",
        presenter: "Julie Bernard",
        rating: 5,
      },
    ],
    experience: [
      {
        role: "Chef de produit marketing",
        company: "AgenceDigital",
        period: "Jan 2018 - Déc 2022",
        description:
          "Gestion de campagnes marketing pour des clients du secteur tech, analyse de données et création de stratégies digitales.",
      },
      {
        role: "Assistante marketing",
        company: "TechStart",
        period: "Juin 2016 - Déc 2017",
        description:
          "Support aux opérations marketing, gestion des réseaux sociaux et organisation d'événements.",
      },
    ],
    education: [
      {
        degree: "Master en Marketing Digital",
        institution: "École de Commerce de Lyon",
        period: "2014 - 2016",
      },
      {
        degree: "Licence en Communication",
        institution: "Université Lyon 2",
        period: "2011 - 2014",
      },
    ],
    certifications: [
      {
        name: "JavaScript - Les Fondamentaux",
        issuer: "OpenClassrooms",
        date: "Mars 2023",
      },
      {
        name: "React - Niveau Intermédiaire",
        issuer: "Codecademy",
        date: "Mai 2023",
      },
    ],
  },
  {
    id: "2",
    name: "Lucas Dubois",
    email: "lucas.dubois@example.com",
    phone: "07 23 45 67 89",
    location: "Paris, France",
    title: "Designer UX/UI Junior",
    bio: "Designer passionné par l'expérience utilisateur et l'accessibilité. Mon objectif est de créer des interfaces intuitives et esthétiques qui répondent aux besoins des utilisateurs et aux objectifs business.",
    program: "Design UX/UI",
    progress: 70,
    status: "active",
    webinarsAttended: 8,
    totalWebinars: 12,
    enrollmentDate: "03/03/2023",
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Wireframing",
      "Prototyping",
      "Design System",
    ],
    attendedWebinars: [
      {
        id: "5",
        title: "Optimisation des performances React",
        date: "30 Juin 2023",
        presenter: "Sophie Moreau",
        rating: 4,
      },
      {
        id: "7",
        title: "Tests automatisés avec Jest et React Testing Library",
        date: "10 Juillet 2023",
        presenter: "Clara Martin",
        rating: 3,
      },
    ],
    experience: [
      {
        role: "Stagiaire UI Designer",
        company: "Studio Design & Co",
        period: "Jan 2022 - Juin 2022",
        description:
          "Création d'interfaces utilisateur pour applications mobiles et web, participation aux ateliers de conception UX.",
      },
    ],
    education: [
      {
        degree: "Bachelor en Design Numérique",
        institution: "École de Design de Paris",
        period: "2019 - 2022",
      },
    ],
  },
  {
    id: "3",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    phone: "06 34 56 78 90",
    location: "Bordeaux, France",
    title: "Spécialiste Marketing Digital",
    program: "Marketing Digital",
    progress: 100,
    status: "completed",
    webinarsAttended: 10,
    totalWebinars: 10,
    enrollmentDate: "10/01/2023",
    skills: [
      "SEO/SEA",
      "Google Analytics",
      "Content Marketing",
      "Social Media",
      "Email Marketing",
    ],
    attendedWebinars: [
      {
        id: "4",
        title: "API RESTful avec Node.js et Express",
        date: "25 Juin 2023",
        presenter: "Alexandre Lefebvre",
        rating: 5,
      },
      {
        id: "6",
        title: "Introduction à GraphQL",
        date: "5 Juillet 2023",
        presenter: "Marc Dubois",
        rating: 5,
      },
      {
        id: "8",
        title: "Déploiement continu avec GitHub Actions",
        date: "15 Juillet 2023",
        presenter: "Antoine Bernard",
        rating: 4,
      },
    ],
    experience: [
      {
        role: "Responsable marketing junior",
        company: "E-commerce Solutions",
        period: "Sept 2020 - Présent",
        description:
          "Élaboration et mise en œuvre de stratégies marketing digitales, analyse de performances et optimisation des campagnes.",
      },
      {
        role: "Assistante marketing",
        company: "Retail Group",
        period: "Jan 2019 - Août 2020",
        description:
          "Gestion des campagnes email, mise à jour du site web et analyse des statistiques de vente.",
      },
    ],
    education: [
      {
        degree: "Master en Marketing Digital",
        institution: "IAE Bordeaux",
        period: "2017 - 2019",
      },
      {
        degree: "Licence en Commerce",
        institution: "Université de Bordeaux",
        period: "2014 - 2017",
      },
    ],
    certifications: [
      {
        name: "Google Analytics Individual Qualification",
        issuer: "Google",
        date: "Fév 2023",
      },
      {
        name: "Certification SEO Avancé",
        issuer: "SEMrush Academy",
        date: "Avr 2023",
      },
      {
        name: "Social Media Marketing",
        issuer: "HubSpot Academy",
        date: "Mai 2023",
      },
    ],
  },
  {
    id: "4",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    program: "Data Science",
    progress: 45,
    status: "active",
    webinarsAttended: 5,
    totalWebinars: 12,
    skills: ["Python", "SQL", "Pandas", "NumPy", "Data Visualization"],
    attendedWebinars: [
      {
        id: "2",
        title: "Maîtriser Tailwind CSS en entreprise",
        date: "15 Juin 2023",
        presenter: "Thomas Martin",
        rating: 4,
      },
    ],
  },
  {
    id: "5",
    name: "Léa Richard",
    email: "lea.richard@example.com",
    program: "Product Management",
    progress: 0,
    status: "inactive",
    webinarsAttended: 0,
    totalWebinars: 8,
  },
  {
    id: "6",
    name: "Hugo Moreau",
    email: "hugo.moreau@example.com",
    phone: "06 45 67 89 12",
    location: "Toulouse, France",
    program: "Développement Web Front-End",
    progress: 30,
    status: "active",
    webinarsAttended: 3,
    totalWebinars: 10,
    enrollmentDate: "05/04/2023",
    skills: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS"],
    attendedWebinars: [
      {
        id: "1",
        title: "Introduction à React pour débutants",
        date: "12 Juin 2023",
        presenter: "Marie Dubois",
        rating: 5,
      },
    ],
  },
  {
    id: "7",
    name: "Manon Durand",
    email: "manon.durand@example.com",
    phone: "07 56 78 90 12",
    location: "Lille, France",
    title: "Data Scientist Junior",
    program: "Intelligence Artificielle",
    progress: 90,
    status: "active",
    webinarsAttended: 9,
    totalWebinars: 10,
    enrollmentDate: "20/01/2023",
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "NLP"],
    attendedWebinars: [
      {
        id: "3",
        title: "TypeScript Avancé pour les équipes de développement",
        date: "20 Juin 2023",
        presenter: "Julie Bernard",
        rating: 4,
      },
      {
        id: "5",
        title: "Optimisation des performances React",
        date: "30 Juin 2023",
        presenter: "Sophie Moreau",
        rating: 5,
      },
    ],
    experience: [
      {
        role: "Stagiaire Data Analyst",
        company: "Tech Solutions",
        period: "Juin 2022 - Déc 2022",
        description:
          "Analyse de données clients, création de dashboards et rapports pour l'équipe marketing.",
      },
    ],
    education: [
      {
        degree: "Master en Science des Données",
        institution: "École d'Ingénieurs de Lille",
        period: "2020 - 2022",
      },
      {
        degree: "Licence en Mathématiques Appliquées",
        institution: "Université de Lille",
        period: "2017 - 2020",
      },
    ],
    certifications: [
      {
        name: "Deep Learning Specialization",
        issuer: "Coursera",
        date: "Déc 2022",
      },
      {
        name: "Machine Learning Engineer",
        issuer: "DataCamp",
        date: "Mar 2023",
      },
    ],
  },
  {
    id: "8",
    name: "Antoine Lambert",
    email: "antoine.lambert@example.com",
    phone: "06 78 90 12 34",
    location: "Nantes, France",
    title: "Expert en Cybersécurité",
    bio: "Professionnel de la cybersécurité avec une expertise en analyse de vulnérabilités et réponse aux incidents. Je me forme continuellement pour rester à jour avec les dernières menaces et solutions de sécurité.",
    program: "Cybersécurité",
    progress: 100,
    status: "completed",
    webinarsAttended: 12,
    totalWebinars: 12,
    enrollmentDate: "05/12/2022",
    skills: [
      "Pentesting",
      "Analyse de vulnérabilité",
      "Cryptographie",
      "Forensic",
      "Sécurité réseau",
    ],
    attendedWebinars: [
      {
        id: "4",
        title: "API RESTful avec Node.js et Express",
        date: "25 Juin 2023",
        presenter: "Alexandre Lefebvre",
        rating: 5,
      },
      {
        id: "6",
        title: "Introduction à GraphQL",
        date: "5 Juillet 2023",
        presenter: "Marc Dubois",
        rating: 4,
      },
      {
        id: "7",
        title: "Tests automatisés avec Jest et React Testing Library",
        date: "10 Juillet 2023",
        presenter: "Clara Martin",
        rating: 5,
      },
    ],
    experience: [
      {
        role: "Analyste en cybersécurité",
        company: "SecureNet",
        period: "Jan 2019 - Présent",
        description:
          "Surveillance de la sécurité des systèmes, analyse des incidents et mise en place de mesures correctives.",
      },
      {
        role: "Administrateur système",
        company: "IT Solutions",
        period: "Mar 2016 - Déc 2018",
        description:
          "Gestion des infrastructures réseau, maintenance des serveurs et support technique aux utilisateurs.",
      },
    ],
    education: [
      {
        degree: "Master en Sécurité des Systèmes d'Information",
        institution: "ISEN Nantes",
        period: "2014 - 2016",
      },
      {
        degree: "Licence en Informatique",
        institution: "Université de Nantes",
        period: "2011 - 2014",
      },
    ],
    certifications: [
      {
        name: "Certified Ethical Hacker (CEH)",
        issuer: "EC-Council",
        date: "Jan 2021",
      },
      {
        name: "CISSP",
        issuer: "ISC²",
        date: "Nov 2022",
      },
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        date: "Mar 2019",
      },
    ],
  },
];

// Données mock pour la page Rapports
export const reportSummary = [
  {
    title: "Total participants",
    value: "1,248",
    trend: 12,
  },
  {
    title: "Taux d'assiduité",
    value: "87%",
    trend: 5,
  },
  {
    title: "Webinaires réalisés",
    value: "32",
    trend: 0,
  },
  {
    title: "Note moyenne",
    value: "4.8/5",
    trend: -1,
  },
];

export const monthlyAttendanceData = [
  { name: "Jan", value: 342 },
  { name: "Fév", value: 458 },
  { name: "Mar", value: 521 },
  { name: "Avr", value: 398 },
  { name: "Mai", value: 487 },
  { name: "Juin", value: 623 },
  { name: "Juil", value: 512 },
  { name: "Août", value: 324 },
  { name: "Sept", value: 586 },
  { name: "Oct", value: 678 },
  { name: "Nov", value: 435 },
  { name: "Déc", value: 298 },
];

export const webinarCategoryData = [
  { name: "Développement", value: 15 },
  { name: "Design", value: 8 },
  { name: "Marketing", value: 7 },
  { name: "Data", value: 5 },
  { name: "Soft skills", value: 4 },
];

export const topWebinarsData = [
  {
    title: "Introduction à React",
    presenter: "Marie Lambert",
    date: "12 Oct 2023",
    attendees: 245,
    completionRate: 92,
  },
  {
    title: "Fondamentaux du Design UX",
    presenter: "Paul Durand",
    date: "15 Sept 2023",
    attendees: 198,
    completionRate: 88,
  },
  {
    title: "Marketing Digital Avancé",
    presenter: "Julien Martin",
    date: "3 Nov 2023",
    attendees: 176,
    completionRate: 84,
  },
  {
    title: "Python pour Data Science",
    presenter: "Claire Bernard",
    date: "22 Oct 2023",
    attendees: 152,
    completionRate: 90,
  },
  {
    title: "Leadership et gestion d'équipe",
    presenter: "Alexandre Robert",
    date: "8 Déc 2023",
    attendees: 124,
    completionRate: 78,
  },
];
