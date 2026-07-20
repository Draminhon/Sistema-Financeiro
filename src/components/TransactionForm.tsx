import type { FormEvent } from 'react';
import type { Person } from '../models/Person';
import { styles } from '../styles/styles';

interface TransactionFormProps {
  transDescription: string;
  transValue: string;
  transType: string;
  transPersonId: string;
  people: Person[];
  onDescriptionChange: (val: string) => void;
  onValueChange: (val: string) => void;
  onTypeChange: (val: string) => void;
  onPersonIdChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const TransactionForm = ({
  transDescription,
  transValue,
  transType,
  transPersonId,
  people,
  onDescriptionChange,
  onValueChange,
  onTypeChange,
  onPersonIdChange,
  onSubmit,
}: TransactionFormProps) => {
  const safePeople = Array.isArray(people) ? people : [];
  const selectedPerson = safePeople.find(p => p.id === Number(transPersonId));
  const isMinor = selectedPerson && Number(selectedPerson.age) < 18;

  return (
    <div style={styles.formCard}>
      <h3 style={styles.cardTitle}>Adicionar Nova Transação</h3>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Pagamento de Conta, Salário..."
            value={transDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Valor</label>
          <input
            type="number"
            step="0.01"
            placeholder="R$ 0,00"
            value={transValue}
            onChange={(e) => onValueChange(e.target.value)}
            style={styles.input}
            min="0.01"
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Pessoa Relacionada</label>
          <select
            value={transPersonId}
            onChange={(e) => {
              const idStr = e.target.value;
              onPersonIdChange(idStr);
              const p = safePeople.find(item => item.id === Number(idStr));
              if (p && Number(p.age) < 18) {
                onTypeChange('Despesa');
              }
            }}
            style={styles.selectInput}
            required
          >
            <option value="">Selecione a pessoa</option>
            {safePeople.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name} ({person.age} anos)
              </option>
            ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Tipo</label>
          <select
            value={transType}
            onChange={(e) => onTypeChange(e.target.value)}
            style={styles.selectInput}
            required
          >
            <option value="Receita" disabled={Boolean(isMinor)}>
              Receita {isMinor ? '(Bloqueado para < 18 anos)' : ''}
            </option>
            <option value="Despesa">Despesa</option>
          </select>
          {isMinor && (
            <span style={{ color: '#d97706', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              ⚠️ Pessoas menores de 18 anos só podem registrar despesas.
            </span>
          )}
        </div>

        <button type="submit" style={styles.greenSubmitButton}>
          Cadastrar Transação
        </button>
      </form>
    </div>
  );
};
