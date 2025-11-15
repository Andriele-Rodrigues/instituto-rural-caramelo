import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface DonationModalProps {
  open: boolean;
  onClose: () => void;
}

export function DonationModal({ open, onClose }: DonationModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Faça sua Doação</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
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
              <Grid item xs={6} key={value}>
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
        <Button onClick={onClose}>
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
}
