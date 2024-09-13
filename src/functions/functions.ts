export const formatAreaFilter = (value: string) => {
  const [min, max] = value.split("-").map(Number);

  const minFormatted = (min / 1000).toFixed(0);
  const maxFormatted = (max / 1000).toFixed(0);

  return `${minFormatted} მ² to ${maxFormatted} მ²`;
};

export const formatPriceFilter = (value: string) => {
  const [min, max] = value.split("-").map(Number);
  const minFormatted = min;
  const maxFormatted = max;

  return `${minFormatted}₾ - ${maxFormatted}₾`;
};

export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat("ka-GE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedAmount = formatter.format(amount);

  return `${formattedAmount} ₾`;
};
