import type { Transaction } from '../models/Transaction';
import { styles } from '../styles/styles';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards = ({ transactions }: SummaryCardsProps) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const totalReceitas = safeTransactions
    .filter(t => t.type === 'Receita' || (t.type as any) === 0 || t.type === '0')
    .reduce((sum, t) => sum + Number(t.value), 0);

  const totalDespesas = safeTransactions
    .filter(t => t.type === 'Despesa' || t.type === 'Gasto' || (t.type as any) === 1 || t.type === '1')
    .reduce((sum, t) => sum + Number(t.value), 0);

  const saldoLiquido = totalReceitas - totalDespesas;

  return (
    <div style={{ marginTop: '12px' }}>
      <h2 style={styles.sectionTitle}>Resumo Geral</h2>
      <div style={styles.cardsRow}>
        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #22c55e' }}>
          <span style={styles.summaryLabel}>Total Geral de Receitas</span>
          <span style={{ ...styles.summaryValue, color: '#16a34a' }}>
            R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div style={{ ...styles.summaryCard, borderLeft: '4px solid #ef4444' }}>
          <span style={styles.summaryLabel}>Total Geral de Despesas</span>
          <span style={{ ...styles.summaryValue, color: '#dc2626' }}>
            R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div style={{
          ...styles.summaryCard,
          borderLeft: `4px solid ${saldoLiquido >= 0 ? '#2563eb' : '#ef4444'}`
        }}>
          <span style={styles.summaryLabel}>Saldo Líquido</span>
          <span style={{
            ...styles.summaryValue,
            color: saldoLiquido > 0 ? '#2563eb' : saldoLiquido < 0 ? '#dc2626' : 'var(--text-h)'
          }}>
            R$ {saldoLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
