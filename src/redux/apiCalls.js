import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { privateRequest, publicRequest } from "../requestMethods";

const BASE_URL = process.env.REACT_APP_API_URL;

let serverStatus = null;
let lastCheckedTime = null;
const SERVER_STATUS_EXPIRATION_TIME = 60 * 1000; // Set the expiration time (e.g., 60 seconds)

// check if server is up
export const checkServer = async () => {
  const currentTime = Date.now();

  // Check if server status exists and is still valid based on expiration time
  if (
    serverStatus !== null &&
    currentTime - lastCheckedTime < SERVER_STATUS_EXPIRATION_TIME
  ) {
    return serverStatus;
  }

  try {
    const response = await publicRequest.get(`${BASE_URL}/status`);
    serverStatus = response;
    lastCheckedTime = currentTime;
    return response;
  } catch (err) {
    return err;
  }
};

export const googleLogin = async (dispatch) => {
  dispatch(loginStart());
  try {
    const currentUrl = window.location.origin;
    const encodedParam = encodeURI(`?redirectUrl=${currentUrl}`);
    window.open(`${BASE_URL}/auth/google${encodedParam}`, "_self");
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const facebookLogin = async (dispatch) => {
  dispatch(loginStart());
  try {
    const currentUrl = window.location.origin;
    const encodedParam = encodeURI(`?redirectUrl=${currentUrl}`);
    window.open(`${BASE_URL}/auth/facebook${encodedParam}`, "_self");
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const userLogout = async (dispatch) => {
  try {
    const response = await publicRequest.post(`/auth/logout`);
    console.log(response.data.message);
    dispatch(logout());
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getCurrentUser = async (dispatch) => {
  try {
    const response = await publicRequest.get("/auth/currentUser");
    if (response.status === 200) {
      // console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      // add a timer to localStorage 24 hours
      const expirationTime = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      );
      const expirationTimeLong = expirationTime.getTime();
      localStorage.setItem("expirationTime", expirationTimeLong);
      dispatch(loginSuccess(response.data));
    } else {
      dispatch(loginFailure());
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};

// get image
// export const getImageById = (id) => {
//   // console.log("getImageById");
//   try {
//     // const response = await publicRequest.get(`/images/${id}`);
//     const url = `${BASE_URL}/images/${id}`;
//     return url;
//   } catch (err) {
//     return err;
//   }
// };

// get Delivery Charges
export const getDeliveryCharges = async () => {
  // console.log("getDeliveryCharges");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/configs/delivery_charges");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== HOME PAGE ======
// get featured products
export const getFeaturedProducts = async () => {
  // console.log("getFeaturedProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/featuredProducts");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get latest 5 discounts
export const getLatestDiscounts = async () => {
  // console.log("getLatestDiscounts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/products/discounts?new=true");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// get latest 10 products
export const getLatestProducts = async () => {
  // console.log("getLatestProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/products/?new=true");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        // return error message
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// get random products
export const getRandomProducts = async () => {
  // console.log("getRandomProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/products/random");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        // return error message
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// get orders made today
export const getTodayOrders = async () => {
  // console.log("getTodayOrders");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders/today");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  } else {
    console.log("Server is down");
    return "";
  }
};

// get todays accepted orders
export const getTodayAcceptedOrders = async () => {
  // console.log("getTodayAcceptedOrders");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders/today/approved");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  } else {
    console.log("Server is down");
    return "";
  }
};

// ====== PRODUCTS ======
// get products
export const getProducts = async () => {
  // console.log("getProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/products");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get products by category
export const getProductsByCategory = async (id) => {
  // console.log("getProductsByCategory");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/products/category/" + id);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        // return error message
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// get products by brand
export const getProductsByBrand = async (id) => {
  // console.log("getProductsByBrand");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/products/brand/" + id);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        // return error message
        return null;
      }
    } catch (error) {
      return null;
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// search products
export const searchProducts = async (search) => {
  // console.log("searchProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/products/search/${search}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get product by id
export const getProductById = async (id) => {
  // console.log("getProductById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/products/${id}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

// get products with discounts
export const getDiscountedProducts = async () => {
  // console.log("getDiscountedProducts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/products/discounts");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== CATEGORY ======
// get categories
export const getCategories = async () => {
  // console.log("getCategories");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/categories");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get top categories
export const getTopCategories = async () => {
  // console.log("getCategories");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/categories/top");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// search categories
export const searchCategories = async (search) => {
  // console.log("searchCategories");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/categories/search/${search}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// get category by id
export const getCategoryById = async (id) => {
  // console.log("getCategoryById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/categories/${id}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

// ====== BRANDS ======
// get brands
export const getBrands = async () => {
  // console.log("getBrands");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/brands");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// get brands for home page
export const getLimitedBrands = async () => {
  // console.log("getLimitedBrands");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/brands?limit=9");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// get brand by id
export const getBrandById = async (id) => {
  // console.log("getBrandById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/brands/${id}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// search brands by name
export const searchBrands = async (search) => {
  // console.log("searchBrands");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/brands/search/${search}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== ORDERS ======
// Create order
export const createOrder = async (order) => {
  console.log("createOrder");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/orders/add", order);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get orders
export const getOrders = async () => {
  console.log("getOrders");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders");
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// get order by id
export const getOrderById = async (id) => {
  console.log("getOrderById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/orders/order/${id}`);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// search orders by id
export const searchOrdersById = async (id) => {
  console.log("searchOrdersById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/orders/search/${id}`);
      if (response.status === 200) {
        console.log(response);
        // convert res to array to be displayed in table
        var arr = [];
        arr.push(response.data);
        return arr;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get orders by status
export const getOrdersByStatus = async (status) => {
  console.log("getApprovedOrders");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/orders/status/${status}`);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== DISCOUNTS ======
// get discounts
export const getDiscounts = async () => {
  // console.log("getDiscounts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/discounts");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// search discounts
export const searchDiscounts = async (search) => {
  // console.log("searchDiscounts");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/discounts/search/${search}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
// get discount by id
export const getDiscountById = async (id) => {
  // console.log("getDiscountById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/discounts/${id}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== USERS ======
// get user by id
export const getUserById = async (id) => {
  // console.log("getUserById");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/users/${id}`);
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// update user
export const updateUser = async (id, user) => {
  // console.log("updateUser");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/users/update", {
        id,
        ...user,
      });

      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// delete user
export const deleteUser = async (id) => {
  console.log("deleteUser");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.delete(`/users/delete/${id}`);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// ====== Others ======
// get terms and conditions
export const getTnS = async () => {
  // console.log("getTnS");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/terms");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get privacy policy
export const getPrivacyPolicy = async () => {
  // console.log("getPrivacyPolicy");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/privacy");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get about us
export const getAboutUs = async () => {
  // console.log("getAboutUs");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/about");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};

// get Return and Refund Policy
export const getReturnRefund = async () => {
  // console.log("getReturnRefund");
  const st = serverStatus ? serverStatus.status : (await checkServer()).status;
  // console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/return");
      if (response.status === 200) {
        // console.log(response);
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};
