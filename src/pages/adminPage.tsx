import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Snackbar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { apiFetch } from "../services/api";
import { Animal } from "../types/animal";

interface Adoption {
  id: number;
  usuario_id: number;
  animal_id: number;
  data_pedido: string;
  status: string;
  observacoes?: string;
}

interface Sponsorship {
  id: number;
  usuario_id: number;
  animal_id: number;
  valor_mensal: number;
  data_inicio: string;
  status: string;
  observacoes?: string;
}

interface Payment {
  id: number;
  apadrinhamento_id: number;
  valor: number;
  tipo: string;
  status: string;
  data_pagamento?: string;
}

interface User {
  id: number;
  nome: string;
}

// ── Helpers para autenticação
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token") ?? "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function adminFetch(path: string, options: RequestInit = {}): Promise<any> {
  return apiFetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });
}

// ── Status color mapping
const STATUS_COLOR: Record<string, "warning" | "success" | "error" | "default"> = {
  pendente: "warning",
  aprovado: "success",
  aprovada: "success",
  recusado: "error",
  recusada: "error",
  ativo: "success",
  cancelado: "error",
  confirmado: "success",
};

// ── Admin Page
export function AdminPage({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState("dashboard");

  const [animals, setAnimals] = useState<Animal[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; severity: "success" | "error" }>({ open: false, msg: "", severity: "success" });

  // ── Modal criar/editar animal
  const EMPTY_FORM = { nome: "", especie: "bovino", raca: "", sexo: "macho", porte: "medio", idade: "", peso: "", descricao: "" };
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [animalDialog, setAnimalDialog] = useState(false);

  // ── Modal delete
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });

  // ── Fetch all data
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [animalsData, usersData, adoptionsData, sponsorshipsData, paymentsData] = await Promise.all([
        adminFetch("/animals"),
        adminFetch("/users"),
        adminFetch("/adoptions"),
        adminFetch("/sponsorships"),
        adminFetch("/payments"),
      ]);
      setAnimals(animalsData ?? []);
      setUsers(usersData ?? []);
      setAdoptions(adoptionsData ?? []);
      setSponsorships(sponsorshipsData ?? []);
      setPayments(paymentsData ?? []);
    } catch {
      showSnack("Erro ao carregar dados", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const showSnack = (msg: string, severity: "success" | "error" = "success") => setSnack({ open: true, msg, severity });

  // ── CRUD Animais
  const openCreateAnimal = () => { setEditingAnimal(null); setForm({ ...EMPTY_FORM }); setAnimalDialog(true); };
  const openEditAnimal = (a: Animal) => {
    setEditingAnimal(a);
    setForm({
      nome: a.nome ?? "",
      especie: a.especie ?? "",
      raca: a.raca ?? "",
      sexo: a.sexo ?? "",
      porte: a.porte ?? "",
      idade: a.idade?.toString() ?? "",
      peso: a.peso?.toString() ?? "",
      descricao: a.descricao ?? "",
    });
    setAnimalDialog(true);
  };

  const saveAnimal = async () => {
    try {
      const payload = { ...form, idade: form.idade ? Number(form.idade) : null, peso: form.peso ? Number(form.peso) : null };
      if (editingAnimal) {
        await adminFetch(`/animals/${editingAnimal.id}`, { method: "PUT", body: JSON.stringify(payload) });
        showSnack("Animal atualizado!");
      } else {
        await adminFetch("/animals", { method: "POST", body: JSON.stringify(payload) });
        showSnack("Animal criado!");
      }
      setAnimalDialog(false); fetchAll();
    } catch { showSnack("Erro ao salvar animal", "error"); }
  };

  const confirmDeleteAnimal = (id: number) => setDeleteDialog({ open: true, id });
  const deleteAnimal = async () => {
    if (!deleteDialog.id) return;
    try { await adminFetch(`/animals/${deleteDialog.id}`, { method: "DELETE" }); showSnack("Animal removido"); fetchAll(); } 
    catch { showSnack("Erro ao remover", "error"); } 
    finally { setDeleteDialog({ open: false, id: null }); }
  };

  // ── Adoções
  const updateAdoptionStatus = async (id: number, status: string) => {
    try { await adminFetch(`/adoptions/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); showSnack(`Adoção ${status} com sucesso!`); fetchAll(); } 
    catch { showSnack("Erro ao atualizar adoção", "error"); }
  };

  // ── Apadrinhamentos
  const updateSponsorshipStatus = async (id: number, status: string) => {
    try { await adminFetch(`/sponsorships/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); showSnack("Apadrinhamento atualizado"); fetchAll(); } 
    catch { showSnack("Erro ao atualizar apadrinhamento", "error"); }
  };

  // ── Lookup helpers
  const getAnimalName = (id: number) => animals.find(a => a.id === id)?.nome ?? "—";
  const getUserName = (id: number) => users.find(u => u.id === id)?.nome ?? "—";

  // ── Render
  const navItems = [["Dashboard","dashboard"],["Animais","animals"],["Adoções","adoptions"],["Apadrinhamentos","sponsorships"],["Pagamentos","payments"]] as const;

  return (
    <Box sx={{ display:"flex", minHeight:"100vh" }}>
      {/* Sidebar */}
      <Box sx={{ width:240, bgcolor:"#1E293B", color:"white", p:2, display:"flex", flexDirection:"column" }}>
        <Typography variant="h6" sx={{ mb:2, fontWeight:700 }}>🐄 Admin Panel</Typography>
        <List dense>{navItems.map(([label,key]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton selected={section===key} onClick={()=>setSection(key)} sx={{ borderRadius:1, mb:0.5, "&.Mui-selected":{bgcolor:"#334155"}, "&:hover":{bgcolor:"#475569"} }}>
              <ListItemText primary={label}/>
            </ListItemButton>
          </ListItem>
        ))}</List>
        <Box sx={{ flex:1 }}/>
        <Button fullWidth variant="outlined" sx={{ color:"white", borderColor:"rgba(255,255,255,0.3)", mt:2 }} onClick={onBack}>← Voltar ao site</Button>
      </Box>

      {/* Conteúdo */}
      <Box sx={{ flex:1, p:3, bgcolor:"#F8FAFC" }}>
        {loading && <Box sx={{ display:"flex", justifyContent:"center", py:4 }}><CircularProgress/></Box>}

        {/* Dashboard */}
        {section==="dashboard" && !loading && (
          <>
            <Typography variant="h4" sx={{ mb:3, fontWeight:700 }}>Dashboard</Typography>
            <Grid container spacing={2}>
              {([["🐄 Animais", animals.length, "#D97706"],["🏠 Adoções", adoptions.length, "#2563EB"],["💛 Apadrinhamentos", sponsorships.length, "#16A34A"],["💳 Pagamentos", payments.length, "#7C3AED"]] as const)
              .map(([label,value,color])=>(
                <Grid sx={{xs:12, sm:6, md:3}}  key={label}>
                  <Card elevation={3} sx={{p:3,borderRadius:3,borderLeft:`4px solid ${color}`,transition:"transform 0.2s","&:hover":{transform:"translateY(-2px)",boxShadow:6}}}>
                    <Typography color="text.secondary" variant="body2">{label}</Typography>
                    <Typography variant="h3" sx={{ fontWeight:700,color }}>{value}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Animais */}
        {section==="animals" && !loading && (
          <>
            <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:3 }}>
              <Typography variant="h4" fontWeight={700}>Gerenciar Animais</Typography>
              <Button variant="contained" sx={{ bgcolor:"#D97706" }} onClick={openCreateAnimal}>+ Novo Animal</Button>
            </Box>
            <Card elevation={2} sx={{ borderRadius:2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor:"#F1F5F9" }}>
                    <TableCell><b>Nome</b></TableCell>
                    <TableCell><b>Espécie</b></TableCell>
                    <TableCell><b>Porte</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell align="center"><b>Ações</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {animals.length===0 ? <TableRow><TableCell colSpan={5} align="center" sx={{py:4,color:"text.secondary"}}>Nenhum animal cadastrado.</TableCell></TableRow>
                  : animals.map(a=>(
                    <TableRow key={a.id} hover>
                      <TableCell>{a.nome}</TableCell>
                      <TableCell>{a.especie}</TableCell>
                      <TableCell>{a.porte}</TableCell>
                      <TableCell><Chip label={a.status} size="small" color={a.status==="disponivel"?"success":"default"}/></TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar"><IconButton size="small" color="primary" onClick={()=>openEditAnimal(a)}><EditIcon fontSize="small"/></IconButton></Tooltip>
                        <Tooltip title="Excluir"><IconButton size="small" color="error" onClick={()=>confirmDeleteAnimal(a.id)}><DeleteIcon fontSize="small"/></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}

        {/* TODO: Adoções, Apadrinhamentos e Pagamentos podem ser renderizados de forma similar usando getAnimalName/getUserName para lookup */}
      </Box>

      {/* Modals */}
      <Dialog open={animalDialog} onClose={()=>setAnimalDialog(false)}>
        <DialogTitle>{editingAnimal?"Editar Animal":"Novo Animal"}</DialogTitle>
        <DialogContent sx={{ display:"flex", flexDirection:"column", gap:2, mt:1 }}>
          <TextField label="Nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/>
          <TextField label="Espécie" value={form.especie} onChange={e=>setForm({...form,especie:e.target.value})}/>
          <TextField label="Raça" value={form.raca} onChange={e=>setForm({...form,raca:e.target.value})}/>
          <TextField label="Sexo" value={form.sexo} onChange={e=>setForm({...form,sexo:e.target.value})}/>
          <TextField label="Porte" value={form.porte} onChange={e=>setForm({...form,porte:e.target.value})}/>
          <TextField label="Idade" value={form.idade} type="number" onChange={e=>setForm({...form,idade:e.target.value})}/>
          <TextField label="Peso" value={form.peso} type="number" onChange={e=>setForm({...form,peso:e.target.value})}/>
          <TextField label="Descrição" value={form.descricao} onChange={e=>setForm({...form,descricao:e.target.value})}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setAnimalDialog(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveAnimal}>Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={()=>setDeleteDialog({open:false,id:null})}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogActions>
          <Button onClick={()=>setDeleteDialog({open:false,id:null})}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={deleteAnimal}>Excluir</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={()=>setSnack({...snack,open:false})} message={snack.msg}/>
    </Box>
  );
}