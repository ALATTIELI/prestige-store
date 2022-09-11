import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { privateRequest, publicRequest } from "../requestMethods";

const BASE_URL = process.env.REACT_APP_API_URL;

// check if server is up
export const checkServer = async () => {
  try {
    const response = await publicRequest.get(`${BASE_URL}/status`);
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
      console.log(response);
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
// ====== HOME PAGE ======
// get latest users
export const getLatestUsers = async () => {
  console.log("getLatestUsers");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/users/?new=true");
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        return new Error(response.data.message);
      }
    } catch (error) {
      return new Error(error);
    }
  } else {
    console.log("Server is down");
    return null;
  }
};

// get latest orders
export const getLatestOrders = async () => {
  console.log("getLatestOrders");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders/?new=true");
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        // return error message
        return new Error(response.data.message);
      }
    } catch (error) {
      return new Error(error);
    }
  } else {
    console.log("Server is down");
    return "Server is down";
  }
};

// get orders made today
export const getTodayOrders = async () => {
  console.log("getTodayOrders");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders/today");
      if (response.status === 200) {
        console.log(response);
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
  console.log("getTodayAcceptedOrders");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/orders/today/approved");
      if (response.status === 200) {
        console.log(response);
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
  console.log("getProducts");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/products");
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

// search products
export const searchProducts = async (search) => {
  console.log("searchProducts");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/products/search/${search}`);
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
// ====== NEW PRODUCT ======
// create new product
export const createProduct = async (product) => {
  console.log("createProduct");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post(
        "/products/add",
        product,
        (Headers = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      );

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
// get product by id
export const getProductById = async (id) => {
  console.log("getProductById");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/products/${id}`);
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
// update product
export const updateProduct = async (id, product) => {
  console.log("updateProduct");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post(`/products/update`, {
        id,
        ...product,
      });
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
// delete product
export const deleteProduct = async (id) => {
  console.log("deleteProduct");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.delete(`/products/${id}`);
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

// ====== CATEGORY ======
// get categories
export const getCategories = async () => {
  console.log("getCategories");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/categories");
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

// search categories
export const searchCategories = async (search) => {
  console.log("searchCategories");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/categories/search/${search}`);
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
// get category by id
export const getCategoryById = async (id) => {
  console.log("getCategoryById");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/categories/${id}`);
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
// create new category
export const createCategory = async (category) => {
  console.log("createCategory");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/categories/add", category);
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
// update category
export const updateCategory = async (id, category) => {
  console.log("updateCategory");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post(`/categories/update`, {
        id,
        ...category,
      });
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
// delete category
export const deleteCategory = async (id) => {
  console.log("deleteCategory");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.delete(`/categories/${id}`);
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

// ====== BRANDS ======
// get brands
export const getBrands = async () => {
  console.log("getBrands");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/brands");
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
// get brand by id
export const getBrandById = async (id) => {
  console.log("getBrandById");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/brands/${id}`);
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
// search brands by name
export const searchBrands = async (search) => {
  console.log("searchBrands");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get(`/brands/search/${search}`);
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
// create new brand
export const createBrand = async (brand) => {
  console.log("createBrand");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/brands/add", brand);
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
// update brand
export const updateBrand = async (id, brand) => {
  console.log("updateBrand");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post(`/brands/update`, {
        id,
        ...brand,
      });
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
// delete brand
export const deleteBrand = async (id) => {
  console.log("deleteBrand");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.delete(`/brands/${id}`);
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

// ====== ORDERS ======
// get orders
export const getOrders = async () => {
  console.log("getOrders");
  var st = await checkServer().then((res) => res.status);
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
  var st = await checkServer().then((res) => res.status);
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
  var st = await checkServer().then((res) => res.status);
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
  var st = await checkServer().then((res) => res.status);
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
// update order status
export const updateOrderStatus = async (id, status) => {
  console.log("updateOrderStatus");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post(`/orders/update`, {
        id,
        status,
      });
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
  console.log("getDiscounts");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/discounts");
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

// search discounts
export const searchDiscounts = async (search) => {
  console.log("searchDiscounts");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/discounts/search/${search}`);
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
// get discount by id
export const getDiscountById = async (id) => {
  console.log("getDiscountById");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/discounts/${id}`);
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
// create discount
export const createDiscount = async (discount) => {
  console.log("createDiscount");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/discounts/add", ...discount);
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
// update discount
export const updateDiscount = async (id, discount) => {
  console.log("updateDiscount");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/discounts/update", {
        id,
        ...discount,
      });
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
// delete discount
export const deleteDiscount = async (id) => {
  console.log("deleteDiscount");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.delete(`/discounts/${id}`);
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

// ====== USERS ======
// get users
export const getUsers = async () => {
  console.log("getUsers");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/users");
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
// get user by id
export const getUserById = async (id) => {
  console.log("getUserById");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/users/${id}`);
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

// search users by email
export const searchUsersByEmail = async (email) => {
  console.log("searchUsersByEmail");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/users/search/${email}`);
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
// update user
export const updateUser = async (id, user) => {
  console.log("updateUser");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/users/update", {
        id,
        ...user,
      });

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

// get admins
export const getAdmins = async () => {
  console.log("getAdmin");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/admins");
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

// search admins by email
export const searchAdminsByEmail = async (email) => {
  console.log("searchAdminsByEmail");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(`/admins/search/${email}`);
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

// get blocked users
export const getBlockedUsers = async () => {
  console.log("getBlockedUsers");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get("/users/blocked");
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
// block user
export const blockUser = async (id) => {
  console.log("blockUser");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/users/block", { id });
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
// unblock user
export const unblockUser = async (id) => {
  console.log("unblockUser");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/users/unblock", { id });
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

// delete user
export const deleteUser = async (id) => {
  console.log("deleteUser");
  var st = await checkServer().then((res) => res.status);
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
// make user admin
export const makeUserAdmin = async (email) => {
  console.log("makeUserAdmin");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/admins/add", { email });
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
// remove admin
export const removeAdmin = async (email) => {
  console.log("removeAdmin");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.post("/admins/remove", { email });
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
// search blocked users by email
export const searchBlockedUsersByEmail = async (email) => {
  console.log("searchBlockedUsersByEmail");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await privateRequest.get(
        `/users/blocked/search/${email}`
      );
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
  console.log("getTnS");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/terms");
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

// update terms and conditions
export const updateTnS = async (data) => {
  try {
    const response = await privateRequest.post("/tns/update", {
      name: "terms",
      ...data,
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// get privacy policy
export const getPrivacyPolicy = async () => {
  console.log("getPrivacyPolicy");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/privacy");
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

// update privacy policy
export const updatePrivacyPolicy = async (data) => {
  try {
    const response = await privateRequest.post("/tns/update", {
      name: "privacy",
      ...data,
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// get about us
export const getAboutUs = async () => {
  console.log("getAboutUs");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/about");
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

// update about us
export const updateAboutUs = async (data) => {
  try {
    const response = await privateRequest.post("/tns/update", {
      name: "about",
      ...data,
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// get Return and Refund Policy
export const getReturnRefund = async () => {
  console.log("getReturnRefund");
  var st = await checkServer().then((res) => res.status);
  console.log(st);
  if (st === 200) {
    try {
      const response = await publicRequest.get("/tns/name/return");
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

// update Return and Refund Policy
export const updateReturnRefund = async (data) => {
  try {
    const response = await privateRequest.post("/tns/update", {
      name: "return",
      ...data,
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
