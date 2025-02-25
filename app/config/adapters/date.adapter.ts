export class DateAdapter {
  static formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static isToday(date: Date): boolean {
    const now = new Date();

    return date.toLocaleDateString() === now.toLocaleDateString();
  }
}
