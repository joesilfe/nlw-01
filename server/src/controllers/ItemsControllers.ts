import { Request, Response } from 'express';
import knex from '../database/connection';

// index: listar, show: mostrar um unico registro, create, update, delete

class ItemsControllers {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
        const host = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${host}/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsControllers;