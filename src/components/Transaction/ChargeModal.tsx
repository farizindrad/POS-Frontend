import React, { useState } from "react";
import { formatCurrency } from "../../utils/format";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface ChargeModalProps {
    total: number;
    onClose: () => void;
    items: CartItem[];
    transactionId: string | null;
    setTransactionId: React.Dispatch<React.SetStateAction<string | null>>;
  }

const parseNumber = (value: string) => value.replace(/\D/g, "");

const ChargeModal: React.FC<ChargeModalProps> = ({ total, onClose, items, transactionId, setTransactionId, }) => {
  const [amountPaid, setAmountPaid] = useState<string | "">(""); 
  const [loading, setLoading] = useState(false);

  const numericAmount = amountPaid ? Number(parseNumber(amountPaid)) : 0;

  const change = numericAmount - total;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumber(rawValue);

    const formattedValue = numericValue ? formatCurrency(Number(numericValue)) : "";

    setAmountPaid(formattedValue);
  };

  const handlePay = async () => {
    if (numericAmount < total) {
      alert("Uang kurang!");
      return;
    }
    setLoading(true);

    try {
      if (!transactionId) {
        const response = await fetch(`${apiBaseUrl}/charge`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map(i => ({
              product_id: i.id,
              quantity: i.quantity,
            })),
            amount_paid: numericAmount,
          }),
        });

        if (!response.ok) {
          throw new Error("Gagal menyimpan bill");
        }
        const data = await response.json();
        setTransactionId(data.transaction_id);
      } else {
        const patchResponse = await fetch(`${apiBaseUrl}/charge`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: transactionId,
            amount_paid: numericAmount,
          }),
        });

        if (!patchResponse.ok) {
          throw new Error("Gagal melakukan pembayaran");
        }
      }

      alert("Pembayaran berhasil!");
      onClose();
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg flex gap-4">
        <div className="w-2/3">
          <h2 className="text-lg font-semibold mb-4">Detail Pesanan</h2>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Nama</th>
                <th className="border px-2 py-1">Foto</th>
                <th className="border px-2 py-1">Harga</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border text-center">{index + 1}</td>
                  <td className="border">{`${item.name} x ${item.quantity}`}</td>
                  <td className="border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="border text-right pr-2">
                    Rp. {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/3 flex flex-col justify-between">
          <div>
            <label className="mt-4 block font-semibold mb-1">Uang Pembeli (Rp)</label>
            <div className="mt-1 flex rounded border border-gray-300 overflow-hidden mb-2">
                <span className="bg-blue-500 text-white px-3 flex items-center select-none">
                Rp.
                </span>
                <input
                type="text"
                value={amountPaid}
                onChange={handleChange}
                placeholder="0"
                className="flex-grow px-3 py-2 outline-none"
                required
                />
            </div>
            <div className="flex gap-2 mb-2">
              <button
                onClick={onClose}
                className="flex-1 border border-gray-500 text-gray-600 py-1 rounded hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={handlePay}
                disabled={loading}
                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                {loading ? "Processing..." : "Pay!"}
              </button>
            </div>
            <p
              className={`text-sm font-semibold ${
                change > 0
                  ? "text-green-600"
                  : change < 0
                  ? "text-red-600"
                  : "text-gray-700"
              }`}
            >
              Kembalian:{" "}
              {change >= 0
                ? `Rp. ${formatCurrency(change)}`
                : `Uang kurang: Rp. ${formatCurrency(Math.abs(change))}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeModal;
