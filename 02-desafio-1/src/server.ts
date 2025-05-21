import * as http from "node:http";
import {Server} from "node:http";
import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const server: Server = http.createServer(app);
server.listen(process.env.PORT);