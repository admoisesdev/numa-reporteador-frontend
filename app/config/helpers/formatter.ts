export class Formatter {
  static numberWithCommasAndDots(number: number | string): string {
    if (!number) return "0";

    if (typeof number === "string") {
      number = parseFloat(number);
    }

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}