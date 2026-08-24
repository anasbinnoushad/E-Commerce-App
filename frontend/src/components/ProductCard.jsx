function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded p-5 shadow">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-2 font-bold">₹ {product.price}</p>
      <p className="mt-1">Stock: {product.stock}</p>
      <button
        onClick={() => addToCart(product.id)}
        className="bg-black text-white px-4 py-2 mt-4 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
}
export default ProductCard;