import type { Person } from '../models/Person';
import { styles } from '../styles/styles';
import { Pagination } from './Pagination';

interface PeopleTableProps {
  people: Person[];
  onDeletePerson: (id: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export const PeopleTable = ({
  people,
  onDeletePerson,
  currentPage,
  onPageChange,
  itemsPerPage,
}: PeopleTableProps) => {
  const safePeople = Array.isArray(people) ? people : [];
  const totalPages = Math.ceil(safePeople.length / itemsPerPage) || 1;
  const page = Math.min(currentPage, totalPages);
  const currentPeople = safePeople.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={styles.tableCard}>
      <h3 style={styles.cardTitle}>Lista de Pessoas Cadastradas</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nome</th>
            <th style={styles.th}>Idade</th>
            <th style={{ ...styles.th, textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {safePeople.length === 0 ? (
            <tr>
              <td colSpan={4} style={styles.emptyTd}>Nenhuma pessoa cadastrada.</td>
            </tr>
          ) : (
            currentPeople.map((person) => (
              <tr key={person.id} style={styles.tr}>
                <td style={styles.td}>#{person.id}</td>
                <td style={styles.tdBold}>{person.name}</td>
                <td style={styles.td}>{person.age} anos</td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  <button
                    onClick={() => onDeletePerson(person.id)}
                    style={styles.deleteButton}
                    title="Excluir pessoa"
                  >
                    Excluir
                  </button>
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
