import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteGardenButton({ user }) {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const url = `http://localhost:8001/private/delete_garden/${params.id}`;
      const response = await axios.delete(url, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        navigate("/", {
          state: { type: "success", message: "Garden deleted successfully!" },
        }); // Redirect
      }
    } catch {
      console.log("error", error);
    }
  };
  return (
    <div>
      <button
        className="block mx-auto px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={handleDelete}
      >
        Delete Garden
      </button>
    </div>
  );
}
