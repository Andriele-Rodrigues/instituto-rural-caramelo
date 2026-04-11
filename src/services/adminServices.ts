import { apiFetch } from "./api";

export function createAnimal(data: any) {
  return apiFetch("/animals", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteAnimal(id: number) {
  return apiFetch(`/animals/${id}`, {
    method: "DELETE",
  });
}

export function updateAnimal(id: number, data: any) {
  return apiFetch(`/animals/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function approveAdoption(id: number) {
  return apiFetch(`/adoptions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "aprovado" }),
  });
}

export function rejectAdoption(id: number) {
  return apiFetch(`/adoptions/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "recusado" }),
  });
}