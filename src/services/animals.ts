import { apiFetch } from "./api";
import { Animal } from "../types/animal";

interface AnimalApi {
  id: number;
  nome?: string;
  especie?: string;
  genero?: string;
  idade?: string | number;
  peso?: string | number;
  descricao?: string;
  disponivel_adocao?: boolean;
  disponivel_apadrinhamento?: boolean;
  status?: string;
  raca?: string;
  sexo?: string;
  porte?: string;
}

function mapAnimal(item: AnimalApi): Animal {
  return {
    id: item.id,
    nome: item.nome ?? item.nome ?? "",
    especie: item.especie ?? item.especie ?? "",
    raca: item.raca ?? item.raca ?? "",
    sexo: item.sexo ?? item.sexo ?? "",
    porte: item.porte ?? item.porte ?? "",
    idade:
      item.idade != null
        ? Number(item.idade)
        : item.idade != null
          ? Number(item.idade)
          : undefined,
    peso: item.peso != null ? Number(item.peso) : undefined,
    descricao: item.descricao ?? item.descricao ?? "",
    disponivel_adocao:
      item.disponivel_adocao ?? item.disponivel_adocao ?? false,
    disponivel_apadrinhamento:
      item.disponivel_apadrinhamento ?? item.disponivel_apadrinhamento ?? false,
    status: item.status ?? "",
  };
}

export async function getAnimals(filters?: {
  especie?: string;
  porte?: string;
  idade_min?: number;
  idade_max?: number;
  status?: string;
}) {
  const params = new URLSearchParams();

  if (filters?.especie) params.set("especie", filters.especie);
  if (filters?.porte) params.set("porte", filters.porte);
  if (filters?.idade_min != null)
    params.set("idade_min", String(filters.idade_min));
  if (filters?.idade_max != null)
    params.set("idade_max", String(filters.idade_max));
  if (filters?.status) params.set("status", filters.status);

  const query = params.toString();
  const result = await apiFetch<AnimalApi[]>(
    `/animals${query ? `?${query}` : ""}`,
  );

  return result.map(mapAnimal);
}

export async function getAnimalById(id: number | string) {
  const result = await apiFetch<AnimalApi>(`/animals/${id}`);
  return mapAnimal(result);
}
