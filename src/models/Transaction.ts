import type { Person } from "./Person";

export interface Transaction{
    id: number;
    type: string;
    description: string;
    value: number;
    personId: number,
    person: Person | null;
}