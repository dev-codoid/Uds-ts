import axios from "axios";
import {
  adminLogin,
  forgotpassword,
  OtpVerifyapi,
  UpdatePasswordapi,
} from "../Api/Api";
import { toast } from "react-toastify";
export const postAdminLogin = async (data) => {
  try {
    const response = await axios.post(adminLogin, data);
    return response.data;
  } catch (e) {
    console.log(e, "error");
    toast.error(e.response.data.status.message);
  }
};

export const postforgotpassword = async (data) => {
  try {
    const response = await axios.post(forgotpassword, data);
    return response.data;
  } catch (e) {
    console.log(e, "error");
    toast.error(e.response.data.status.message);
  }
};

export const postotpverifications = async (data) => {
  try {
    const response = await axios.post(OtpVerifyapi, data);
    return response.data;
  } catch (e) {
    console.log(e, "error");
    toast.error(e.response.data.status.message);
  }
};

export const putcreatepasswordDetails = async (payload) => {
  try {
    const response = await axios.put(UpdatePasswordapi, payload.data);
    return response.data;
  } catch (e) {
    console.log(e, "error2");
    if (e.response.data.status.code === 401) {
      toast.error("Error occured please login");
    } else {
      toast.error(e.response.data.status.message);
    }
  }
};

export const getAPICallFunction = async (payload) => {
  try {
    const response = await axios.get(
      payload.url + `${payload.id ? payload.id : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TicketsToken")}`,
        },
        params: {
          ...payload?.payload,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status.code === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(e.response.data.status.message);
    }
  }
};
export const getApiQrCodeFunction = async (payload) => {
  try {
    const response = await axios.get(
      payload.url + `${payload.id ? payload.id : ""}`,
      {
        params: {
          ...payload?.payload,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status.code === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(e.response.data.status.message);
    }
  }
};
export const getApiQrCodeclientFunction = async (payload) => {
  console.log(payload, "kdasjdhjklaskdjas");
  try {
    const response = await axios.get(
      payload.url + `${payload.id ? payload.id : ""}`,
      {}
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status.code === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(e.response.data.status.message);
    }
  }
};

export const getexportdatas = async (payload) => {
  try {
    const response = await axios.get(
      payload.url + `${payload.id ? payload.id : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TicketsToken")}`,
        },
        params: {
          ...payload?.payload,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status.code === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(e.response.data.status.message);
    }
  }
};

export const postAPICallFunction = async (payload) => {
  try {
    const response = await axios.post(payload.url, payload.data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TicketsToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response.data.status === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(error.response.data.status.message);
    }
    return error;
  }
};
export const QrcodepostAPICallFunction = async (payload) => {
  try {
    const response = await axios.post(payload.url, payload.data);
    return response;
  } catch (error) {
    if (error.response.data.status === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(error.response.data.status.message);
    }
    return error;
  }
};

export const putAPICallFunction = async (payload) => {
  try {
    const response = await axios.put(
      payload.url + payload.id + "/",
      payload.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TicketsToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response.data.status === 401) {
      localStorage.removeItem("TicketsToken");
      localStorage.removeItem("isTicketsLogin");
      window.location.href = "/";
      window.location.reload();
      toast.error("Error occured please login");
    } else {
      toast.error(error.response.data.status.message);
    }
    return error;
  }
};
