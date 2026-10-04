import { Link, Navigate, useLocation } from "react-router-dom";
import { ErrorCode, StyledNotFound } from "./NotFound.styled";

const errorInfo = (status) => {
  switch (status) {
    case 404:
      return {
        status,
        title: "Page not found",
        message:
          "We couldn't find what you were looking for. It may have been deleted, or the link may be wrong.",
        action: "home",
      };
    case 503:
      return {
        status,
        title: "Can't connect",
        message:
          "We can't reach the server right now. Check your connection or try again later.",
        action: "retry",
      };
    case 401:
      return {
        status,
        title: "Please log in",
        message:
          "You need to be logged in to see this, or your session has expired.",
        action: "login",
      };
    case 500:
      return {
        status,
        title: "Something went wrong",
        message:
          "Something broke on our end. It's not your fault. Please try again in a few minutes.",
        action: "retry",
      };
    default:
      return {
        status,
        title: "Something went wrong",
        message: "An unexpected error occurred. Please try again.",
        action: "retry",
      };
  }
};

export const NotFound = () => {
  const { state } = useLocation();
  console.log(state);

  if (!state) return <Navigate to="/" />;

  const { status, title, message, action } = errorInfo(state.code);

  return (
    <StyledNotFound>
      <h1>Error!</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 512 512"
      >
        <path
          d="M403.748 77.219c-11.097-17.804-36.999-17.777-48.074 0l-71.866 115.328c-22.009-19.191-50.393-30.095-80.411-30.095-67.623 0-122.638 55.015-122.638 122.638 0 4.052.189 8.025.567 11.878-41.553.146-75.313 33.992-75.313 75.578 0 41.675 33.904 75.578 75.578 75.578h306.095c41.675 0 75.578-33.904 75.578-75.578 0-35.399-25.099-66.252-59.186-73.831 1.352-7.361 1.512-14.291.785-21.095h72.742c10.44 0 19.697-5.45 24.764-14.578s4.796-19.867-.725-28.724zm-10.293 224.14a4.9 4.9 0 0 0 .649 3.944 4.9 4.9 0 0 0 3.37 2.149c31.92 4.765 55.989 32.748 55.989 65.093 0 36.268-29.507 65.775-65.775 65.775H81.592c-36.268 0-65.775-29.507-65.775-65.775s29.507-65.775 65.775-65.775c1.647 0 3.243.05 4.837.203 1.503.165 2.996-.409 4.035-1.508s1.513-2.616 1.283-4.112c-.785-5.143-1.185-10.614-1.185-16.265 0-62.216 50.618-112.835 112.835-112.835 28.16 0 54.678 10.528 75.086 28.837l-20.705 33.226c-5.521 8.858-5.794 19.596-.728 28.724 5.067 9.128 14.324 14.578 24.764 14.578H395.04c.978 8.568.297 16.569-1.585 23.741m100.344-43.075c-3.312 5.969-9.367 9.533-16.193 9.533H281.814c-6.826 0-12.878-3.564-16.193-9.533-3.312-5.969-3.135-12.991.476-18.783l97.896-157.099c7.24-11.618 24.178-11.645 31.436 0l97.896 157.099c3.609 5.795 3.786 12.815.474 18.783"
          data-original="#000000"
        />
        <path
          d="M382.623 119.248H376.8c-10.72 0-19.22 9.082-18.512 19.778l2.913 43.91c.644 9.714 8.774 17.323 18.51 17.323 9.738 0 17.868-7.611 18.512-17.323l2.913-43.908v-.002c.706-10.691-7.794-19.778-18.513-19.778m-2.913 71.208c-4.59 0-8.424-3.588-8.728-8.168l-2.913-43.91c-.331-5.036 3.644-9.327 8.731-9.327h5.823c5.077 0 9.063 4.282 8.728 9.328l-2.913 43.909c-.301 4.58-4.135 8.168-8.728 8.168m0 20.407c-11.294 0-20.484 9.19-20.484 20.484 0 11.296 9.19 20.487 20.484 20.487 11.296 0 20.487-9.19 20.487-20.487 0-11.293-9.191-20.484-20.487-20.484m0 31.168c-5.89 0-10.681-4.794-10.681-10.684s4.791-10.681 10.681-10.681 10.684 4.791 10.684 10.681c0 5.891-4.794 10.684-10.684 10.684m-127.35-87.776a4.902 4.902 0 0 0 7.261-6.587l-52.445-57.789a4.901 4.901 0 1 0-7.261 6.587zm20.158-16.888a4.903 4.903 0 0 0 9.392-2.81l-12.792-42.79c-.773-2.592-3.509-4.078-6.101-3.291a4.903 4.903 0 0 0-3.291 6.101z"
          data-original="#000000"
        />
      </svg>
      <h2>{title}</h2>
      <p>{message}</p>
      <Link to="/">Back to home</Link>
      {status && <ErrorCode>Error code: {status}</ErrorCode>}
    </StyledNotFound>
  );
};
