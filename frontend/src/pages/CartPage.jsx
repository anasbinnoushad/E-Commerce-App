import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
function CartPage() {
  const [cart, setCart] = useState(null);
  const fetchCart = async () => {
    try {
      const response = await API.get("cart/");
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.post("cart/update/", {
        item_id: itemId,
        quantity: quantity
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (itemId) => {
    try {
      await API.post("cart/remove/", {
        item_id: itemId
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const placeOrder = async () => {
    try {
      const response = await API.post("orders/place/");
      toast.success(response.data.message);
      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Order failed");
    }
  };
  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product_price * item.quantity);
    }, 0);
  };
    if (!cart) {
    return <h1 className="p-10">Loading...</h1>;
  }
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">My Cart</h1>
      {cart.items.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
          <>
          <div className="space-y-5">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="border p-5 rounded flex justify-between items-center"
            >
                <div>
                    <h2 className="text-2xl font-bold">{item.product_name}</h2>
                    <p>₹ {item.product_price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="border p-2 w-20"
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                        />
                        <button
                            onClick={() => removeItem(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-10">
            <h2 className="text-3xl font-bold">Total: ₹ {calculateTotal()}</h2>
            <button
             onClick={placeOrder}
             className="bg-green-600 text-white px-6 py-3 mt-5 rounded"
             >
                Place Order
             </button>
        </div>
    </>
    )}
</div>
);
}

export default CartPage;
