import { styles } from '../styles/styles';

interface SidebarProps {
  isDrawerOpen: boolean;
  activeTab: 'inicio' | 'pessoas' | 'transacoes';
  hoveredItem: string | null;
  onHoverItem: (item: string | null) => void;
  onSelectTab: (tab: 'inicio' | 'pessoas' | 'transacoes') => void;
}

export const Sidebar = ({
  isDrawerOpen,
  activeTab,
  hoveredItem,
  onHoverItem,
  onSelectTab,
}: SidebarProps) => {
  return (
    <aside
      style={{
        ...styles.drawer,
        width: isDrawerOpen ? '250px' : '0px',
        borderRight: isDrawerOpen ? '1px solid var(--border)' : 'none',
        padding: isDrawerOpen ? '15px 0' : '0px',
      }}
    >
      <nav style={styles.navMenu}>
        <a
          href="#inicio"
          style={{
            ...styles.navItem,
            ...(activeTab === 'inicio' ? styles.navItemActive : {}),
            ...(hoveredItem === 'inicio' && activeTab !== 'inicio' ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => onHoverItem('inicio')}
          onMouseLeave={() => onHoverItem(null)}
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('inicio');
          }}
        >
          Início
        </a>
        <a
          href="#pessoas"
          style={{
            ...styles.navItem,
            ...(activeTab === 'pessoas' ? styles.navItemActive : {}),
            ...(hoveredItem === 'pessoas' && activeTab !== 'pessoas' ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => onHoverItem('pessoas')}
          onMouseLeave={() => onHoverItem(null)}
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('pessoas');
          }}
        >
          Pessoas
        </a>
        <a
          href="#transacoes"
          style={{
            ...styles.navItem,
            ...(activeTab === 'transacoes' ? styles.navItemActive : {}),
            ...(hoveredItem === 'transacoes' && activeTab !== 'transacoes' ? styles.navItemHover : {}),
          }}
          onMouseEnter={() => onHoverItem('transacoes')}
          onMouseLeave={() => onHoverItem(null)}
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('transacoes');
          }}
        >
          Transações
        </a>
      </nav>
    </aside>
  );
};
