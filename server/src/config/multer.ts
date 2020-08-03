import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        
        // request: É o mesmo requeste que recebe nas rotas para ter acesso as requsições
        // file: São os dados do arquivo, como tamanho, nome, extensão e outros.
        // callback: é uma função quando terminar de processar o filename
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    }),
};