import { Request, Response } from "express";
import { wifiService } from "../services";
import { IWifiLocals, IWifiLocalsGet } from "../types/wifiTypes";


export const createWifi = async (req: Request, res: Response) => {
    const data: IWifiLocals = {
      body: res.locals.body,
      token: res.locals.token,
      id: res.locals.userId,
    };
    const createdWifi = await wifiService.createWifi(data);
  
    res.status(201).send(createdWifi);
  };
  
  export const getAllWifis = async (req: Request, res: Response) => {
    const { userId }: { userId: number } = res.locals.token;
    const Wifis = await wifiService.getAllWifis(userId);
    res.status(200).send(Wifis);
  };
  
  export const getWifi = async (req: Request, res: Response) => {
    const data: IWifiLocalsGet = {
      token: res.locals.token,
      id: res.locals.wifiId,
    };
    const Wifi = await wifiService.getWifiById(data);
  
    res.status(200).send(Wifi);
  };
  
  export const deleteWifi = async (req: Request, res: Response) => {
    const data: IWifiLocalsGet = {
      token: res.locals.token,
      id: res.locals.wifiId,
    };
    const deleted = await wifiService.deleteWifi(data);
    res.status(201).send(deleted);
  };
  