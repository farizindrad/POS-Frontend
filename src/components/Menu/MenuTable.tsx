import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/format"; 
import { useNavigate } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

type MenuItem = {
  id: number;
  product_name: string;
  photo_url: string;
  price: number;
};

const MenuTable: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/products`); 
        const result = await response.json();
        setMenuItems(result.data);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <>
    <div className="max-w-6xl mx-auto my-8 rounded-lg">
        <h2 className="text-gray-600">Tambahkan menu makanan yang ada di resto</h2>
    </div>
    <div className="max-w-6xl mx-auto my-8 bg-white shadow rounded-lg p-6">
      <button
        onClick={() => navigate("/menu/create")}
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + Tambah Menu
      </button> 
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto ">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="pl-4 py-2">#</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Harga</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, index) => (
                <tr key={item.id} className="odd:bg-gray-50 even:bg-white">
                <td className="pl-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.product_name}</td>
                <td className="px-4 py-2">
                    <img
                    src={item.photo_url}
                    alt={item.product_name}
                    className="h-12 w-12 object-cover rounded"
                    />
                </td>
                <td className="px-4 py-2">Rp. {formatCurrency(item.price)}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default MenuTable;
