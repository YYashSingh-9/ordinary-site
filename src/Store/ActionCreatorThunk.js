import { QueryClient } from "@tanstack/react-query";

const data = {
  productId: "651559154575ed53d5513fe2",
  user: "65180dcdf7fb602bf80b66d5",
  key: 3,
  title: "EauDeTollete_2",
  price: 3,
  images: "EauDeTollete_2.png",
  isFav: false,
  catagory: "Fragrences",
  quantity: 1,
  totalPrice: 3,
};
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
  data_to_send,
  cookie
) => {
  let url = `http://127.0.0.1:3000/api/v2/${type}`;
  additional ? (url += `/${additional}`) : "";
  let sending_data = data_to_send ? JSON.stringify(data_to_send) : "";
  const doc = await fetch(url, {
    credentials: "include",
    withCredentials: true,
    method: methodtype,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      cookie: `${cookie}`,
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
export const login_Signup_Request = async ({ request }) => {
  const doc = await request.formData();
  const doc2 = Object.fromEntries(doc);
  const intent = doc.get("intent");
  let dataToSend;
  if (intent === "login") {
    dataToSend = {
      email: doc2.email,
      password: doc2.password,
    };
    const returned_val = dataSendRequest("user", "login", "POST", dataToSend);
    return returned_val;
  }
};
export const testCart = async (cookie) => {
  let url = `http://127.0.0.1:3000/api/v2/cart/`;

  let sending_data = JSON.stringify(data);
  const doc = await fetch(url, {
    credentials: "include",
    withCredentials: true,
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      cookie: `${cookie}`,
    },
    body: sending_data,
  });
  const doc3 = await doc.json();
  console.log(doc3);
  return doc3;
};
export const logoutSendFunction = async (cookie) => {
  const data = await dataSendRequest("user", "logout", "POST", "", cookie);
  return data;
};
//1.Getting all the products from server.
export const loader = () => {
  return fetchFunction("products");
};
