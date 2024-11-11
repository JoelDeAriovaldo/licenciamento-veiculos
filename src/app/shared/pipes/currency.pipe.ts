import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mzncurrency'
})
export class MznCurrencyPipe implements PipeTransform {
  transform(value: number | string, showSymbol: boolean = true): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return 'Invalid Amount';
    }

    // Formata o número com 2 casas decimais e separador de milhares
    const formattedValue = new Intl.NumberFormat('pt-MZ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);

    // Adiciona o símbolo da moeda se solicitado
    return showSymbol ? `${formattedValue} MT` : formattedValue;
  }
}

