import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchFunction = async () => {
  let url = `http://127.0.0.1:3000/api/v2/products`;
  const doc = await fetch(url);
  const doc2 = await doc.json();
  return doc2;
};
export const dataSendRequest = async (
  type,
  additional,
  methodtype,
  data_to_send
) => {
  let url = `http://127.0.0.1:3000/api/v2/${type}`;
  additional ? (url += `/${additional}`) : "";
  let sending_data = JSON.stringify(data_to_send);
  const doc = await fetch(url, {
    method: methodtype,
    headers: {
      "Content-type": "application/json",
    },
    body: sending_data,
  });
  const doc2 = await doc.json();
  console.log(doc2);
  return doc2;
};

export const favToggler = (data, route) => {
  data = { isFav: data };
  dataSendRequest("products", route, "PATCH", data);
};
//1.Getting all the products from server.
export const loader = () => {
  return fetchFunction("products");
};

export const action = async ({ request }) => {
  console.log("this works");
  let formData = await request.formData();
  let intent = formData.get("intent");
  console.log(intent);
  return intent;
};
