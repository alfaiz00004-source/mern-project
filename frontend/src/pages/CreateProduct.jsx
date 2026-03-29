import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";

function CreateProduct() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Product
        </h1>
        <ProductForm onSuccess={() => navigate("/products")} />
      </div>
    </div>
  );
}

export default CreateProduct;
