import express from 'express';
import mysqlDb from "../mysqlDb";
import {imagesUpload} from "../multer";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {DeleteId, News, NewsMutation, NewsWithoutId} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
    try{
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, title, image, createdAt FROM news');
        const news = result as NewsMutation[];
        res.send(news);
    }catch(err){
        next(err);
    }
});

newsRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
    const news = result as News[];
    res.send(news[0]);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if(!req.body.title || !req.body.description) {
        res.status(400).send({error: 'Please send a title and description'});
        return;
    }

    const newNewsItem: NewsWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    };

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('INSERT INTO news (title, description, image) VALUES (?, ?, ?)',
        [newNewsItem.title, newNewsItem.description, newNewsItem.image],
    );
    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [oneProduct] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
    const product = oneProduct as News[];
    res.send(product);
});

newsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [items] = await connection.query<RowDataPacket[]>('SELECT id FROM comments WHERE news_id = ?',[id]);
    const results = items as DeleteId[];
    if(results.length > 0) {
        res.status(400).send({error: 'You cannot delete this item'});
    }

    const [result] = await connection.query<ResultSetHeader>('DELETE FROM news WHERE id = ?',[id]);

    res.json({message: `Category ${result} deleted successfully`});
});




export default newsRouter;