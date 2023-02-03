import Body from "../components/Body";
import ItemList from "../components/ItemList";
import { useCart } from "../contexts/CartProvider";

export default function StorePage() {
  const cart = useCart();

  return (
    <Body>
      <h1>Hi welcome to my store! Here's whats for sale:</h1>
      <ItemList />
    </Body>
  );
}
