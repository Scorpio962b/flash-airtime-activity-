export interface AirtimeCase {
  caseId: string;
  scenario: string;
  purchase: {
    network: string;
    cellphone: string;
    amount: string;
  };
  expect: {
    outcome: 'success' | 'error';
    message: string;
    walletBalance: string;
  };
} 