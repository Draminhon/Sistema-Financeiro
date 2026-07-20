import { useEffect, useState } from 'react';
import './App.css';
import type { Person } from './models/Person';
import type { Transaction } from './models/Transaction';
import { styles } from './styles/styles';
import { fetchPeople, createPerson, removePerson } from './controllers/personController';
import { fetchTransactions, createTransaction } from './controllers/transactionController';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TotalsTable } from './components/TotalsTable';
import { SummaryCards } from './components/SummaryCards';
import { PeopleTable } from './components/PeopleTable';
import { PersonForm } from './components/PersonForm';
import { TransactionsTable } from './components/TransactionsTable';
import { TransactionForm } from './components/TransactionForm';

function App() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'inicio' | 'pessoas' | 'transacoes'>('inicio');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [nameInput, setNameInput] = useState<string>('');
  const [ageInput, setAgeInput] = useState<string>('');

  const [transDescription, setTransDescription] = useState<string>('');
  const [transValue, setTransValue] = useState<string>('');
  const [transType, setTransType] = useState<string>('Receita');
  const [transPersonId, setTransPersonId] = useState<string>('');

  const [totalsFilter, setTotalsFilter] = useState<'todos' | 'receita' | 'despesa' | 'saldo'>('todos');
  const [pageTotals, setPageTotals] = useState<number>(1);
  const [pagePeople, setPagePeople] = useState<number>(1);
  const [pageTransactions, setPageTransactions] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;

  const safePeople = Array.isArray(people) ? people : [];
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const loadPeople = async () => {
    const data = await fetchPeople();
    setPeople(data);
  };

  const loadTransaction = async () => {
    const data = await fetchTransactions();
    setTransactions(data);
  };

  const addPerson = async (newPerson: Person) => {
    const result = await createPerson(newPerson);
    if (!result.success && result.error) {
      alert(`Resposta do servidor: ${result.error}`);
      loadPeople();
      return;
    }
    if (result.data && result.data.length > 0) {
      setPeople(result.data);
    } else {
      loadPeople();
    }
  };

  const deletePerson = async (id: number) => {
    await removePerson(id);
    setPeople(prev => (Array.isArray(prev) ? prev : []).filter(p => p.id !== id));
  };

  const addTransaction = async (newTransaction: Transaction) => {
    const result = await createTransaction(newTransaction);
    if (!result.success && result.error) {
      alert(`Resposta do servidor: ${result.error}`);
      loadTransaction();
      return;
    }
    if (result.data && result.data.length > 0) {
      setTransactions(result.data);
    } else {
      loadTransaction();
    }
  };

  useEffect(() => {
    loadPeople();
    loadTransaction();
  }, []);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !ageInput) return;

    const ageNum = Number(ageInput);
    if (ageNum > 99) {
      alert("Não é permitido cadastrar pessoas com mais de 99 anos.");
      return;
    }

    const newPerson: Person = {
      id: safePeople.length > 0 ? Math.max(...safePeople.map(p => p.id)) + 1 : 1,
      name: nameInput.trim(),
      age: ageNum,
    };

    addPerson(newPerson);
    setPeople([...safePeople, newPerson]);
    setNameInput('');
    setAgeInput('');
  };

  const handleDeletePerson = (id: number) => {
    setPeople(safePeople.filter(p => p.id !== id));
    deletePerson(id);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transDescription.trim() || !transValue || !transPersonId) return;

    const selectedPerson = safePeople.find(p => p.id === Number(transPersonId)) || null;

    if (selectedPerson && Number(selectedPerson.age) < 18 && transType === 'Receita') {
      alert(`A pessoa selecionada (${selectedPerson.name}) tem ${selectedPerson.age} anos e menores de 18 anos só podem registrar despesas.`);
      return;
    }

    const newTransaction: Transaction = {
      id: safeTransactions.length > 0 ? Math.max(...safeTransactions.map(t => t.id)) + 1 : 1,
      description: transDescription.trim(),
      value: Number(transValue),
      type: transType,
      personId: Number(transPersonId),
      person: selectedPerson,
    };
    addTransaction(newTransaction);
    setTransactions([newTransaction, ...safeTransactions]);
    setTransDescription('');
    setTransValue('');
    setTransType('Receita');
    setTransPersonId('');
  };

  return (
    <div style={styles.appContainer}>
      <Header
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setDrawerOpen(!isDrawerOpen)}
      />

      <div style={styles.mainLayout}>
        <Sidebar
          isDrawerOpen={isDrawerOpen}
          activeTab={activeTab}
          hoveredItem={hoveredItem}
          onHoverItem={setHoveredItem}
          onSelectTab={setActiveTab}
        />

        <main style={styles.content}>
          {activeTab === 'inicio' && (
            <div style={styles.peopleSection}>
              <h2 style={styles.sectionTitle}>Consulta de Totais</h2>

              <TotalsTable
                people={safePeople}
                transactions={safeTransactions}
                filter={totalsFilter}
                onFilterChange={setTotalsFilter}
                currentPage={pageTotals}
                onPageChange={setPageTotals}
                itemsPerPage={ITEMS_PER_PAGE}
              />

              <SummaryCards transactions={safeTransactions} />
            </div>
          )}

          {activeTab === 'pessoas' && (
            <div style={styles.peopleSection}>
              <h2 style={styles.sectionTitle}>Gerenciamento de Pessoas</h2>

              <div style={styles.peopleGrid}>
                <PeopleTable
                  people={safePeople}
                  onDeletePerson={handleDeletePerson}
                  currentPage={pagePeople}
                  onPageChange={setPagePeople}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                <PersonForm
                  nameInput={nameInput}
                  ageInput={ageInput}
                  onNameChange={setNameInput}
                  onAgeChange={setAgeInput}
                  onSubmit={handleAddPerson}
                />
              </div>
            </div>
          )}

          {activeTab === 'transacoes' && (
            <div style={styles.peopleSection}>
              <h2 style={styles.sectionTitle}>Registro de Transações</h2>

              <div style={styles.peopleGrid}>
                <TransactionsTable
                  transactions={safeTransactions}
                  people={safePeople}
                  currentPage={pageTransactions}
                  onPageChange={setPageTransactions}
                  itemsPerPage={ITEMS_PER_PAGE}
                />

                <TransactionForm
                  transDescription={transDescription}
                  transValue={transValue}
                  transType={transType}
                  transPersonId={transPersonId}
                  people={safePeople}
                  onDescriptionChange={setTransDescription}
                  onValueChange={setTransValue}
                  onTypeChange={setTransType}
                  onPersonIdChange={setTransPersonId}
                  onSubmit={handleAddTransaction}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
