import { Router } from "express";
import cornellController from "../controller/CornellController";

const routerCornell = Router();

routerCornell.post("/cornell", cornellController.createCornell);
routerCornell.get("/cornell/user/:userId", cornellController.searchCornellByUserId);

export default routerCornell;
