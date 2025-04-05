import express from 'express';
import mysqlDb from "../mysqlDb";
import {imagesUpload} from "../multer";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {Comment, CommentWithoutId, NewsMutation} from "../types";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    // try {
    //     const { news_id } = req.query as { news_id?: string };
    //     const connection = await mysqlDb.getConnection();
    //
    //     let query = 'SELECT id, author, comment FROM comments WHERE id = ?';
    //     const params: (string | number)[] = [];
    //
    //
    //     if (news_id) {
    //         params.push(Number(news_id));
    //     }
    //
    //     const [result] = await connection.query(query, params);
    //     const comments = result as Comment[];
    //
    //     res.send(comments);
    // } catch (err) {
    //     next(err);
    // }
    try{
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM comments');
        const comments = result as Comment[];
        res.send(comments);
    }catch(err){
        next(err);
    }
});

commentsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if(!req.body.comment) {
        res.status(400).send({error: 'Please send a comment'});
        return;
    }

    const newCommentsItem: CommentWithoutId = {
        news_id: req.body.news_id,
        author: req.body.title,
        comment: req.body.comment,
    };

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query('INSERT INTO comments (news_id, author, comment) VALUES (?, ?, ?)',
        [newCommentsItem.news_id, newCommentsItem.author, newCommentsItem.comment],
    );
    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [oneComment] = await connection.query('SELECT * FROM comments WHERE id = ?', [id]);
    const product = oneComment as Comment[];
    res.send(product);
});

commentsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query<ResultSetHeader>('DELETE FROM comments WHERE id = ?',[id]);

    res.json({message: `Category ${result} deleted successfully`});
});




export default commentsRouter;