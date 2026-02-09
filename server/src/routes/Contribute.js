import express from "express";
import { contributePostController } from "../controller/Contribute.js";

const app = express();

app.post("/contribute-post", contributePostController);

export default app;
