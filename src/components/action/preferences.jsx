import React, { useState } from "react";
import { Preferences } from "@capacitor/preferences";

export const saveToken = async (item) => {
  await Preferences.set({
    key: "token_9star",
    value: item,
  });
};

export const loadToken = async () => {
  const { value } = await Preferences.get({ key: "token_9star" });
  // if (value) {
  // }
  return value;
};

export const deleteToken = async () => {
  await Preferences.remove({ key: "token_9star" });
  await Preferences.remove({ key: "user" });
};

export const saveUser = async (item) => {
  await Preferences.set({
    key: "user",
    value: JSON.stringify(item),
  });
};

export const loadUser = async () => {
  const { value } = await Preferences.get({ key: "user" });
  return value ? JSON.parse(value) : null;
};

export const deleteUser = async () => {
  await Preferences.remove({ key: "user" });
};

/* language */
export const setLanguage = async (item) => {
  await Preferences.set({
    key: "lng",
    value: item,
  });
};

export const getLanguage = async () => {
  const { value } = await Preferences.get({ key: "lng" });
  return value;
};

const TokenManager = () => {
  const [token, setTokenState] = useState("");

  const loadToken = async () => {
    const { value } = await Preferences.get({ key: "token_9star" });
    setTokenState(value); // Set state to display the token
  };

  const deleteToken = async () => {
    await Preferences.remove({ key: "token_9star" });
    setTokenState(""); // Clear token from state
  };
};

export default TokenManager;
