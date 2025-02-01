
export function formatPrice(price) {
    
    const integerPart = price.amount.toLocaleString('es-AR'); // p.ej: 249.999
    const decimalPart = price.decimals > 0
      ? price.decimals.toString().padStart(2, '0')
      : null;
    return decimalPart
      ? ` $ ${integerPart},${decimalPart}`
      : ` $ ${integerPart}`;
  }
  