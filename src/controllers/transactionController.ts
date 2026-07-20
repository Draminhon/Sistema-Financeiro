import type { Transaction } from '../models/Transaction';

const API_URL = 'https://localhost:7081/transaction';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Falha na resposta");
    const dados = await response.json();
    return Array.isArray(dados) ? dados : [];
  } catch (error) {
    console.error("Erro ao buscar dados de transações", error);
    return [];
  }
};

export const createTransaction = async (newTransaction: Transaction): Promise<{ success: boolean; data?: Transaction[]; error?: string }> => {
  try {

    const backendType = newTransaction.type === 'Despesa' ? 'Gasto' : 'Receita';

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: newTransaction.description,
        value: newTransaction.value,
        type: backendType,
        personId: newTransaction.personId,
        person: newTransaction.person,
      })
    });
    if (!response.ok) {
      let errorMsg = "Erro na requisição.";
      try {
        const errData = await response.json();
        errorMsg = typeof errData === 'string' ? errData : (errData.message || errData.title || JSON.stringify(errData));
      } catch {
        errorMsg = await response.text();
      }
      return { success: false, error: errorMsg };
    }
    const dados = await response.json();
    const updatedList = await fetchTransactions();
    return {
      success: true,
      data: updatedList.length > 0 ? updatedList : (Array.isArray(dados) ? dados : [dados])
    };
  } catch (error: any) {
    console.error("Erro ao inserir transação", error);
    return { success: false, error: error?.message || 'Erro de rede' };
  }
};
