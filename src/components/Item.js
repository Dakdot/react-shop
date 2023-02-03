import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";

export default function Item({ item }) {
  const api = useApi();
  const flash = useFlash();

  const onOrderClick = async () => {
    let response = await api.post("/order", {
      item: item.id,
      quantity: 1,
    });

    if (!response.ok) {
      flash(
        "There was an error and your order could not be submitted. Please try again.",
        "danger"
      );
      return;
    }

    flash("Your order was placed, thanks!", "success");
  };

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-2">
        <Card.Body>
          {/*<Card.Img
            variant="top"
            src="https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg"
  ></Card.Img>*/}
          <Card.Title>{item.attributes.title}</Card.Title>
          <Card.Text>
            {(item.attributes.price_cents / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Card.Text>
          <Card.Text className="text-secondary">
            {item.attributes.description}
          </Card.Text>

          <Button variant="primary" className="me-2">
            View Item
          </Button>
          {item.attributes.stock > 1 ? (
            <Button variant="outline-secondary" onClick={onOrderClick}>
              Order
            </Button>
          ) : (
            <Button variant="outline-danger" disabled>
              Out of Stock
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
