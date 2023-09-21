import { createSlice, current } from "@reduxjs/toolkit";
import image1 from "../assets/products/PlainPerfume.png";
import image2 from "../assets/products/EauDeTollete.png";
import image3 from "../assets/products/EauDeTollete_2.png";
import image4 from "../assets/products/EauDeTollete_3.png";
import image5 from "../assets/products/serumOne.png";
import image6 from "../assets/products/serumTwo.png";
import image7 from "../assets/products/serumThree.png";
import image8 from "../assets/products/serumFour.png";
import image9 from "../assets/products/serumFive.png";
import image10 from "../assets/products/serumSix.png";
import image11 from "../assets/products/serumSeven.png";
import image12 from "../assets/products/serumEight.png";
import image13 from "../assets/products/serumNine.png";
import image14 from "../assets/products/serumTen.png";
import image15 from "../assets/products/serumEleven.png";
import image16 from "../assets/products/serumTwelve.png";
import image17 from "../assets/products/Cleaner.png";
import image18 from "../assets/products/HairMask.png";
import image19 from "../assets/products/HairCreme.png";
import image20 from "../assets/products/DarkShampoo.png";

const NavigationItems = [
  {
    title: "Catalogue",
    url: "catalogue",
    key: 1,
    submenu: [
      {
        title: "Hair",
        url: "catalogue/Hair",
        key: 1.1,
      },
      {
        title: "Fragrences",
        url: "catalogue/Fragrences",
        key: 1.2,
      },
      {
        title: "Serums",
        url: "catalogue/Skincare",
        key: 1.2,
      },
    ],
  },
  { title: "Best sellers", url: "bestsellers", key: 2 },
  { title: "About Two Fragrences", url: "about", key: 3 },
  { title: "Blog", url: "blog", key: 4 },
];
const allProducts = [
  {
    key: 1,
    title: "PlainPerfume",
    price: 3.2,
    images: image1,
    isFav: false,
    catagory: "Fragrences",
    quantity: 1,
  },
  {
    key: 2,
    title: "EauDeTollete",
    price: 3.5,
    images: image2,
    isFav: false,
    catagory: "Fragrences",
    quantity: 1,
  },
  {
    key: 3,
    title: "EauDeTollete_2",
    price: 3,
    images: image3,
    isFav: false,
    catagory: "Fragrences",
    quantity: 1,
  },
  {
    key: 4,
    title: "serumOne",
    price: 3,
    images: image4,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 5,
    title: "serumTwo",
    price: 4,
    images: image5,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },

  {
    key: 6,
    title: "serumThree",
    price: 3.7,
    images: image6,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 7,
    title: "serumFour",
    price: 3.2,
    images: image7,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 8,
    title: "serumFive",
    price: 3.1,
    images: image8,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 9,
    title: "serumSix",
    price: 3.4,
    images: image9,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 10,
    title: "serumSeven",
    price: 3.5,
    images: image10,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 11,
    title: "serumEight",
    price: 3.6,
    images: image11,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 12,
    title: "serumNine",
    price: 3.3,
    images: image12,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 13,
    title: "serumTen",
    price: 3.5,
    images: image13,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 14,
    title: "serumEleven",
    price: 3.8,
    images: image14,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 15,
    title: "serumTwelve",
    price: 4,
    images: image15,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 16,
    title: "Cleaner",
    price: 2,
    images: image16,
    isFav: false,
    catagory: "Skincare",
    quantity: 1,
  },
  {
    key: 17,
    title: "HairMask",
    price: 5,
    images: image17,
    isFav: false,
    catagory: "Hair",
    quantity: 1,
  },
  {
    key: 18,
    title: "HairCreme",
    price: 5,
    images: image18,
    isFav: false,
    catagory: "Hair",
    quantity: 1,
  },
  {
    key: 19,
    title: "EauDeTollete_3",
    price: 6,
    images: image19,
    isFav: false,
    catagory: "Fragrences",
    quantity: 1,
  },
  {
    key: 20,
    title: "DarkShampoo",
    price: 6,
    images: image20,
    isFav: false,
    catagory: "Hair",
    quantity: 1,
  },
];

const initialState_one = {
  navItems: NavigationItems,
  arrayOfProducts: allProducts,
  catalogueState: false,
  FavouriteItems: [],
  CartTotal: 0,
  DiscountPrice: 0,
  TotalMrp: 0,
  isCartEmpty: true,
  searchModal: false,
  AddToCart_Array: [],
};

const StoreSlice = createSlice({
  name: "SliceOne",
  initialState: initialState_one,
  reducers: {
    CatalogueToggler(state, action) {
      // if (action.payload === "done") {
      //   state.catalogueState = false;
      //   console.log(action, state.catalogueState);
      //   return;
      // }
      action.payload !== "removeSubMenu"
        ? (state.catalogueState = !state.catalogueState)
        : (state.catalogueState = false);
    },
    FavouriteToggler(state, action) {
      const id_Passed = action.payload;
      let ProductId = state.arrayOfProducts.findIndex((elem) => {
        return elem.key === id_Passed;
      });
      const AlteredArray = [...state.arrayOfProducts];
      const favState = !state.arrayOfProducts[ProductId].isFav;
      AlteredArray[ProductId] = {
        ...state.arrayOfProducts[ProductId],
        isFav: favState,
      };
      state.arrayOfProducts = AlteredArray;
      state.isCartEmpty = false;
    },
    searchModalToggler(state, action) {
      state.searchModal = !state.searchModal;
    },
    AddItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.AddToCart_Array.find(
        (elem) => elem.key === newItem.key
      );
      let price_per_product;
      if (!existingItem) {
        state.AddToCart_Array.push({
          key: newItem.key,
          title: newItem.title,
          price: newItem.price,
          images: newItem.images,
          isFav: newItem.isFav,
          catagory: newItem.catagory,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
        });
        price_per_product = newItem.price * newItem.quantity;
        state.TotalMrp = state.TotalMrp + price_per_product;
        state.DiscountPrice = (state.TotalMrp * 15) / 100;
        state.CartTotal = state.TotalMrp - state.DiscountPrice;
      } else {
        existingItem.totalPrice += newItem.price;
        existingItem.quantity += newItem.quantity;
        price_per_product = existingItem.price * newItem.quantity;
        state.TotalMrp = state.TotalMrp + price_per_product;
        state.DiscountPrice = (state.TotalMrp * 15) / 100;
        state.CartTotal = state.TotalMrp - state.DiscountPrice;
      }
      console.log(current(state.AddToCart_Array));
    },
    RemoveItemfromCart(state, action) {
      const Item = action.payload;
    },
  },
});
export const actions = StoreSlice.actions;
export default StoreSlice;
