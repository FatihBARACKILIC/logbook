import { toast as sonner, type ExternalToast } from "sonner";

type ToastFunction = (title: string, data?: ExternalToast) => void;

type Toast = {
  (title: string, data?: ExternalToast): void;
  message: ToastFunction;
  info: ToastFunction;
  loading: ToastFunction;
  success: ToastFunction;
  waning: ToastFunction;
  error: ToastFunction;
};

const defaultData: ExternalToast = {
  style: {
    background: "var(--background)",
    color: "var(--foreground)",
    border: "var(--border)",
    boxShadow: "var(--shadow-lg)"
  },
  actionButtonStyle: {
    background: "var(--primary)",
    color: "var(--primary-foreground)"
  },
  cancelButtonStyle: {
    background: "var(--muted)",
    color: "var(--muted-foreground)"
  }
};

export const toast = ((title, data) => {
  sonner(title, { ...defaultData, ...data });
}) as Toast;

toast.message = (title, data) => {
  sonner.message(title, { ...defaultData, ...data });
};

toast.info = (title, data) => {
  sonner.info(title, { ...defaultData, ...data });
};

toast.loading = (title, data) => {
  sonner.loading(title, { ...defaultData, ...data });
};

toast.success = (title, data) => {
  sonner.success(title, { ...defaultData, ...data });
};

toast.waning = (title, data) => {
  sonner.warning(title, { ...defaultData, ...data });
};

toast.error = (title, data) => {
  sonner.error(title, { ...defaultData, ...data });
};
