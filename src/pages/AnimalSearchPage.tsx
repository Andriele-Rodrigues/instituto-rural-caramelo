import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Grid,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Search, LocationOn } from "@mui/icons-material";
import { AnimalCard } from "../components/animals/AnimalCard";
import { Animal } from "../types/animal";
import { getAnimals } from "../services/animals";

interface AnimalSearchPageProps {
  onAnimalClick: (animal: Animal) => void;
}

export function AnimalSearchPage({ onAnimalClick }: AnimalSearchPageProps) {
  const [searchSpecies, setSearchSpecies] = useState<string | null>(null);
  const [searchGenderMale, setSearchGenderMale] = useState(false);
  const [searchGenderFemale, setSearchGenderFemale] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchAge, setSearchAge] = useState("");

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const availableSpecies = useMemo(
    () =>
      Array.from(
        new Set(animals.map((animal) => animal.especie).filter(Boolean)),
      ),
    [animals],
  );

  useEffect(() => {
    async function loadAnimals() {
      try {
        setLoading(true);
        setError("");

        const data = await getAnimals({ status: "available" });
        setAnimals(data);
        setFilteredAnimals(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os animais.");
      } finally {
        setLoading(false);
      }
    }

    loadAnimals();
  }, []);

  const handleSearch = () => {
    let filtered = [...animals];

    if (searchSpecies) {
      filtered = filtered.filter((animal) => animal.especie === searchSpecies);
    }

    if (searchGenderMale || searchGenderFemale) {
      filtered = filtered.filter((animal) => {
        if (searchGenderMale && searchGenderFemale) return true;
        if (searchGenderMale) return animal.sexo === "Macho";
        if (searchGenderFemale) return animal.sexo === "Fêmea";
        return true;
      });
    }

    if (searchAge) {
      filtered = filtered.filter((animal) => {
        const ageNum = parseInt((animal.idade || "").toString(), 10);

        if (Number.isNaN(ageNum)) return true;
        if (searchAge === "young") return ageNum <= 1;
        if (searchAge === "adult") return ageNum > 1 && ageNum <= 5;
        if (searchAge === "senior") return ageNum > 5;
        return true;
      });
    }

    setFilteredAnimals(filtered);
  };

  return (
    <Box
      sx={{
        bgcolor: "rgba(254, 243, 199, 0.3)",
        minHeight: "calc(100vh - 200px)",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={6}
          sx={{
            p: 5,
            mb: 5,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, textAlign: "center", color: "text.primary" }}
          >
            Encontre seu novo amigo
          </Typography>

          <Grid container spacing={3}>
            <Grid  sx={{ xs: 12, md: 6 }}>
              <Autocomplete
                value={searchSpecies}
                onChange={(_, newValue) => setSearchSpecies(newValue)}
                options={availableSpecies}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Espécie"
                    placeholder="Ex: Cavalo, Vaca, Porco..."
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <Search color="primary" />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid  sx={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography sx={{ color: "text.primary" }}>Gênero:</Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={searchGenderMale}
                      onChange={(e) => setSearchGenderMale(e.target.checked)}
                    />
                  }
                  label="Macho"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={searchGenderFemale}
                      onChange={(e) => setSearchGenderFemale(e.target.checked)}
                    />
                  }
                  label="Fêmea"
                />
              </Box>
            </Grid>

            <Grid  sx={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Local"
                placeholder="Cidade, RS"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid  sx={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Idade</InputLabel>
                <Select
                  label="Idade"
                  value={searchAge}
                  onChange={(e) => setSearchAge(e.target.value)}
                >
                  <MenuItem value="">Todas as idades</MenuItem>
                  <MenuItem value="young">Filhote (0-1 ano)</MenuItem>
                  <MenuItem value="adult">Jovem (1-5 anos)</MenuItem>
                  <MenuItem value="senior">Adulto (5+ anos)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              sx={{
                background: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",
                px: 8,
                py: 2,
              }}
            >
              Pesquisar
            </Button>
          </Box>
        </Card>

        {loading ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
              {filteredAnimals.length === animals.length
                ? "Animais em destaque"
                : `${filteredAnimals.length} animal(is) encontrado(s)`}
            </Typography>

            {filteredAnimals.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                Nenhum animal encontrado com esses critérios. Tente ajustar os
                filtros.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {filteredAnimals.map((animal) => (
                  <Grid  sx={{ xs: 12, sm: 6, md: 4 }} key={animal.id}>
                    <AnimalCard animal={animal} onClick={onAnimalClick} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
