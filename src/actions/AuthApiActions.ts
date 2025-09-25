"use server";

import { signIn, signOut } from "@/auth";
import { API_BASE_URL } from "@/config/config";

export async function logIn(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Login failed",
    };
  }
}

//user login API function for Laravel authentication
export async function userLogin(email: string, password: string) {
  // console.log("userLogin ", email, password);
  const endpoint = `${API_BASE_URL}/api/auth/login`;
  // console.log(endpoint);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Authentication failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
//user login API function for Laravel authentication
export async function registerNewUser(
  name: string,
  email: string,
  password: string
) {
  const endpoint = `${API_BASE_URL}/api/auth/register`;
  // console.log(endpoint);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `Registration failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

//user logout
export async function userLogout() {
  await signOut({ redirect: true, redirectTo: "/sign-in" });
}
