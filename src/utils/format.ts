export const formatCurrency = (amount: number): string =>
    amount.toLocaleString("id-ID", { minimumFractionDigits: 0 });
  