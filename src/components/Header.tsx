import { styles } from '../styles/styles';

interface HeaderProps {
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

export const Header = ({ isDrawerOpen, onToggleDrawer }: HeaderProps) => {
  return (
    <header style={styles.appBar}>
      <div style={styles.appBarLeft}>
        <button
          onClick={onToggleDrawer}
          style={styles.menuButton}
          title={isDrawerOpen ? "Fechar menu" : "Abrir menu"}
        >
          ☰
        </button>
        <span style={styles.appBarTitle}>Dashboard Financeiro</span>
      </div>

      <div style={styles.appBarRight}>
        <span style={styles.userInfo}>Olá, Administrador!</span>
      </div>
    </header>
  );
};
