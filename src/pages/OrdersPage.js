import { useEffect, useState } from "react";
import Body from "../components/Body";
import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";
import Spinner from "react-bootstrap/Spinner";

export default function OrdersPage() {
  const api = useApi();
  const [orders, setOrders] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    (async () => {
      let response = await api.get("/item");
      if (!response.ok) {
        setItems(null);
        setOrders(null);
        return;
      }
      setItems(response.body.data);

      response = await api.get("/order");
      if (!response.ok) {
        setOrders(null);
        return;
      }

      setOrders(response.body.data);
    })();
  }, [api]);

  return (
    <Body>
      <h1>Orders</h1>
      {orders === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {orders === null ? (
            <p>Could not retrieve orders.</p>
          ) : (
            <>
              {orders.length < 1 ? (
                <p>There are no orders to display.</p>
              ) : (
                <>
                  {orders.map((order) => {
                    return (
                      <>
                        <p>{order.attributes.item.title}</p>
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
        </>
      )}
    </Body>
  );
}
