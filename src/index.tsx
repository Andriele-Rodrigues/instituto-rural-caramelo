import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  useMediaQuery,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Favorite,
  Pets,
  People,
  LocationOn,
  Phone,
  Email,
  Menu,
  Search,
  VolunteerActivism,
  MedicalServices,
  HomeRepairService,
  Close,
} from '@mui/icons-material';

import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Grid }  from '@mui/material';

// Tema customizado com paleta rural
const theme = createTheme({
  palette: {
    primary: {
      main: '#D97706',
      light: '#F59E0B',
      dark: '#92400E',
    },
    secondary: {
      main: '#FCD34D',
      light: '#FDE68A',
      dark: '#F59E0B',
    },
    background: {
      default: '#FFFBEB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#78350F',
      secondary: '#92400E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

// Dados dos animais
const animalsData = [
  {
    id: 1,
    name: 'Mimosa',
    species: 'Vaca',
    gender: 'Fêmea',
    age: '4 anos',
    location: 'Caxias do Sul, RS',
    image: 'https://blog.agroline.com.br/wp-content/uploads/2025/01/vacagir-1100x853.jpg',
    story: 'Mimosa foi resgatada durante as fortes chuvas que atingiram Caxias do Sul em maio de 2024. Ela estava isolada em uma área alagada, assustada e sem acesso a alimento. Nossa equipe a encontrou e trouxe para nosso abrigo, onde recebeu todos os cuidados veterinários necessários. Hoje, Mimosa está completamente recuperada, saudável e pronta para encontrar uma nova família. Ela é uma vaca dócil, carinhosa e muito tranquila.'
  },
  {
    id: 2,
    name: 'Trovão',
    species: 'Cavalo',
    gender: 'Macho',
    age: '7 anos',
    location: 'Porto Alegre, RS',
    image: 'https://jpimg.com.br/uploads/2025/10/7-curiosidades-interessantes-sobre-os-cavalos-1024x683.jpg',
    story: 'Trovão é um cavalo forte e trabalhador que foi resgatado de uma propriedade rural completamente alagada. Apesar do trauma, ele mantém seu espírito resiliente e está se recuperando muito bem. É um animal leal e pode ser um excelente companheiro para trabalho rural ou cavalgadas. Trovão precisa de um lar com espaço amplo onde possa correr e se exercitar.'
  },
  {
    id: 3,
    name: 'Roni',
    species: 'Potro',
    gender: 'Macho',
    age: '6 meses',
    location: 'Pelotas, RS',
    image: 'https://cavalus.com.br/wp-content/uploads/2022/07/Potros-precisam-de-cuidados-especiais-logo-apos-o-nascimento.jpg',
    story: 'Roberto é um potro jovem e cheio de energia que foi encontrado sozinho após as águas baixarem. Desde então está sob nossos cuidados, crescendo saudável e forte. Roberto é muito curioso e brincalhão, adorando explorar novos ambientes. Precisa de uma família experiente com cavalos que possa continuar seu treinamento e desenvolvimento.'
  },
   {
    id: 4,
    name: 'Luna',
    species: 'Ovelha',
    gender: 'Fêmea',
    age: '3 meses',
    location: 'Canoas, RS',
    image: 'https://images.unsplash.com/photo-1535979863199-3c77338429a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29yZGVpcm8lMjBiZWIlQzMlQUJ8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    story: 'Luna é uma ovelha/filhote que foi encontrada perdida após as águas baixarem. Desde então está sob nossos cuidados, crescendo saudável e forte. Luna é muito meiga e carinhosa, adorando cafunes. Precisa de uma família carinhosa.'
  },
  {
    id: 5,
    name: 'catarina',
    species: 'galinha',
    age: '1 ano',
    location: 'granja vianna, RS',
    image: 'https://www.revistarural.com.br/sitenovo/wp-content/uploads/2019/05/galinha29052019.jpg',
    story: 'catarina é uma galinha que foi resgatada de uma granja alagada. Ela é muito ativa e adora ciscar pelo quintal. Catarina está pronta para encontrar um novo lar onde possa viver feliz e segura.'
  }
];

// Lista de espécies disponíveis para autocomplete
const availableSpecies = Array.from(new Set(animalsData.map(animal => animal.species)));

export default function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'animal'>('home');
  const [selectedAnimal, setSelectedAnimal] = useState(animalsData[0]);
  
  // Estados para filtros de pesquisa
  const [searchSpecies, setSearchSpecies] = useState<string | null>(null);
  const [searchGenderMale, setSearchGenderMale] = useState(false);
  const [searchGenderFemale, setSearchGenderFemale] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState(animalsData);
  
  // Estados para modais
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);

  const handleAnimalClick = (animal: typeof animalsData[0]) => {
    setSelectedAnimal(animal);
    setCurrentPage('animal');
  };

  const handleSearch = () => {
    let filtered = animalsData;
    
    // Filtrar por espécie
    if (searchSpecies) {
      filtered = filtered.filter(animal => animal.species === searchSpecies);
    }
    
    // Filtrar por gênero
    if (searchGenderMale || searchGenderFemale) {
      filtered = filtered.filter(animal => {
        if (searchGenderMale && searchGenderFemale) return true;
        if (searchGenderMale) return animal.gender === 'Macho';
        if (searchGenderFemale) return animal.gender === 'Fêmea';
        return true;
      });
    }
    
    // Filtrar por localização
    if (searchLocation) {
      filtered = filtered.filter(animal => 
        animal.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    
    // Filtrar por idade
    if (searchAge) {
      if (searchAge === 'young') {
        filtered = filtered.filter(animal => {
          const ageNum = parseInt(animal.age);
          return ageNum <= 1;
        });
      } else if (searchAge === 'adult') {
        filtered = filtered.filter(animal => {
          const ageNum = parseInt(animal.age);
          return ageNum > 1 && ageNum <= 5;
        });
      } else if (searchAge === 'senior') {
        filtered = filtered.filter(animal => {
          const ageNum = parseInt(animal.age);
          return ageNum > 5;
        });
      }
    }
    
    setFilteredAnimals(filtered);
  };

  // PÁGINA INICIAL
  const HomePage = () => (
    <>
     
<Box 
  sx={{ 
    background: 'url("/images/animais.svg"), linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    py: 3,
  }}
>
        <Container maxWidth="lg" >
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
                onClick={() => setDonateDialogOpen(true)}
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
                onClick={() => setSponsorDialogOpen(true)}
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
            <Grid sx={{xs:12 , md:12}}key={index}>
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
            <Grid sx={{xs:12 ,sm:6 ,md:4, width:'223px'}} key={animal.id}>
              <Card 
                elevation={4}
                sx={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 8
                  },
                  borderRadius: 3
                }}
                onClick={() => handleAnimalClick(animal)}
              >
                <CardMedia>
                  <ImageWithFallback
                    src={animal.image}
                    alt={animal.name}
                    style={{ 
                      width: '100%', 
                      height: '220px',
                      objectFit: 'cover'
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
                    {animal.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#D97706', fontWeight: 600 }}>
                    {animal.age} • {animal.species}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {animal.location}
                  </Typography>
                </CardContent>
              </Card>
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
            <Grid sx={{xs:12, width:'200px'}} key={index}>
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
            onClick={() => setDonateDialogOpen(true)}
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

  const SearchPage = () => (
    <Box sx={{ bgcolor: 'rgba(254, 243, 199, 0.3)', minHeight: 'calc(100vh - 200px)', py: 6 }}>
      <Container maxWidth="lg">
        <Card 
          elevation={6}
          sx={{ 
            p: 5, 
            mb: 5,
            borderRadius: 4
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
            Encontre seu novo amigo
          </Typography>
          <Grid container spacing={3}>
            <Grid sx={{xs:12, md:6}}>
              <Autocomplete
                value={searchSpecies}
                onChange={(event, newValue) => setSearchSpecies(newValue)}
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
            
            <Grid sx={{xs:12, md:6}}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', height: '100%' }}>
                <Typography sx={{ color: 'text.primary' }}>Gênero:</Typography>
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

            <Grid sx={{xs:12, md:6}}>
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
            
            <Grid sx={{xs:12, md:12}}>
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

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="contained"
              size="large"
              onClick={handleSearch}
              sx={{ 
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                px: 8,
                py: 2
              }}
            >
              Pesquisar
            </Button>
          </Box>
        </Card>

        <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
          {filteredAnimals.length === animalsData.length 
            ? 'Animais em destaque' 
            : `${filteredAnimals.length} animal(is) encontrado(s)`}
        </Typography>
        
        {filteredAnimals.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            Nenhum animal encontrado com esses critérios. Tente ajustar os filtros.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredAnimals.map((animal) => (
              <Grid sx={{xs:12, sm:6, md:4}} key={animal.id}>
                <Card 
                  elevation={4}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 8
                    },
                    borderRadius: 3
                  }}
                  onClick={() => handleAnimalClick(animal)}
                >
                  <CardMedia>
                    <ImageWithFallback
                      src={animal.image}
                      alt={animal.name}
                      style={{ 
                        width: '100%', 
                        height: '220px',
                        objectFit: 'cover'
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
                      {animal.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#D97706', fontWeight: 600 }}>
                      {animal.age} • {animal.species}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {animal.location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );

  const AnimalPage = () => (
    <Box sx={{ bgcolor: 'rgba(254, 243, 199, 0.3)', minHeight: 'calc(100vh - 200px)', py: 6 }}>
      <Container maxWidth="lg">
        <Button 
          onClick={() => setCurrentPage('home')}
          sx={{ mb: 3, color: 'text.primary' }}
        >
          ← Voltar
        </Button>
        
        <Grid container spacing={5}>
          <Grid sx={{xs:12, md:5}}>
            <Card 
              elevation={8}
              sx={{ 
                border: '6px solid #D97706',
                borderRadius: 3,
                overflow: 'hidden'
              }}
            >
              <ImageWithFallback
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
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
          
          <Grid sx={{xs:12, md:7}}>
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
                {selectedAnimal.name}
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 1.5, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Espécie:</Box> {selectedAnimal.species} | 
                <Box component="span" sx={{ color: '#D97706' }}> Gênero:</Box> {selectedAnimal.gender}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1.5, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Idade:</Box> {selectedAnimal.age}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                <Box component="span" sx={{ color: '#D97706' }}>Local:</Box> {selectedAnimal.location}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid sx={{xs:6}}>
                  <Button 
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => setAdoptDialogOpen(true)}
                    sx={{ 
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      py: 2
                    }}
                  >
                    Quero<br/>adotar
                  </Button>
                </Grid>
                <Grid sx={{xs:6}}>
                  <Button 
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={() => setSponsorDialogOpen(true)}
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
                    Quero<br/>Apadrinhar
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
                {selectedAnimal.story}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  // MODAL DE DOAÇÃO
  const DonateDialog = () => (
    <Dialog 
      open={donateDialogOpen} 
      onClose={() => setDonateDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Faça sua Doação</Typography>
        <IconButton onClick={() => setDonateDialogOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Sua doação nos ajuda a continuar resgatando e cuidando de animais em situação de vulnerabilidade.
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Escolha o valor da doação:
          </Typography>
          <Grid container spacing={2}>
            {['R$ 30', 'R$ 50', 'R$ 100', 'R$ 200'].map((value) => (
              <Grid sx={{xs:6}} key={value}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    py: 2,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white'
                    }
                  }}
                >
                  {value}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
          Ou faça uma transferência PIX:
        </Typography>
        <Box sx={{ bgcolor: '#FEF3C7', p: 2, borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Chave PIX: doar@ruralcaramelo.org.br
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setDonateDialogOpen(false)}>
          Fechar
        </Button>
        <Button 
          variant="contained" 
          sx={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
        >
          Confirmar Doação
        </Button>
      </DialogActions>
    </Dialog>
  );

  // MODAL DE APADRINHAMENTO
  const SponsorDialog = () => (
    <Dialog 
      open={sponsorDialogOpen} 
      onClose={() => setSponsorDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Apadrinhe um Animal</Typography>
        <IconButton onClick={() => setSponsorDialogOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Ao apadrinhar, você contribui mensalmente para os cuidados de um animal específico e recebe atualizações sobre ele!
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Benefícios do Apadrinhamento:
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Atualizações mensais sobre o animal
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Certificado de padrinho/madrinha
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Visitas programadas ao abrigo
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Acesso ao grupo exclusivo de padrinhos
            </Typography>
          </Box>
        </Box>
        
        <TextField
          fullWidth
          label="Nome Completo"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="E-mail"
          type="email"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Telefone"
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setSponsorDialogOpen(false)}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          sx={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
        >
          Quero Apadrinhar
        </Button>
      </DialogActions>
    </Dialog>
  );

  // MODAL DE ADOÇÃO
  const AdoptDialog = () => (
    <Dialog 
      open={adoptDialogOpen} 
      onClose={() => setAdoptDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Adote {selectedAnimal.name}</Typography>
        <IconButton onClick={() => setAdoptDialogOpen(false)} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          A adoção é um compromisso de amor e cuidado para toda a vida do animal!
        </Alert>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Para adotar <strong>{selectedAnimal.name}</strong>, precisamos de algumas informações:
        </Typography>
        
        <Grid container spacing={2}>
          <Grid sx={{xs:12}}>
            <TextField
              fullWidth
              label="Nome Completo"
            />
          </Grid>
          <Grid sx={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="E-mail"
              type="email"
            />
          </Grid>
          <Grid sx={{xs:12, sm:6}}>
            <TextField
              fullWidth
              label="Telefone"
            />
          </Grid>
          <Grid sx={{xs:12}}>
            <TextField
              fullWidth
              label="Endereço Completo"
            />
          </Grid>
          <Grid sx={{xs:12}}>
            <TextField
              fullWidth
              label="Você tem experiência com animais rurais?"
              multiline
              rows={3}
            />
          </Grid>
          <Grid sx={{xs:12}}>
            <TextField
              fullWidth
              label="Descreva o espaço disponível para o animal"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: '#FEF3C7', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Próximos Passos:
          </Typography>
          <Typography variant="body2">
            1. Análise do formulário pela equipe<br/>
            2. Visita à sua propriedade<br/>
            3. Assinatura do termo de adoção<br/>
            4. Entrega do animal com acompanhamento
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => setAdoptDialogOpen(false)}>
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          sx={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
        >
          Enviar Solicitação
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default' }}>
        <AppBar 
          position="sticky" 
          elevation={1}
          sx={{ 
            bgcolor: 'background.paper',
            borderBottom: '2px solid #D97706'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 0.5, minHeight: 56 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                <img src="/images/logo.svg" alt="Logo Animais Rurais" style={{ width: '85px', height: '85px' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1.2 }}>
                    Instituto Rural Caramelo
                  </Typography>
                </Box>
              </Box>
              
              {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button 
                    color="primary"
                    onClick={() => setCurrentPage('home')}
                    sx={{ fontWeight: currentPage === 'home' ? 700 : 500 }}
                  >
                    Início
                  </Button>
                  <Button 
                    color="primary"
                    onClick={() => setCurrentPage('search')}
                    sx={{ fontWeight: currentPage === 'search' ? 700 : 500 }}
                  >
                    Adoção
                  </Button>
                  <Button 
                    color="primary"
                    onClick={() => setSponsorDialogOpen(true)}
                  >
                    Apadrinhar
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    size="small"
                    onClick={() => setDonateDialogOpen(true)}
                    sx={{ px: 3 }}
                  >
                    Doar
                  </Button>
                </Box>
              ) : (
                <IconButton color="primary">
                  <Menu />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {currentPage === 'home' && <HomePage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'animal' && <AnimalPage />}

        {/* Modals */}
        <DonateDialog />
        <SponsorDialog />
        <AdoptDialog />

        {/* Footer */}
        <Box sx={{ bgcolor: '#78350F', color: 'white', py: 3 }}>
          <Container maxWidth="lg">
            <Grid container spacing={10}>
              <Grid sx={{xs:12, md:4}} >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box 
                    sx={{ 
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#D97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Favorite sx={{ fontSize: 18, color: 'white' }} />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Instituto Rural Caramelo
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#FCD34D' }}>
                  Salvando animais do RS.
                </Typography>
              </Grid>
              
              <Grid sx={{xs:12, md:4}}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: '#FCD34D' }}>
                  Contato
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Phone sx={{ fontSize: 14 }} />
                    <Typography variant="caption">(51) 99999-9999</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Email sx={{ fontSize: 14 }} />
                    <Typography variant="caption">contato@ruralcaramelo.org.br</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn sx={{ fontSize: 14 }} />
                    <Typography variant="caption">Farroupilha, RS</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid sx={{xs:12, md:4}}>
                <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block', color: '#FCD34D' }}>
                  Redes
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['f', 'in', 'ig'].map((social) => (
                    <Box 
                      key={social}
                      sx={{ 
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: 'rgba(252, 211, 77, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: '#D97706'
                        }
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {social}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ borderTop: '1px solid rgba(252, 211, 77, 0.3)', mt: 2, pt: 2, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#FCD34D' }}>
                © 2025 Instituto Rural Caramelo
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}