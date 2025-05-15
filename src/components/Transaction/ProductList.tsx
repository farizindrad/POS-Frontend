import React from "react";

export interface Product {
  id: string;
  product_name: string;
  photo_url: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-2/3">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => onSelect(product)}
          className="cursor-pointer bg-white shadow rounded text-center hover:bg-gray-100"
        >
          <img
            src={product.photo_url}
            alt={product.product_name}
            className="h-50 w-full object-cover rounded"
          />
          <h3 className="mt-8 font-semibold">{product.product_name}</h3>
          <p className="mb-8 text-blue-600">
            Rp. {product.price.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
