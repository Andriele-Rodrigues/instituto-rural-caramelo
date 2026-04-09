import { apiFetch } from './api';

interface CreateAdoptionPayload {
  animal_id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  experiencia: string;
  espaco_disponivel: string;
}

export async function createAdoption(payload: CreateAdoptionPayload) {
  return apiFetch('/adoptions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}