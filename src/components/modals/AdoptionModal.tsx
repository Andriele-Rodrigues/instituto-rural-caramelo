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
  Grid,
  IconButton,
  Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Animal } from '../../data/animals';

const adoptionSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  address: z.string().min(10, 'Endereço deve ter pelo menos 10 caracteres'),
  experience: z.string().min(20, 'Por favor, descreva sua experiência com mais detalhes'),
  space: z.string().min(20, 'Por favor, descreva o espaço disponível com mais detalhes'),
});

type AdoptionFormData = z.infer<typeof adoptionSchema>;

interface AdoptionModalProps {
  open: boolean;
  onClose: () => void;
  animal: Animal;
}

export function AdoptionModal({ open, onClose, animal }: AdoptionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionSchema),
  });

  const onSubmit = (data: AdoptionFormData) => {
    console.log('Adoption data:', data);
    toast.success(`Solicitação de adoção para ${animal.name} enviada com sucesso!`);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Adote {animal.name}</Typography>
        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ mt: 3 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            A adoção é um compromisso de amor e cuidado para toda a vida do animal!
          </Alert>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Para adotar <strong>{animal.name}</strong>, precisamos de algumas informações:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome Completo"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Telefone"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço Completo"
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Você tem experiência com animais rurais?"
                multiline
                rows={3}
                {...register('experience')}
                error={!!errors.experience}
                helperText={errors.experience?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descreva o espaço disponível para o animal"
                multiline
                rows={3}
                {...register('space')}
                error={!!errors.space}
                helperText={errors.space?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#FEF3C7', borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Próximos Passos:
            </Typography>
            <Typography variant="body2">
              1. Análise do formulário pela equipe<br />
              2. Visita à sua propriedade<br />
              3. Assinatura do termo de adoção<br />
              4. Entrega do animal com acompanhamento
            </Typography>
          </Box>
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
            Enviar Solicitação
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
