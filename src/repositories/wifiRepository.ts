import prisma from "../database";
import { IWifiInsert } from "../types/wifiTypes";

export const insertWifi = async (data: IWifiInsert) => {
  const wifi = await prisma.wifis.create({
    data: {
      networkName: data.networkName,
      title: data.title,
      password: data.password,
      userId: data.userId,
    },
  });
  return wifi;
};

export const getWifiByIdAndTitle = async (id: number, title: string) => {
  const wifi = await prisma.wifis.findFirst({
    where: {
      userId: id,
      title: title,
    },
  });
  return wifi;
};

export const getWifisByUserId = async (id: number) => {
  const wifis = await prisma.wifis.findMany({
    where: {
      userId: id,
    },
  });
  return wifis;
};

export const getWifiById = async (id: number) => {
  const wifi = await prisma.wifis.findUnique({
    where: {
      id: id,
    },
  });
  return wifi;
};

export const deleteWifiById = async (id: number) => {
  const deleted = await prisma.wifis.delete({
    where: {
      id: id,
    },
  });
  return deleted;
};
