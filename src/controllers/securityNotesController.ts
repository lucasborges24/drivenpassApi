import { Request, Response } from "express";

export const postSecurityNote = async (req: Request, res: Response) => {

    res.status(201).send('securityNote')
}