# Instituto Rural Caramelo - Website

Site para ONG de resgate e adoção de animais rurais afetados pelas enchentes do Rio Grande do Sul.

## 🚀 Início Rápido

### Opção 1: Setup Automático (Recomendado)

```bash
bash setup.sh
cd instituto-rural-caramelo
code .
npm run dev
```

### Opção 2: Setup Manual

```bash
# 1. Criar projeto
npm create vite@latest instituto-rural-caramelo -- --template react
cd instituto-rural-caramelo

# 2. Instalar dependências
npm install

# 3. Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Instalar ícones
npm install lucide-react

# 5. Abrir no VSCode
code .

# 6. Rodar projeto
npm run dev
```

## 📋 O que fazer após setup

1. **Configure o Tailwind**
   - Copie o conteúdo do `tailwind.config.js` fornecido
   - Atualize `src/index.css` com as diretivas @tailwind

2. **Cole o código do mockup**
   - Abra `src/App.jsx`
   - Cole o código de `instituto-rural-caramelo-refinado.jsx`

3. **Personalize o logo**
   - Edite a função `Logo()` em `App.jsx`
   - Adicione suas silhuetas de animais personalizadas

4. **Adicione imagens reais**
   - Substitua os placeholders SVG por fotos reais
   - Coloque as imagens em `public/images/`

## 🎨 Tecnologias

- **React** - Framework JavaScript
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

## 📱 Páginas

- **Home** - Página inicial com hero e animais
- **Busca** - Busca e filtros de animais
- **Perfil** - Perfil detalhado de cada animal

## 🌈 Paleta de Cores

- **Âmbar 900** (#78350F) - Marrom escuro
- **Âmbar 700** (#B45309) - Marrom médio
- **Âmbar 600** (#D97706) - Caramelo
- **Amarelo/Laranja** - Acentos

## 📝 Estrutura

```
src/
├── App.jsx          # Componente principal com todas as páginas
├── index.css        # Estilos Tailwind
└── main.jsx         # Entry point
```

## 🔧 Comandos

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

## 📸 Próximos Passos

- [ ] Personalizar logo com silhuetas reais
- [ ] Adicionar fotos dos animais
- [ ] Implementar backend/API
- [ ] Conectar com banco de dados
- [ ] Sistema de doação
- [ ] Deploy (Vercel/Netlify)

## 💚 Instituto Rural Caramelo

Salvando vidas pata a pata! 🐴🐔🐷🐄

---

**Desenvolvido com ❤️ para ajudar animais rurais do RS**