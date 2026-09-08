import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastContextData {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);
