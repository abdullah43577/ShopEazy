import { SwalAlert } from "./SwalAlert";

export function handleAxiosErrors(err: any) {
  console.log("error", err);

  if (err.response?.data?.errors.length) {
    const errors: { field: string; message: string }[] =
      err.response.data.errors;
    const errorMessage = errors.map((error) => error.message).join("\n \n");

    SwalAlert({
      icon: "error",
      title: errorMessage,
    });
  } else if (err.response?.data?.message) {
    SwalAlert({
      icon: "error",
      title: err.response.data.message,
    });
  } else {
    SwalAlert({
      icon: "error",
      title: "An error occurred. Please try again later.",
    });
  }
}
