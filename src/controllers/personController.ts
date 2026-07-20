import type { Person } from '../models/Person';

const API_URL = 'https://localhost:7081/person';

export const fetchPeople = async (): Promise<Person[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Falha na resposta");
    const dados = await response.json();
    return Array.isArray(dados) ? dados : [];
  } catch (error) {
    console.error("Erro ao buscar dados de pessoas", error);
    return [];
  }
};

export const createPerson = async (newPerson: Person): Promise<{ success: boolean; data?: Person[]; error?: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newPerson.name,
        age: newPerson.age
      })
    });
    if (!response.ok) {
      let errorMsg = "Erro ao cadastrar pessoa.";
      try {
        const errData = await response.json();
        errorMsg = typeof errData === 'string' ? errData : (errData.message || errData.title || JSON.stringify(errData));
      } catch {
        errorMsg = await response.text();
      }
      return { success: false, error: errorMsg };
    }
    const dados = await response.json();
    const updatedList = await fetchPeople();
    return {
      success: true,
      data: updatedList.length > 0 ? updatedList : (Array.isArray(dados) ? dados : [dados])
    };
  } catch (error: any) {
    console.error("Erro ao inserir pessoa", error);
    return { success: false, error: error?.message || 'Erro de rede' };
  }
};

export const removePerson = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Erro ao deletar dados", error);
    return false;
  }
};
