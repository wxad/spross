import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 tailwind ClassNames
 * @param inputs ClassValue[]
 * @returns string
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))