import 'dotenv/config'

import { con } from './src/repository/connection.js'

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());



server.listen(process.env.PORT, () => 
    console.log(`A API está conectada na porta ${process.env.PORT}`));

