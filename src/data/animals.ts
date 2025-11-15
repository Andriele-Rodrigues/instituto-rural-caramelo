export interface Animal {
  id: number;
  name: string;
  species: string;
  gender: string;
  age: string;
  location: string;
  image: string;
  story: string;
}

export const animalsData: Animal[] = [
  {
    id: 1,
    name: 'Mimosa',
    species: 'Vaca',
    gender: 'Fêmea',
    age: '4 anos',
    location: 'Caxias do Sul, RS',
    image: 'https://blog.agroline.com.br/wp-content/uploads/2025/01/vacagir-1100x853.jpg',
    story: 'Mimosa foi resgatada durante as fortes chuvas que atingiram Caxias do Sul em maio de 2024. Ela estava isolada em uma área alagada, assustada e sem acesso a alimento. Nossa equipe a encontrou e trouxe para nosso abrigo, onde recebeu todos os cuidados veterinários necessários. Hoje, Mimosa está completamente recuperada, saudável e pronta para encontrar uma nova família. Ela é uma vaca dócil, carinhosa e muito tranquila.'
  },
  {
    id: 2,
    name: 'Trovão',
    species: 'Cavalo',
    gender: 'Macho',
    age: '7 anos',
    location: 'Porto Alegre, RS',
    image: 'https://jpimg.com.br/uploads/2025/10/7-curiosidades-interessantes-sobre-os-cavalos-1024x683.jpg',
    story: 'Trovão é um cavalo forte e trabalhador que foi resgatado de uma propriedade rural completamente alagada. Apesar do trauma, ele mantém seu espírito resiliente e está se recuperando muito bem. É um animal leal e pode ser um excelente companheiro para trabalho rural ou cavalgadas. Trovão precisa de um lar com espaço amplo onde possa correr e se exercitar.'
  },
  {
    id: 3,
    name: 'Roni',
    species: 'Potro',
    gender: 'Macho',
    age: '6 meses',
    location: 'Pelotas, RS',
    image: 'https://cavalus.com.br/wp-content/uploads/2022/07/Potros-precisam-de-cuidados-especiais-logo-apos-o-nascimento.jpg',
    story: 'Roberto é um potro jovem e cheio de energia que foi encontrado sozinho após as águas baixarem. Desde então está sob nossos cuidados, crescendo saudável e forte. Roberto é muito curioso e brincalhão, adorando explorar novos ambientes. Precisa de uma família experiente com cavalos que possa continuar seu treinamento e desenvolvimento.'
  },
  {
    id: 4,
    name: 'Luna',
    species: 'Ovelha',
    gender: 'Fêmea',
    age: '3 meses',
    location: 'Canoas, RS',
    image: 'https://images.unsplash.com/photo-1535979863199-3c77338429a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29yZGVpcm8lMjBiZWIlQzMlQUJ8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
    story: 'Luna é uma ovelha/filhote que foi encontrada perdida após as águas baixarem. Desde então está sob nossos cuidados, crescendo saudável e forte. Luna é muito meiga e carinhosa, adorando cafunes. Precisa de uma família carinhosa.'
  },
  {
    id: 5,
    name: 'catarina',
    species: 'galinha',
    gender: 'Fêmea',
    age: '1 ano',
    location: 'granja vianna, RS',
    image: 'https://www.revistarural.com.br/sitenovo/wp-content/uploads/2019/05/galinha29052019.jpg',
    story: 'catarina é uma galinha que foi resgatada de uma granja alagada. Ela é muito ativa e adora ciscar pelo quintal. Catarina está pronta para encontrar um novo lar onde possa viver feliz e segura.'
  }
];

export const availableSpecies = Array.from(new Set(animalsData.map(animal => animal.species)));
