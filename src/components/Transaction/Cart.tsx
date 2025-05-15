import React, { useState } from "react";
import type { Product } from "./ProductList";
import ChargeModal from "./ChargeModal";
import Modal from "./Modal";
import Logo from '../../assets/Logo.png';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export interface CartItem extends Product {
  qty: number;
}

interface CartProps {
  items: CartItem[];
  onClear: () => void;
//   onSave: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({ items, onClear, total }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalBill, setShowModalBill] = React.useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

const handlePrint = () => {
    const printable = document.querySelector('.printable');
    if (printable) {
      printable.classList.remove('hidden');
  
      window.print();
  
      printable.classList.add('hidden');
    }
  };
  

  const handleChargeClick = () => {
    setShowModal(true);
  };

  const mappedItems = items.map(({ id, product_name, qty, photo_url, price }) => ({
    id,
    name: product_name,
    quantity: qty,
    image: photo_url,
    price,
  }));
  
  const handleSaveBill = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.id,
            quantity: item.qty,
          })),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save bill");
      }
      const data = await response.json();
      setTransactionId(data.transaction_id);
      setShowModalBill(true);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan bill");
    }
  };

  return (
    <>
      <div className="w-1/3 bg-white p-4 rounded shadow flex flex-col min-h-[500px]">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
          <span>🛒</span> Pesanan
        </h2>

        <div className="flex-grow overflow-auto mb-4">
          {mappedItems.length === 0 && <p>Belum ada pesanan</p>}
          {mappedItems.map(({ id, image, name, quantity, price }) => (
            <div key={id} className="flex justify-between mb-2 items-center">
            <img
              src={image}
              alt={name}
              className="w-22 h-22 object-cover rounded"
              />
              <div>
                {name} x {quantity}
              </div>
              <div className="text-blue-600">
                Rp. {(price * quantity).toLocaleString()}
              </div>
              </div>
          ))}
        </div>

        <button
          onClick={onClear}
          className="mb-2 border border-red-500 text-red-500 rounded px-3 py-1 hover:bg-red-50"
        >
          Clear Cart
        </button>
        <div className="flex gap-2 mb-2">
        <button
            onClick={handleSaveBill}
            className="flex-1 bg-green-600 text-white rounded py-2 hover:bg-green-700"
            >
            Save Bill
        </button>
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
          >
            Print Bill
          </button>
        </div>
        <button
          onClick={handleChargeClick}
          className="bg-blue-400 text-white rounded py-3 font-bold text-lg"
        >
          Charge Rp. {total.toLocaleString()}
        </button>
      </div>

      <div>
        <button onClick={() => setShowModal(true)}>Checkout</button>
        {showModal && (
            <ChargeModal
            total={total}
            onClose={() => setShowModal(false)}
            items={mappedItems}
            transactionId={transactionId}
            setTransactionId={setTransactionId}         
            />
        )}
      </div>
      {showModalBill && (
        <Modal
          show={showModalBill}
          onClose={() => setShowModalBill(false)}
        />
      )}
      <div className="printable hidden">
        <div className="flex items-center justify-center space-x-3">
          <img src={Logo} alt="Logo" className="h-15 w-auto" />
          <h1 className="text-3xl font-bold">Alan Resto</h1>
        </div>
        <div className="flex-grow overflow-auto mb-4">
          {mappedItems.length === 0 && <p>Belum ada pesanan</p>}
          {mappedItems.map(({ id, image, name, quantity, price }) => (
            <div key={id} className="flex justify-between mb-2 items-center">
            <img
              src={image}
              alt={name}
              className="w-22 h-22 object-cover rounded"
              />
              <div>
                {name} x {quantity}
              </div>
              <div className="text-blue-600">
                Rp. {(price * quantity).toLocaleString()}
              </div>
              </div>
          ))}
          <div>Total: Rp {total.toLocaleString()}</div>
        </div>
      </div>
    </>
  );
};

export default Cart;
