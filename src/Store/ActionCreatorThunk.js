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
      credentials: "include",
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
//1.Getting all the products from server.
export const loader = () => {
  return fetchFunction("products");
};
