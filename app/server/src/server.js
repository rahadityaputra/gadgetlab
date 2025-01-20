import {app}  from "./app.js";
import dotenv from 'dotenv';
import { logger } from "./logging.js";

dotenv.config();

app.listen(process.env.PORT, ()=> {
    logger.info(`server is running on port ${process.env.PORT}`)
})

