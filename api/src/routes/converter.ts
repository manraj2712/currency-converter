import { Router } from "express";
import {
  convertTokenToCurrencyController,
  getCurrenciesController,
} from "../controllers/converter";

const router = Router();

router.route("/get-currencies").get(getCurrenciesController);
router
  .route("/convert/:from/:to/:amount")
  .get(convertTokenToCurrencyController);

export default router;
