"use strict";

import { Response, Request, NextFunction } from "express";

export const getApi = (req: Request, res: Response) => {
    res.json({message: "server is Running...."});
};

