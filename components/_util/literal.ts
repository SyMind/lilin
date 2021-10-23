export const isNumeric = (value: any): boolean => !isNaN(parseFloat(value)) && isFinite(value);

export const isURI = (value: any): boolean => typeof value === 'string' && /^([^:/?#]+?):(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.test(value);
