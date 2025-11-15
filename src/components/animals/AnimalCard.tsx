import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Animal } from '../../data/animals';

interface AnimalCardProps {
  animal: Animal;
  onClick: (animal: Animal) => void;
}

export function AnimalCard({ animal, onClick }: AnimalCardProps) {
  return (
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
      onClick={() => onClick(animal)}
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
  );
}
