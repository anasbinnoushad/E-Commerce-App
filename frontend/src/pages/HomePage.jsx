import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await API.get(
        `products/?search=${search}&ordering=${ordering}&page=${page}`
      );
      setProducts(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
    } catch (error) {
      console.log(error);
    }
  }, [search, ordering, page]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const addToCart = async (productId) => {
    try {
      await API.post("cart/add/", {
        product_id: productId,
        quantity: 1
      });
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Login required");
    }
  };
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Products</h1>
      <div className="flex gap-5 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2"
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
        >
          <option value="">Default</option>
            <option value="price">Price Low to High</option>
          <option value="-price">Price High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      <div className="flex gap-5 mt-10">
        <button
          disabled={!previousPage}
          onClick={() => setPage(page - 1)}
          className="bg-black text-white px-4 py-2 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          disabled={!nextPage}
          onClick={() => setPage(page + 1)}
          className="bg-black text-white px-4 py-2 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default HomePage;
