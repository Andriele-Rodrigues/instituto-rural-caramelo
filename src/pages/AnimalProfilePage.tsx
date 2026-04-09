import { Box, Container, Typography, Button, Card, Grid } from "@mui/material";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Animal } from "../types/animal";

interface AnimalProfilePageProps {
  animal: Animal;
  onBack: () => void;
  onAdoptClick: () => void;
  onSponsorClick: () => void;
}

export function AnimalProfilePage({
  animal,
  onBack,
  onAdoptClick,
  onSponsorClick,
}: AnimalProfilePageProps) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(254, 243, 199, 0.3)",
        minHeight: "calc(100vh - 200px)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Button onClick={onBack} sx={{ mb: 3, color: "text.primary" }}>
          ← Voltar
        </Button>

        <Grid container spacing={5}>
          <Grid sx={{ xs: 12, md: 5 }}>
            <Card
              elevation={8}
              sx={{
                border: "6px solid #D97706",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <ImageWithFallback
                src={
                  Array.isArray(animal.foto)
                    ? animal.foto[0]
                    : animal.foto || "/images/animal-placeholder.png"
                }
                alt={animal.nome || "Animal"}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>

          <Grid sx={{ xs: 12, md: 7 }}>
            <Card
              elevation={4}
              sx={{
                p: 4,
                bgcolor: "white",
                mb: 3,
                borderRadius: 4,
              }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: "text.primary" }}>
                {animal.nome || "Animal"}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 1.5, color: "text.secondary" }}
              >
                <Box component="span" sx={{ color: "#D97706" }}>
                  Espécie:
                </Box>{" "}
                {animal.especie || "-"}{" "}
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 1.5, color: "text.secondary" }}
              >
                <Box component="span" sx={{ color: "#D97706" }}>
                  Idade:
                </Box>{" "}
                {animal.idade || "-"}
              </Typography>
              <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
                <Box component="span" sx={{ color: "#D97706" }}>
                  Raça:
                </Box>{" "}
                {animal.raca || "-"}
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
                <Box component="span" sx={{ color: "#D97706" }}>
                  Sexo:
                </Box>{" "}
                {animal.sexo || "-"}
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
                <Box component="span" sx={{ color: "#D97706" }}>
                  Porte:
                </Box>{" "}
                {animal.porte || "-"}
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
                <Box component="span" sx={{ color: "#D97706" }}>
                  Peso:
                </Box>{" "}
                {animal.peso || "-"}
              </Typography>

              <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
                <Box component="span" sx={{ color: "#D97706" }}>
                  Status:
                </Box>{" "}
                {animal.status || "-"}
              </Typography>

              <Grid container spacing={2}>
                <Grid sx={{ xs: 6 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={onAdoptClick}
                    sx={{
                      background:
                        "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                      py: 2,
                    }}
                  >
                    Quero
                    <br />
                    adotar
                  </Button>
                </Grid>

                <Grid sx={{ xs: 6 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={onSponsorClick}
                    sx={{
                      borderColor: "#D97706",
                      color: "#D97706",
                      borderWidth: 2,
                      py: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Quero
                    <br />
                    Apadrinhar
                  </Button>
                </Grid>
              </Grid>
            </Card>

            <Card
              elevation={4}
              sx={{
                p: 4,
                bgcolor: "white",
                borderRadius: 4,
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: "text.primary" }}>
                Descrição Completa
              </Typography>

              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                {animal.descricao ||
                  "Sem descrição cadastrada para este animal."}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
