import Swal from "sweetalert2";

type SwalAlertProps = {
  icon: "success" | "error" | "warning" | "info" | "question";
  title: string;
};

export function SwalAlert({ icon, title }: SwalAlertProps) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
}
