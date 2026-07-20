import { styles } from '../styles/styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 0) return null;

  return (
    <div style={styles.paginationContainer}>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        style={{
          ...styles.paginationButton,
          ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
        }}
      >
        Anterior
      </button>
      <span style={styles.paginationText}>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
        style={{
          ...styles.paginationButton,
          ...(currentPage >= totalPages ? styles.paginationButtonDisabled : {})
        }}
      >
        Próxima
      </button>
    </div>
  );
};
