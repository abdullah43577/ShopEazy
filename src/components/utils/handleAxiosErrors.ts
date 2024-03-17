import { SwalAlert } from "./SwalAlert";

export function handleAxiosErrors(err: any) {
  if (err.response.data.errors?.length) {
    const errors: { field: string; message: string }[] =
      err.response.data.errors;
    const errorMessage = errors.map((error) => error.message).join("\n \n");

    console.log(errorMessage);
    SwalAlert({
      icon: "error",
      title: errorMessage,
    });
  } else if (err.response.data.message) {
    console.log(err.response.data.message);
    SwalAlert({
      icon: "error",
      title: err.response.data.message,
    });
  } else {
    console.log("An error occurred. Please try again later.");
    SwalAlert({
      icon: "error",
      title: "An error occurred. Please try again later.",
    });
  }
}
