import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { theme } from "./theme/theme";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { AnimalSearchPage } from "./pages/AnimalSearchPage";
import { AnimalProfileRoutePage } from "./pages/AnimalProfileRoutePage";
import { DonationModal } from "./components/modals/DonationModal";
import { SponsorshipModal } from "./components/modals/SponsorshipModal";
import { AdoptionModal } from "./components/modals/AdoptionModal";
import { Animal } from "./types/animal";

type HeaderPage = "home" | "search" | "animal";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false);
  const [adoptDialogOpen, setAdoptDialogOpen] = useState(false);

  const currentPage = useMemo<HeaderPage>(() => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/animais/")) return "animal";
    if (location.pathname.startsWith("/animais")) return "search";
    return "home";
  }, [location.pathname]);

  const handleAnimalClick = (animal: Animal) => {
    navigate(`/animais/${animal.id}`);
  };

  const handleNavigate = (page: "home" | "search") => {
    navigate(page === "home" ? "/" : "/animais");
  };

  const handleOpenAdoption = (animal: Animal) => {
    setSelectedAnimal(animal);
    setAdoptDialogOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#FEF3C7",
            color: "#78350F",
            border: "2px solid #D97706",
          },
          success: {
            iconTheme: {
              primary: "#D97706",
              secondary: "#FEF3C7",
            },
          },
        }}
      />

      <Box sx={{ bgcolor: "background.default" }}>
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onDonateClick={() => setDonateDialogOpen(true)}
          onSponsorClick={() => setSponsorDialogOpen(true)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAnimalClick={handleAnimalClick}
                onDonateClick={() => setDonateDialogOpen(true)}
                onVolunteerClick={() => setSponsorDialogOpen(true)}
              />
            }
          />

          <Route
            path="/animais"
            element={<AnimalSearchPage onAnimalClick={handleAnimalClick} />}
          />

          <Route
            path="/animais/:id"
            element={
              <AnimalProfileRoutePage
                onOpenAdoption={handleOpenAdoption}
                onOpenSponsorship={() => setSponsorDialogOpen(true)}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <DonationModal
          open={donateDialogOpen}
          onClose={() => setDonateDialogOpen(false)}
        />

        <SponsorshipModal
          open={sponsorDialogOpen}
          onClose={() => setSponsorDialogOpen(false)}
        />

        {selectedAnimal && (
          <AdoptionModal
            open={adoptDialogOpen}
            onClose={() => setAdoptDialogOpen(false)}
            animal={selectedAnimal}
          />
        )}

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
