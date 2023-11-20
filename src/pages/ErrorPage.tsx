import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "";

  if (typeof error === "object" && error !== null) {
    if ("statusText" in error && typeof error.statusText === "string") {
      errorMessage = error.statusText;
    }
    if ("message" in error && typeof error.message === "string") {
      errorMessage = error.message;
    }
  }

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
