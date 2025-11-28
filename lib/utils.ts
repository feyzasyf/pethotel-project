import { clsx, type ClassValue } from "clsx";
import { ActionResult } from "./types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data, error: null };
}

export function fail(error: string): ActionResult<never> {
  return { success: false, data: null, error };
}
