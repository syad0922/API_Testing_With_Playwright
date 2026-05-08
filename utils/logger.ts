import fs from 'fs';
import winston from 'winston';
import path from 'path';
import { time } from 'console';

if(!fs.existsSync('logs')){
   fs.mkdirSync('logs');
}

//const logfile=`logs/test-${Date.now()}.log`;
const logfile = `logs/executionlogs.log`;

export const logger=winston.createLogger({
   level:'info',
   format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({level,message,timestamp})=>{
         return `${timestamp}[${level.toUpperCase()}]: ${message}`;
      })
   ),
   transports:[
      new winston.transports.File({filename:logfile}),
      new winston.transports.Console()
   ]
});
export {logfile};