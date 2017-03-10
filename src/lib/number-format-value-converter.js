import numeral from 'numeral';

export class NumberFormatValueConverter {
  toView(value, format) { 
    if (value)
      return numeral(value).format(format);
    else
      return "";
  }

  fromView(numericString, format) { 
    return numeral(numericString).value(format);
  }
}
