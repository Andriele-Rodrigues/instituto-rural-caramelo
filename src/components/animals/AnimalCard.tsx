import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Animal } from "../../types/animal";

interface AnimalCardProps {
  animal: Animal;
  onClick: (animal: Animal) => void;
}

export function AnimalCard({ animal, onClick }: AnimalCardProps) {
  return (
    <Card
      elevation={4}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 8,
        },
        borderRadius: 3,
      }}
      onClick={() => onClick(animal)}
    >
      <CardMedia>
        <ImageWithFallback
          src={(Array.isArray(animal.foto) ? animal.foto[0] : animal.foto) || "/images/animal-placeholder.png"}
          alt={animal.nome || "Animal"}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
          }}
        />
      </CardMedia>

      <CardContent>
        <Typography variant="h6" sx={{ color: "text.primary", mb: 0.5 }}>
          {animal.nome || "Animal sem nome"}
        </Typography>

        <Typography variant="body2" sx={{ color: "#D97706", fontWeight: 600 }}>
          {(animal.idade || "-") + " • " + (animal.especie || "-")}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {animal.raca || "Raça desconhecida"}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {animal.porte ? `Porte: ${animal.porte}` : "Porte desconhecido"}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {animal.sexo ? `Sexo: ${animal.sexo}` : "Sexo desconhecido"}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {animal.status ? `Status: ${animal.status}` : "Status desconhecido"}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>  
          {animal.descricao
            ? animal.descricao.length > 100
              ? animal.descricao.substring(0, 100) + "..."
              : animal.descricao
            : "Sem descrição disponível"}
        </Typography>
      </CardContent>
    </Card>
  );
}
