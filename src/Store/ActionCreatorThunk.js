import { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const queryClient = new QueryClient();

export const fetchFunction = async (signal) => {
  const doc = await fetch("http://127.0.0.1:3000/api/v2/products/");
  const doc2 = await doc.json();
  console.log(doc2);
  return doc2;
};
//1.Getting all the products from server.
export const loader = () => {
  return fetchFunction();
};

// export const loader = () => {
//   const dispatch = useDispatch();
//   dispatch(getAllProducts());
// };
