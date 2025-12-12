/**
 * Converte um valor monetário em reais (BRL) para centavos.
 * @param {string} amount - Valor monetário a ser convertido.
 * @returns {number} Valor em centavos.
 *
 * @example
 * convertRealToCents("150,00"); // retorna 15000
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
  const priceInCents = Math.round(numericPrice * 100)

  return priceInCents
}
