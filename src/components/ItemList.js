import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useApi } from "../contexts/ApiProvider";
import Item from "./Item";

export default function ItemList() {
  const [items, setItems] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get("/item");
      if (response.ok) {
        setItems(response.body.data);
      } else {
        setItems(null);
      }
    })();
  }, [api]);

  return (
    <>
      {items === undefined ? (
        <Spinner animation="border" role="status" />
      ) : (
        <>
          {items === null ? (
            <p>Could not load items.</p>
          ) : (
            <>
              {items.length < 1 ? (
                <p>There are no items for sale.</p>
              ) : (
                <>
                  {items.map((item) => (
                    <Item item={item} key={item.id} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
