import React from 'react';
import { Box, Container, Typography, Button, Chip, Grid, Card } from '@mui/material';
import {
  Favorite,
  Pets,
  People,
  LocationOn,
  MedicalServices,
  VolunteerActivism,
  HomeRepairService,
} from '@mui/icons-material';
import { AnimalCard } from '../components/animals/AnimalCard';
import { Animal, animalsData } from '../data/animals';

interface HomePageProps {
  onAnimalClick: (animal: Animal) => void;
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

export function HomePage({ onAnimalClick, onDonateClick, onVolunteerClick }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'url("/images/animais.svg"), linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', py: 6 }}>
            <Chip
              icon={<Pets sx={{ fontSize: 14 }} />}
              label="Emergência Enchentes RS"
              sx={{
                bgcolor: '#D97706',
                color: 'white',
                mb: 2,
                height: 28,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: '#ffffffff',
                fontSize: { xs: '2rem', md: '2.25rem' }
              }}
            >
              Dê uma segunda chance
              <Box component="span" sx={{ display: 'block', color: '#ffffffff' }}>
                a um animal rural
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: '#ffffffff'
              }}
            >
              Resgatamos e protegemos animais rurais no RS.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'left' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Favorite />}
                onClick={onDonateClick}
                sx={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  boxShadow: 3,
                  px: 4
                }}
              >
                Doar
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={onVolunteerClick}
                sx={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  boxShadow: 3,
                  px: 4
                }}
              >
                Voluntariar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Statistics */}
      <Container maxWidth="xs" sx={{ py: 3 }}>
        <Grid container spacing={1}>
          {[
            { icon: <Favorite />, number: '487', label: 'Resgatados', color: '#D97706' },
            { icon: <People />, number: '156', label: 'Voluntários', color: '#F59E0B' },
            { icon: <LocationOn />, number: '23', label: 'Municípios', color: '#FBBF24' },
            { icon: <Pets />, number: '100%', label: 'Dedicação', color: '#92400E' },
            { icon: <MedicalServices />, number: '350+', label: 'Atendimentos', color: '#B45309' },
          ].map((stat, index) => (
            <Grid item xs={12} md={12} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1.5
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    sx: { fontSize: 28, color: stat.color }
                  })}
                </Box>
                <Typography variant="h4" sx={{ color: stat.color, mb: 0.5 }}>
                  {stat.number}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Animals Section */}
      <Box sx={{ bgcolor: 'rgba(254, 243, 199, 0.5)', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
            Animais Te Esperando
          </Typography>

          <Grid container spacing={1}>
            {animalsData.map((animal) => (
              <Grid item xs={12} sm={6} md={4} key={animal.id} sx={{ width: '223px' }}>
                <AnimalCard animal={animal} onClick={onAnimalClick} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, color: 'text.primary' }}>
            Nossa Missão
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cuidado aos animais rurais após as enchentes
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {[
            {
              icon: <VolunteerActivism />,
              title: 'Resgate',
              description: 'Equipes 24h em ação.',
              color: '#D97706'
            },
            {
              icon: <MedicalServices />,
              title: 'Cuidado',
              description: 'Veterinários dedicados.',
              color: '#F59E0B'
            },
            {
              icon: <HomeRepairService />,
              title: 'Reconstrução',
              description: 'Apoio aos produtores.',
              color: '#FBBF24'
            },
            {
              icon: <People />,
              title: 'Comunidade',
              description: 'Juntos somos mais fortes.',
              color: '#92400E'
            }
          ].map((mission, index) => (
            <Grid item xs={12} key={index} sx={{ width: '200px' }}>
              <Card
                elevation={2}
                sx={{
                  p: 2,
                  bgcolor: 'rgba(254, 243, 199, 0.3)',
                  border: `2px solid ${mission.color}40`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: mission.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  {React.cloneElement(mission.icon, {
                    sx: { fontSize: 24, color: 'white' }
                  })}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                  {mission.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {mission.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #D97706 0%, #92400E 100%)',
          py: 4,
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 1.5 }}>
            Sua Ajuda Transforma Vidas
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            Cada doação salva um animal.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onDonateClick}
            sx={{
              bgcolor: 'white',
              color: '#D97706',
              px: 5,
              py: 1.5,
              '&:hover': {
                bgcolor: '#FEF3C7'
              }
            }}
          >
            Doar Agora
          </Button>
        </Container>
      </Box>
    </>
  );
}
