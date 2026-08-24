import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
function MerchantProductsPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);
  const fetchProducts = async () => {
    try {
      const response = await API.get("products/my_products/");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`products/${editingId}/`, formData);
        toast.success("Product updated");
      } else {
        await API.post("products/", formData);
        toast.success("Product created");
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Operation failed");
    }
  };
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
          name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`products/${id}/`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Manage Products</h1>
      <form onSubmit={handleSubmit} className="border p-5 rounded mb-10 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 w-full"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="border p-2 w-full"
          value={formData.stock}
          onChange={handleChange}
        />
        <button className="bg-black text-white px-6 py-2 rounded">
          {editingId ? "Update Product" : "Create Product"}
        </button>
      </form>
      <div className="space-y-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-5 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p>₹
 {product.price}</p>
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MerchantProductsPage;
