import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { wifiRepository } from "../repositories";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import { IWifiInsert, IWifiLocals, IWifiLocalsGet } from "../types/wifiTypes";
import { wifis } from "@prisma/client";

dotenv.config();

const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);

export const createWifi = async (data: IWifiLocals) => {
  checkParamsMatchs(data.id, data.token.userId);
  const encryptedKey = await encryptParamByCryptr(data.body.password);
  const objectToInsert: IWifiInsert = {
    networkName: data.body.networkName,
    title: data.body.title,
    password: encryptedKey,
    userId: data.id,
  };
  const wifi = await wifiRepository.insertWifi(objectToInsert);
  return wifi;
};

export const getAllWifis = async (id: number) => {
  const wifis = await wifiRepository.getWifisByUserId(id);
  const uncryptWifis = uncryptParams(wifis);
  return uncryptWifis;
};

export const getWifiById = async (data: IWifiLocalsGet) => {
  const wifi = await searchWifiById(data.id);
  checkParamsMatchs(wifi.userId, data.token.userId);
  const uncryptWifi = uncryptObject(wifi);
  return uncryptWifi;
};

export const deleteWifi = async (data: IWifiLocalsGet) => {
  const wifi = await searchWifiById(data.id);
  checkParamsMatchs(wifi.userId, data.token.userId);
  const deleted = await wifiRepository.deleteWifiById(data.id);
  return deleted;
};

export const encryptParamByCryptr = async (key: string) => {
  const encryptedKey = cryptr.encrypt(key);
  return encryptedKey;
};

export const uncryptParams = (keys: wifis[]) => {
  try {
    const uncryptArray = keys.map((item) => {
      const newObject = {
        ...item,
        password: cryptr.decrypt(item["password"]),
      };
      return newObject;
    });
    return uncryptArray;
  } catch (error) {
    throw error;
  }
};

export const searchWifiById = async (id: number) => {
  const wifi = await wifiRepository.getWifiById(id);
  if (!wifi) {
    const error: object = {
      type: "Not_Found",
      message: "Credencial Não existe.",
    };
    throw error;
  }
  return wifi;
};

export const uncryptObject = (object: wifis) => {
    try {
      const uncrypt = {
        ...object,
        password: cryptr.decrypt(object["password"]),
      };
      return uncrypt;
    } catch (error) {
      throw error;
    }
  };
