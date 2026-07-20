import type { Person } from '../models/Person';
import type { Transaction } from '../models/Transaction';
import { styles } from '../styles/styles';
import { Pagination } from './Pagination';

interface TotalsTableProps {
  people: Person[];
  transactions: Transaction[];
  filter: 'todos' | 'receita' | 'despesa' | 'saldo';
  onFilterChange: (filter: 'todos' | 'receita' | 'despesa' | 'saldo') => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export const TotalsTable = ({
  people,
  transactions,
  filter,
  onFilterChange,
  currentPage,
  onPageChange,
  itemsPerPage,
}: TotalsTableProps) => {
  const safePeople = Array.isArray(people) ? people : [];
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const calculatedList = safePeople.map((person) => {
    const personTransactions = safeTransactions.filter(t => t.personId === person.id);
    const totalReceitas = personTransactions
      .filter(t => t.type === 'Receita' || (t.type as any) === 0 || t.type === '0')
      .reduce((sum, t) => sum + Number(t.value), 0);
    const totalDespesas = personTransactions
      .filter(t => t.type === 'Despesa' || t.type === 'Gasto' || (t.type as any) === 1 || t.type === '1')
      .reduce((sum, t) => sum + Number(t.value), 0);
    const saldo = totalReceitas - totalDespesas;
    return { person, totalReceitas, totalDespesas, saldo };
  });

  const sortedList = [...calculatedList].sort((a, b) => {
    if (filter === 'receita') return b.totalReceitas - a.totalReceitas;
    if (filter === 'despesa') return b.totalDespesas - a.totalDespesas;
    if (filter === 'saldo') return b.saldo - a.saldo;
    return 0;
  });

  const totalPages = Math.ceil(sortedList.length / itemsPerPage) || 1;
  const page = Math.min(currentPage, totalPages);
  const currentItems = sortedList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={styles.tableCard}>
      <div style={styles.cardHeaderWithFilter}>
        <h3 style={{ ...styles.cardTitle, margin: 0 }}>Totais</h3>
        <div style={styles.filterControlGroup}>
          <label style={styles.filterLabel}>Filtrar / Ordenar por:</label>
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as any)}
            style={styles.filterSelect}
          >
            <option value="todos">Padrão (Todos)</option>
            <option value="receita">Maior Total Receita</option>
            <option value="despesa">Maior Total Despesas</option>
            <option value="saldo">Maior Saldo</option>
          </select>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Pessoa</th>
            <th style={styles.th}>Total Receita</th>
            <th style={styles.th}>Total Despesas</th>
            <th style={styles.th}>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {safePeople.length === 0 ? (
            <tr>
              <td colSpan={4} style={styles.emptyTd}>Nenhuma pessoa cadastrada para consulta de totais.</td>
            </tr>
          ) : (
            currentItems.map(({ person, totalReceitas, totalDespesas, saldo }) => (
              <tr key={person.id} style={styles.tr}>
                <td style={styles.tdBold}>{person.name}</td>
                <td style={{ ...styles.td, color: '#16a34a', fontWeight: '500' }}>
                  R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td style={{ ...styles.td, color: '#dc2626', fontWeight: '500' }}>
                  R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td style={{
                  ...styles.tdBold,
                  color: saldo > 0 ? '#16a34a' : saldo < 0 ? '#dc2626' : 'var(--text-h)'
                }}>
                  R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {safePeople.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
