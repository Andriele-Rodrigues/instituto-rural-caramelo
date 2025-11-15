import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { theme } from '../../theme/theme';

interface HeaderProps {
  currentPage: 'home' | 'search' | 'animal';
  onNavigate: (page: 'home' | 'search') => void;
  onDonateClick: () => void;
  onSponsorClick: () => void;
}

export function Header({ currentPage, onNavigate, onDonateClick, onSponsorClick }: HeaderProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileNavigate = (page: 'home' | 'search') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleMobileDonate = () => {
    onDonateClick();
    setMobileMenuOpen(false);
  };

  const handleMobileSponsor = () => {
    onSponsorClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
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
                  onClick={() => onNavigate('home')}
                  sx={{ fontWeight: currentPage === 'home' ? 700 : 500 }}
                >
                  Início
                </Button>
                <Button
                  color="primary"
                  onClick={() => onNavigate('search')}
                  sx={{ fontWeight: currentPage === 'search' ? 700 : 500 }}
                >
                  Adoção
                </Button>
                <Button
                  color="primary"
                  onClick={onSponsorClick}
                >
                  Apadrinhar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onDonateClick}
                  sx={{ px: 3 }}
                >
                  Doar
                </Button>
              </Box>
            ) : (
              <IconButton color="primary" onClick={handleMobileMenuToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: 'background.default',
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={handleMobileMenuToggle} sx={{ color: 'primary.main' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavigate('home')}
              selected={currentPage === 'home'}
            >
              <ListItemText
                primary="Início"
                primaryTypographyProps={{
                  fontWeight: currentPage === 'home' ? 700 : 400,
                  color: 'primary.main'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleMobileNavigate('search')}
              selected={currentPage === 'search'}
            >
              <ListItemText
                primary="Adoção"
                primaryTypographyProps={{
                  fontWeight: currentPage === 'search' ? 700 : 400,
                  color: 'primary.main'
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleMobileSponsor}>
              <ListItemText
                primary="Apadrinhar"
                primaryTypographyProps={{ color: 'primary.main' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleMobileDonate}>
              <ListItemText
                primary="Doar"
                primaryTypographyProps={{ color: 'primary.main', fontWeight: 700 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
