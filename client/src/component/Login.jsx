import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8001/auth/login";
  };

  return (
    <div>
      <a
        onClick={handleLogin}
        className="flex items-center justify-center border border-gray-300 rounded-md shadow-sm py-2 px-2 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FaGoogle className="w-5 h-5 mr-2" />
        Login with Google
      </a>
    </div>
  );
}
