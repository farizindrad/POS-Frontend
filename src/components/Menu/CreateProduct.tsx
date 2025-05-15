import React, { useState } from "react";
import { formatCurrency } from "../../utils/format"; 
import DragDropUpload from "./DragDropUpload"; 
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<string | "">(""); 
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const parseNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumber(rawValue);
    const formatted = numericValue ? formatCurrency(Number(numericValue)) : "";
    setPrice(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const numericPrice = parseNumber(price);

    if (!productName || !numericPrice) {
      setMessage("Nama dan harga produk wajib diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("price", numericPrice); 
    if (photo) formData.append("photo", photo);

    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Produk berhasil ditambahkan");
        setProductName("");
        setPrice("");
        setPhoto(null);
        navigate("/menu");
      } else {
        setMessage(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan saat mengirim data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Tambah Produk Baru</h2>
      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">
          Nama Menu
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <div className="block mb-4">
          Foto Menu
          <DragDropUpload onFileSelect={setPhoto} />
        </div>

        <label className="block mb-2">
            Harga
            <div className="mt-1 flex rounded border border-gray-300 overflow-hidden">
                <span className="bg-blue-500 text-white px-3 flex items-center select-none">
                Rp.
                </span>
                <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="0"
                className="flex-grow px-3 py-2 border-t border-b border-r outline-none"
                required
                />
            </div>
        </label>

        <div className="text-right space-x-4">
          <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-lime-700 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          >
              {loading ? "Loading..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
