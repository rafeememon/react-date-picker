import isSameDayLib from "date-fns/esm/isSameDay";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function isSameDay(date1: Date | null | undefined, date2: Date | null | undefined) {
    if (date1 && date2) {
        return isSameDayLib(date1, date2);
    } else {
        return date1 === date2;
    }
}
