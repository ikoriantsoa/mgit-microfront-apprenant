import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function WebinarCard({ webinar }) {
  console.log('webinaire: ', webinar);
  const navigate = useNavigate();

  // Naviguer vers la page détaillée quand on clique sur la carte
  const handleCardClick = () => {
    navigate(`/webinaire/${webinar.webinaireId}`);
  };

  return (
    <>
      <Card
        className={`overflow-hidden hover:shadow-md transition-shadow group cursor-pointer`}
        onClick={handleCardClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${webinar.image}`}
            alt={webinar.titre}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between"></div>
          <CardTitle className="text-lg line-clamp-2 h-12">
            {webinar.titre}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {webinar.description}
          </p>  
        </CardContent>
      </Card>
    </>
  );
}
