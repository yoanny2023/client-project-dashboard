import { Client } from "../client";

export interface DeleteClientResponse {
  message: string;
  client: Client;
}