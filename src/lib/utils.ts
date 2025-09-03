import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// rupiah format
export const rupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

// convert date to dd/mm/yyyy
export const convertDate = (date: Date | null, format = "dd/mm/yyyy") => {
  if (!date) {
    return dayjs().format(format);
  }

  return dayjs(date).format(format);
};
