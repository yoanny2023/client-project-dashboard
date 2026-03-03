import { api } from "./api"

export const authService = {

  async getMe() {
    const res = await api.get("/users/me");
    return res.data;
  }
}