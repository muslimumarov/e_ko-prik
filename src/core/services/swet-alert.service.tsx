import Swal from "sweetalert2";

export class SwetAlertService {
  static error(title = "Error", message = "Oops! An Error Occurred") {
    return Swal.fire({
      icon: "error",
      title: title,
      allowOutsideClick: false,
      text: message,
      showConfirmButton: true,
      timer: 2000,
    });
  }

  static success(title = "Success", message = "") {
    return Swal.fire({
      icon: "success",
      title: title,
      allowOutsideClick: false,
      text: message,
      showConfirmButton: true,
      timer: 2000,
    });
  }

  static warning(title = "Warning", message = "") {
    return Swal.fire({
      icon: "warning",
      title: title,
      allowOutsideClick: false,
      text: message,
      showConfirmButton: true,
      timer: 2000,
    });
  }

  static info(title = "Info", message = "") {
    return Swal.fire({
      icon: "info",
      title: title,
      allowOutsideClick: false,
      text: message,
      showConfirmButton: true,
      timer: 2000,
    });
  }

  static confirm(title: string | null = "Info", message: string | null = "") {
    return Swal.fire({
      title: title || "Info",
      allowOutsideClick: false,
      text: message || "",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Tasdiqlash",
      cancelButtonText: "Bekor qilish",
    });
  }
}
