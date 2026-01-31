import { useNavigate } from "react-router-dom";
const navigate = useNavigate();


function ProductCard({ product, onAddToCart, isLoggedIn }) {
  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Please login to add product to cart");
      navigate("/login");
    return;
    }
    onAddToCart(product._id);
  };



  return (
    <div style={{ border: "1px solid #ccc", padding: 10, width: 220 }}>
      <img
        src={product.image}
        alt={product.name}
        width="200"
        height="150"
      />

      <h4>{product.name}</h4>
      <p>{product.description}</p>

      <p>Rating: ★ {product.rating}</p>
      <p>Price: ₹{product.price}</p>

      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
