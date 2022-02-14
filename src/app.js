import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

const path = dirname(fileURLToPath(import.meta.url));

const {
    PORT: port = 3000,   
    HOST: hostname = '127.0.0.1',
} =  process.env

app.set('view engine', 'ejs');
app.set('views', join(path,'../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(path,'../public')));

function isInvalid(field, errors = []) {
    // Boolean skilar `true` ef gildi er truthy (eitthvað fannst)
    // eða `false` ef gildi er falsy (ekkert fannst: null)
    return Boolean(errors.find((i) => i && i.param === field));
  }
  
app.locals.isInvalid = isInvalid;

app.get('/', (req, res) => {
    const errors = [];
    const formData = {
      name: '',
      nationalId: '',
      anonymous: false,
      comment: '',
    };
  
    const registrations = [];
    console.info("Request sent to /");
    res.render('index', { title: "Hello World", errors, formData, registrations });
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});