export interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  sexo?: string;
  porte?: string;
  idade?: number;
  peso?: number;
  descricao?: string;
  disponivel_adocao?: boolean;
  disponivel_apadrinhamento?: boolean;
  status?: string;
  foto?: string[];
}
