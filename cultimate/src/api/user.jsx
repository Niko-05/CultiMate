import * as SecureStore from "expo-secure-store";
import config from "../../config";
import { Alert } from "react-native";

export const checkDuplicateUsername = async (username) => {
  try {
    const api_call = await fetch(
      `${config.API}/user/checkUsername?username=${encodeURIComponent(
        username
      )}`,
      { method: "GET" }
    );

    const result = await api_call.json();

    return result == null || result.length == 0;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const checkDuplicateEmail = async (email) => {
  try {
    const api_call = await fetch(
      `${config.API}/user/checkEmail?email=${encodeURIComponent(email)}`,
      { method: "GET" }
    );

    const result = await api_call.json();

    return result == null || result.length == 0;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const registerUser = async (username, password, email) => {
  try {
    const requestBody = {
      username: username,
      password: password,
      email: email,
    };
    const api_call = await fetch(`${config.API}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const response = await api_call.json();
    await SecureStore.setItemAsync("accesstoken", response.accesstoken);
    return true;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const loginUser = async (email, password) => {
  try {
    const api_call = await fetch(
      `${config.API}/user/login?email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
      { method: "GET" }
    );
    if (api_call.status == 401) {
      Alert.alert("Error", "Wrong email or password");
      return;
    }
    const response = await api_call.json();
    await SecureStore.setItemAsync("accesstoken", response.accesstoken);
    // to retreieve the token:
    // const token = await SecureStore.getItemAsync('accesstoken');
    return true;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const getUserInfo = async () => {
  try {
    // This is the way to access the token
    const token = await SecureStore.getItemAsync("accesstoken");
    const api_call = await fetch(`${config.API}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!api_call.ok) {
      // Handle non-OK response status
      Alert.alert(
        "API error",
        `Failed to fetch user data. Status: ${api_call.status}`
      );
      return;
    }

    const result = await api_call.json();
    return result;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const changeUsername = async (username) => {
  try {
    const token = await SecureStore.getItemAsync("accesstoken");
    const updatedData = {
      username: username,
    };
    const api_call = await fetch(`${config.API}/user/changeUsername`, {
      method: "PATCH", // Use PATCH instead of GET
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData), // Include the data you want to update in the request body
    });

    if (!api_call.ok) {
      // Handle non-OK response status
      Alert.alert(
        "API error",
        `Failed to update user data. Status: ${api_call.status}`
      );
      return;
    }
    console.log(api_call.json());
    return true;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const changeEmail = async (email) => {
  try {
    const token = await SecureStore.getItemAsync("accesstoken");
    const updatedData = {
      email: email,
    };
    const api_call = await fetch(`${config.API}/user/changeEmail`, {
      method: "PATCH", // Use PATCH instead of GET
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData), // Include the data you want to update in the request body
    });

    if (!api_call.ok) {
      // Handle non-OK response status
      Alert.alert(
        "API error",
        `Failed to update user data. Status: ${api_call.status}`
      );
      return;
    }
    console.log(api_call.json());
    return true;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};

export const changePassword = async (password) => {
  try {
    const token = await SecureStore.getItemAsync("accesstoken");
    const updatedData = {
      password: password,
    };
    const api_call = await fetch(`${config.API}/user/changePassword`, {
      method: "PATCH", // Use PATCH instead of GET
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData), // Include the data you want to update in the request body
    });

    if (!api_call.ok) {
      // Handle non-OK response status
      Alert.alert(
        "API error",
        `Failed to update user data. Status: ${api_call.status}`
      );
      return;
    }
    console.log(api_call.json());
    return true;
  } catch (e) {
    console.error(e);
    Alert.alert("Network error");
  }
};
