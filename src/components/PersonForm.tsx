import type { FormEvent } from 'react';
import { styles } from '../styles/styles';

interface PersonFormProps {
  nameInput: string;
  ageInput: string;
  onNameChange: (val: string) => void;
  onAgeChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export const PersonForm = ({
  nameInput,
  ageInput,
  onNameChange,
  onAgeChange,
  onSubmit,
}: PersonFormProps) => {
  return (
    <div style={styles.formCard}>
      <h3 style={styles.cardTitle}>Adicionar Nova Pessoa</h3>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nome</label>
          <input
            type="text"
            placeholder="Digite o nome completo"
            value={nameInput}
            onChange={(e) => onNameChange(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Idade</label>
          <input
            type="number"
            placeholder="Digite a idade"
            value={ageInput}
            onChange={(e) => onAgeChange(e.target.value)}
            style={styles.input}
            min="0"
            max="99"
            required
          />
        </div>

        <button type="submit" style={styles.greenSubmitButton}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};
