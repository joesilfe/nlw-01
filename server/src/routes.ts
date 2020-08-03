import express from 'express';
import { celebrate, Joi } from 'celebrate'

import multer from 'multer'
import multerConfg from './config/multer';

import PointsControllers from './controllers/PointsControllers';
import ItemsControllers from './controllers/ItemsControllers';

// Express.Router(): Serve para desacopla das outras rotas
const routes = express.Router();
const upload = multer(multerConfg);

routes.get('/items', new ItemsControllers().index);
routes.get('/points/', new PointsControllers().index);
routes.get('/points/:id', new PointsControllers().show);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        // validando o bady
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(), // inserir regex
            // image: validar pelo multer
        })
    }, {
        abortEarly: false,
    }),
    new PointsControllers().create
);

export default routes;


