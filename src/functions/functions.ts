export const formatAreaString = (input: string) => {
  const [min, max] = input.split("-").map(Number);

  if (min && !max) {
    return `${min} მ² - ∞`;
  }

  if (min && max) {
    return `${min} მ² - ${max} მ²`;
  }
};

export const formatPriceFilter = (value: string) => {
  const [min, max] = value.split("-").map(Number);
  const minFormatted = min;
  const maxFormatted = max || "∞";

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

export const formatCurrencyWithoutComa = (amount: number): string => {
  if (isNaN(amount)) return "";

  const parts = amount.toString().split(".");
  const integerPart = parts[0];
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedInteger} ₾`;
};

export const formatArea = (value: number): string => {
  return `${value.toFixed(1).replace(/\.0$/, "")} მ²`;
};

export function base64ToFile(base64String: string): File {
  const [header, base64Data] = base64String.split(",");

  const mimeType = header.match(/:(.*?);/)?.[1] || "application/octet-stream";

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([byteNumbers], { type: mimeType });

  const extension = mimeType.split("/")[1];
  const filename = `file.${extension}`;

  const file = new File([blob], filename, { type: mimeType });

  return file;
}
