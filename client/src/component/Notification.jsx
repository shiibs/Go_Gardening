import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification({ type, message }) {
  const notify = (message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {notify(message)}
    </div>
  );
}
