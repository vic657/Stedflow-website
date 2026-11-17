export type CurrencyCode = 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
}

export interface PersonaData {
  id: 'shifts' | 'freelance' | 'salaried';
  name: string;
  iconName: string;
  badge: string;
  title: string;
  quote: string;
  scenario: string;
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  features: string[];
  sampleEntries: {
    title: string;
    category: string;
    amount: string;
    type: 'income' | 'bill' | 'savings';
    status: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
