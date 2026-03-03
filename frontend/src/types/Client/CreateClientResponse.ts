import { Client } from "../client";

export interface CreateClientResponse {
  message: string;
  client: Client;
}