import { Request, Response } from 'express';
import knex from '../database/connection';

// index: listar, show: mostrar um unico registro, create, update, delete

class PointsControllers {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const host = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `${host}/uploads/${point.image}`
            }
        })

        return response.json(serializedPoints)
    }

    // Serialização
    // API Transform

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const host = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not fount' })
        }

        const serializedPoints = {
            ...point,
            image_url: `${host}/uploads/${point.image}`
        };

        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');


        return response.json({ point: serializedPoints, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        // Essa função serve para interceptar caso houver algum erro de inserção na tabela evitando a execução de todos os outros
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0]

        const pointItems = await items
            .split(',') // separando tudo por virgula transformando em vetor
            .map((item: string) => Number(item.trim())) // Recebendo uma string e retornando 
            .map((item_id: number) => {
                return {
                    point_id,
                    item_id,
                }
            });

        await trx('points_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsControllers;