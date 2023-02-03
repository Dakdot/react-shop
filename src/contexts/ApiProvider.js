import { createContext, useCallback, useContext, useMemo } from "react";
import ShopApiClient from "../ShopApiClient";

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = useMemo(() => new ShopApiClient(), []);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return useContext(ApiContext);
}
