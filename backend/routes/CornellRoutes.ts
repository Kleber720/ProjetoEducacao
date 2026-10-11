import { Router } from "express";
import cornellController from "../controller/CornellController";

const routerCornell = Router();

routerCornell.post("/cornell", cornellController.createCornell);
routerCornell.get("/cornell/user/:userId", cornellController.searchCornellByUserId);

routerCornell.put("/cornell/:id", cornellController.updateCornellById);
routerCornell.delete("/cornell/:id", cornellController.deleteCornellById);

export default routerCornell;
