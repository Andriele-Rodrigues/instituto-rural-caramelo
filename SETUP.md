# 🚀 Setup do Projeto - Instituto Rural Caramelo

## 📦 Instalação das Dependências

Após clonar o projeto, siga estes passos:

### 1. Instalar as dependências do NPM

```bash
npm install
```

Isso irá instalar todas as dependências necessárias, incluindo:
- ✅ `react-hook-form` - Gerenciamento de formulários
- ✅ `react-hot-toast` - Sistema de notificações
- ✅ `zod` - Validação de schemas
- ✅ `@hookform/resolvers` - Integração Zod + React Hook Form
- ✅ Material-UI e todas as outras dependências

### 2. Limpar o cache do Vite (se necessário)

Se você encontrar erros de módulos não encontrados após o pull:

```bash
rm -rf node_modules/.vite
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:5173/`

---

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Verifica código com ESLint
```

---

## ⚠️ Solução de Problemas Comuns

### Erro: "Failed to resolve import react-hook-form"

**Solução:**
```bash
# 1. Deletar node_modules e package-lock.json
rm -rf node_modules package-lock.json

# 2. Reinstalar tudo
npm install

# 3. Limpar cache do Vite
rm -rf node_modules/.vite

# 4. Reiniciar o servidor
npm run dev
```

### Erro: "Cannot find module"

**Solução:**
```bash
# Reinstalar dependências
npm ci
```

### Dev server não atualiza automaticamente

**Solução:**
```bash
# Parar o servidor (Ctrl+C)
# Limpar cache
rm -rf node_modules/.vite
# Reiniciar
npm run dev
```

---

## 🌟 Estrutura do Projeto Após Setup

```
src/
├── App.tsx                    # Componente principal
├── main.jsx                   # Entry point
├── data/
│   └── animals.ts            # Dados + interface TypeScript
├── theme/
│   └── theme.ts              # Tema Material-UI
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Cabeçalho com menu mobile
│   │   └── Footer.tsx        # Rodapé
│   ├── animals/
│   │   └── AnimalCard.tsx    # Card reutilizável
│   └── modals/
│       ├── DonationModal.tsx
│       ├── SponsorshipModal.tsx
│       └── AdoptionModal.tsx
└── pages/
    ├── HomePage.tsx
    ├── AnimalSearchPage.tsx
    └── AnimalProfilePage.tsx
```

---

## ✅ Checklist Pós-Instalação

- [ ] `npm install` executado sem erros
- [ ] `npm run dev` inicia o servidor corretamente
- [ ] Navegação funciona (Home, Adoção)
- [ ] Menu mobile abre e fecha
- [ ] Modais abrem (Doar, Apadrinhar, Adotar)
- [ ] Formulários validam corretamente
- [ ] Toast notifications aparecem ao enviar formulários

---

## 🎯 Próximos Passos de Desenvolvimento

Consulte o arquivo `IMPROVEMENTS.md` para ver:
- ✅ Melhorias já implementadas
- 🚧 Próximos passos recomendados (Backend, Autenticação, PWA)
- 📊 Métricas de melhoria do código

---

## 📞 Suporte

Se encontrar problemas, verifique:
1. Node.js versão >= 18
2. NPM versão >= 9
3. Todos os comandos executados na raiz do projeto

**Versões recomendadas:**
```bash
node -v  # v18.x ou superior
npm -v   # v9.x ou superior
```
