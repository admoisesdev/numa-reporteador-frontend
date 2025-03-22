import { format, parseISO, type FormatOptions } from "date-fns";
import { es } from "date-fns/locale/es";
import { toZonedTime, type ToDateOptionsWithTZ } from "date-fns-tz";

export class DateAdapter {
  static format(
    date: Date | number | string,
    stringFormat: string,
    options: FormatOptions = { locale: es }
  ): string {
    let formatDate = new Date(date);

    if (typeof date === "string") {
      formatDate = DateAdapter.parseISO(date);
    }

    const dateInTimeZone = DateAdapter.zonedTimeToUtc(formatDate);

    return format(new Date(dateInTimeZone), stringFormat, options);
  }

  static isToday(date: Date): boolean {
    const now = new Date();

    return date.toLocaleDateString() === now.toLocaleDateString();
  }

  static parseISO(
    argument: string,
    options?: { additionalDigits?: 0 | 1 | 2 }
  ): Date {
    return parseISO(argument, options);
  }

  static zonedTimeToUtc(
    date: Date | string | number,
    timeZone: string = "America/Santiago",
    options?: ToDateOptionsWithTZ
  ): Date {
    return toZonedTime(date, timeZone, options);
  }
}
