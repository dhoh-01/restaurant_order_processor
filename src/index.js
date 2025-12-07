import { order_processor } from './order_processor.js';

import { DatabaseSync } from 'node:sqlite';
const db_file = 'rop.db';
let db= new DatabaseSync(db_file);
let sql= db.createTagStore();

order_processor(db);

