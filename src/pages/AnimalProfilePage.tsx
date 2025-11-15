import { Box, Container, Typography, Button, Card, Grid } from '@mui/material';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Animal } from '../data/animals';

interface AnimalProfilePageProps {
  animal: Animal;
  onBack: () => void;
  onAdoptClick: () => void;
  onSponsorClick: () => void;
}

export function AnimalProfilePage({ animal, onBack, onAdoptClick, onSponsorClick }: AnimalProfilePageProps) {
  return (
    <Box sx={{ bgcolor: 'rgba(254, 243, 199, 0.3)', minHeight: 'calc(100vh - 200px)', py: 6 }}>
      <Container maxWidth="lg">
        <Button
          onClick={onBack}
          sx={{ mb: 3, color: 'text.primary' }}
        >
          ← Voltar
        </Button>

        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Card
              elevation={8}
              sx={{
                border: '6px solid #D97706',
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <ImageWithFallback
                src={animal.image}
                alt={animal.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '1/1',
                  objectFit: 'cover'
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card
              elevation={4}
              sx={{
                p: 4,
                bgcolor: 'white',
                mb: 3,
                borderRadius: 4
              }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: 'text.primary' }}>
                {animal.name}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1.5, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Espécie:</Box> {animal.species} |
                <Box component="span" sx={{ color: '#D97706' }}> Gênero:</Box> {animal.gender}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1.5, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Idade:</Box> {animal.age}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Local:</Box> {animal.location}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={onAdoptClick}
                    sx={{
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      py: 2
                    }}
                  >
                    Quero<br />adotar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={onSponsorClick}
                    sx={{
                      borderColor: '#D97706',
                      color: '#D97706',
                      borderWidth: 2,
                      py: 2,
                      '&:hover': {
                        borderWidth: 2
                      }
                    }}
                  >
                    Quero<br />Apadrinhar
                  </Button>
                </Grid>
              </Grid>
            </Card>

            <Card
              elevation={4}
              sx={{
                p: 4,
                bgcolor: 'white',
                borderRadius: 4
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
                Minha História
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                {animal.story}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
