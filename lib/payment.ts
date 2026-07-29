export const BANK_TRANSFER = {
  iban: "ES7000495127182416318309",
  titular: "Marina Descalzi",
};

export const SHIPPING_COST = 3.95;

export function generateOrderReference() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  const time = Date.now().toString(36).slice(-4).toUpperCase();
  return `AM-${time}${random}`;
}
