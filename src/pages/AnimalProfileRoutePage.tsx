import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { AnimalProfilePage } from "./AnimalProfilePage";
import { Animal } from "../types/animal";
import { getAnimalById } from "../services/animals";

interface AnimalProfileRoutePageProps {
  onOpenAdoption: (animal: Animal) => void;
  onOpenSponsorship: () => void;
}

export function AnimalProfileRoutePage({
  onOpenAdoption,
  onOpenSponsorship,
}: AnimalProfileRoutePageProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadAnimal() {
      try {
        setLoading(true);
        setNotFound(false);

        if (!id) {
          setNotFound(true);
          return;
        }

        const data = await getAnimalById(id);
        setAnimal(data);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadAnimal();
  }, [id]);

  if (!id) {
    return <Navigate to="/animais" replace />;
  }

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !animal) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5">Animal não encontrado</Typography>
      </Box>
    );
  }

  return (
    <AnimalProfilePage
      animal={animal}
      onBack={() => navigate("/animais")}
      onAdoptClick={() => onOpenAdoption(animal)}
      onSponsorClick={onOpenSponsorship}
    />
  );
}
