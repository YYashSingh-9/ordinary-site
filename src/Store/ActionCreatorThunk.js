import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// FETCH TEMPLATE FUNCTION _____
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
      Authorization: `Bearer ${cookie}`,
      "Content-type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      cookie: `jwt=${cookie}`,
    },
    body: sending_data,
    redirect: "follow",
  });
  const doc2 = await doc.json();
  console.log(doc2);
  return doc2;
};
//_________________

// FETCH TEMPLATE FUNCTION USE-CASES___
export const favToggler = async (data, route) => {
  data = { isFav: data };
  console.log(data, route);
  await dataSendRequest("products", route, "PATCH", data, "");
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
    const returned_val = await dataSendRequest(
      "user",
      "login",
      "POST",
      dataToSend
    );
    console.log(returned_val);
    return returned_val;
  }
  if (intent.length > 10) {
    let dataToSend = { ...doc2 };
    const returned_val =
      dataToSend.name &&
      (await dataSendRequest("user", "update-me", "PATCH", dataToSend, intent));

    const returned_val_PW =
      dataToSend.password &&
      (await dataSendRequest(
        "user",
        "updatePassword",
        "PATCH",
        dataToSend,
        intent
      ));

    const finalVal = returned_val ? returned_val : returned_val_PW;
    return finalVal;
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
