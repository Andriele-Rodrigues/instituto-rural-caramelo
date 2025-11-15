import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const sponsorshipSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
});

type SponsorshipFormData = z.infer<typeof sponsorshipSchema>;

interface SponsorshipModalProps {
  open: boolean;
  onClose: () => void;
}

export function SponsorshipModal({ open, onClose }: SponsorshipModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SponsorshipFormData>({
    resolver: zodResolver(sponsorshipSchema),
  });

  const onSubmit = (data: SponsorshipFormData) => {
    console.log('Sponsorship data:', data);
    toast.success('Solicitação de apadrinhamento enviada com sucesso!');
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Apadrinhe um Animal</Typography>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="E-mail"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Telefone"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' }}
          >
            Quero Apadrinhar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
