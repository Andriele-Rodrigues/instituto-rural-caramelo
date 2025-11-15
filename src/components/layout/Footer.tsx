import { Box, Container, Grid, Typography } from '@mui/material';
import { Favorite, Phone, Email, LocationOn } from '@mui/icons-material';

export function Footer() {
  return (
    <Box sx={{ bgcolor: '#78350F', color: 'white', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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
  );
}
