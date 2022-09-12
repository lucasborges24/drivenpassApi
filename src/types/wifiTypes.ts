import { wifis } from "@prisma/client";
import { CreateUserToken } from "./authTypes";

export interface IWifiLocals {
  body: IWifiBody;
  token: CreateUserToken;
  id: number;
}

export type IWifiBody = Omit<wifis, "id" | "userId" | "createdAt">;
export type IWifiInsert = Omit<wifis, "id" | "createdAt">;
export type IWifiLocalsGet = Omit<IWifiLocals, "body">;
