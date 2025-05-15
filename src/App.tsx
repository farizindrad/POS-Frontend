import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import MenuTable from "./components/Menu/MenuTable";
import CreateProduct from "./components/Menu/CreateProduct";
import './App.css'
import Logo from './assets/Logo.png';
import Transaction from "./components/Transaction/Transaction";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white pt-4">
        <div className="flex items-center space-x-3 pl-16">
          <img src={Logo} alt="Logo" className="h-15 w-auto" />
          <h1 className="text-3xl font-bold">Alan Resto</h1>
        </div>
        <nav className="mt-2 py-4 bg-white text-black pl-16">
          <ul className="flex space-x-16 font-bold text-2xl">
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `hover:underline hover:text-blue-500 underline-offset-16 ${
                    isActive ? "text-blue-500 underline" : ""
                  }`
                }
              >
                Food
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  `hover:underline hover:text-blue-500 underline-offset-16 ${
                    isActive ? "text-blue-500 underline" : ""
                  }`
                }
              >
                Transaksi
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="px-16 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<MenuTable />} />
          <Route path="/menu/create" element={<CreateProduct />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">
        Alan Resto © 2025 | Developed by Alan Creative
      </footer>
    </div>
  );
};

export default App;
