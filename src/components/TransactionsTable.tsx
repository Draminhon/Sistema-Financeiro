import type { Person } from '../models/Person';
import type { Transaction } from '../models/Transaction';
import { styles } from '../styles/styles';
import { Pagination } from './Pagination';

interface TransactionsTableProps {
  transactions: Transaction[];
  people: Person[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export const TransactionsTable = ({
  transactions,
  people,
  currentPage,
  onPageChange,
  itemsPerPage,
}: TransactionsTableProps) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const safePeople = Array.isArray(people) ? people : [];
  const totalPages = Math.ceil(safeTransactions.length / itemsPerPage) || 1;
  const page = Math.min(currentPage, totalPages);
  const currentTransactions = safeTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={styles.tableCard}>
      <h3 style={styles.cardTitle}>Últimas Transações Registradas</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Descrição</th>
            <th style={styles.th}>Valor</th>
            <th style={styles.th}>Tipo</th>
            <th style={styles.th}>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {safeTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} style={styles.emptyTd}>Nenhuma transação registrada.</td>
            </tr>
          ) : (
            currentTransactions.map((t) => {
              const isReceita = t.type === 'Receita' || (t.type as any) === 0 || t.type === '0';
              const label = isReceita ? 'Receita' : 'Despesa';
              return (
                <tr key={t.id} style={styles.tr}>
                  <td style={styles.td}>#{t.id}</td>
                  <td style={styles.tdBold}>{t.description}</td>
                  <td style={styles.td}>
                    R$ {Number(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={styles.td}>
                    <span style={isReceita ? styles.badgeReceita : styles.badgeDespesa}>
                      {label}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {t.person ? t.person.name : (safePeople.find(p => p.id === t.personId)?.name || 'N/A')}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {safeTransactions.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
