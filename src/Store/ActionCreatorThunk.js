import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// FETCH TEMPLATE FUNCTION _____
export const fetchFunction = async (type, cookie, additional) => {
  let url = `http://127.0.0.1:3000/api/v2/${type}`;
  additional ? (url += `/${additional}`) : "";
  if (!cookie) {
    const doc = await fetch(url);
    const doc2 = await doc.json();
    return doc2;
  }
  if (cookie) {
    console.log("this ran");
    const doc = await fetch(url, {
      credentials: "include",
      withCredentials: true,
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        cookie: `jwt=${cookie}`,
      },
      redirect: "follow",
    });
    const doc2 = await doc.json();

    return doc2;
  }
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
  if (intent === "signup") {
    console.log(doc2);
    const data = await dataSendRequest("user", "signup", "POST", doc2);
    return data;
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

  return doc3;
};
export const logoutSendFunction = async (cookie) => {
  const data = await dataSendRequest("user", "logout", "POST", "", cookie);
  return data;
};
export const addToCart_Function = async (userId, data, cookie) => {
  const dataToSend = {
    productId: data._id,
    user: userId,
    catagory: data.catagory,
    isFav: data.isFav,
    images: data.images,
    key: data.key,
    price: data.price,
    quantity: data.quantity,
    slug: data.slug,
    title: data.title,
    totalPrice: data.totalPrice,
  };
  const returnedData = await dataSendRequest(
    "cart",
    "",
    "POST",
    dataToSend,
    cookie
  );

  return returnedData;
};
export const cartProductsLoader = async (cookie) => {
  const dataReceived = await fetchFunction("cart", cookie);

  return dataReceived;
};
export const cartProductPATCH = async (data, cookie, patchtype) => {
  if (patchtype === "normal_patch") {
    const doc = await dataSendRequest("cart", "", "PATCH", data, cookie);
  } else if (patchtype.type === "delete_patch") {
    const docId = { _id: patchtype.id };

    const doc = await dataSendRequest(
      "cart",
      "delete_product",
      "DELETE",
      docId,
      cookie
    );
  }
};
export const placeOrder_Function = async (productIDs, cookie) => {
  const data_to_send = { ids: productIDs };
  const data = await dataSendRequest(
    "orders",
    "my-orders",
    "POST",
    data_to_send,
    cookie
  );
};
export const getMyOrders = async (cookie) => {
  const doc = await fetchFunction("orders", cookie, "my-orders");
  console.log(doc);
  return doc;
};
//1.Getting all the products from server.
export const loader = () => {
  return fetchFunction("products");
};
