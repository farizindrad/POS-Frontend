import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/menu", { replace: true });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-lg text-gray-600">
        Kamu akan diarahkan ke halaman utama dalam{" "}
        <span className="font-semibold text-blue-600">{countdown}</span> detik...
      </p>
    </div>
  );
};

export default NotFound;
