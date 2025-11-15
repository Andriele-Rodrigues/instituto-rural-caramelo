import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { theme } from './theme/theme';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AnimalSearchPage } from './pages/AnimalSearchPage';
import { AnimalProfilePage } from './pages/AnimalProfilePage';
import { DonationModal } from './components/modals/DonationModal';
import { SponsorshipModal } from './components/modals/SponsorshipModal';
import { AdoptionModal } from './components/modals/AdoptionModal';
import { Animal, animalsData } from './data/animals';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'animal'>('home');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(animalsData[0]);

  // Estados para modais
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);

  const handleAnimalClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setCurrentPage('animal');
  };

  const handleNavigate = (page: 'home' | 'search') => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FEF3C7',
            color: '#78350F',
            border: '2px solid #D97706',
          },
          success: {
            iconTheme: {
              primary: '#D97706',
              secondary: '#FEF3C7',
            },
          },
        }}
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onDonateClick={() => setDonateDialogOpen(true)}
          onSponsorClick={() => setSponsorDialogOpen(true)}
        />

        {currentPage === 'home' && (
          <HomePage
            onAnimalClick={handleAnimalClick}
            onDonateClick={() => setDonateDialogOpen(true)}
            onVolunteerClick={() => setSponsorDialogOpen(true)}
          />
        )}
        {currentPage === 'search' && (
          <AnimalSearchPage onAnimalClick={handleAnimalClick} />
        )}
        {currentPage === 'animal' && (
          <AnimalProfilePage
            animal={selectedAnimal}
            onBack={() => setCurrentPage('home')}
            onAdoptClick={() => setAdoptDialogOpen(true)}
            onSponsorClick={() => setSponsorDialogOpen(true)}
          />
        )}

        {/* Modals */}
        <DonationModal
          open={donateDialogOpen}
          onClose={() => setDonateDialogOpen(false)}
        />
        <SponsorshipModal
          open={sponsorDialogOpen}
          onClose={() => setSponsorDialogOpen(false)}
        />
        <AdoptionModal
          open={adoptDialogOpen}
          onClose={() => setAdoptDialogOpen(false)}
          animal={selectedAnimal}
        />

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
