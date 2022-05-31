import { Router } from 'express';
import { alterarImagem, inserirFilme } from '../repository/filmeRepository.js';

import multer from 'multer';

const server = Router();
const upload = multer({ dest: 'storage/capasfilmes' });

server.post('/filme', async (req,resp) => {
    try{
        const novoFilme = req.body;

        const filmeInserido = await inserirFilme(novoFilme);

        if(!filmeInserido)
            throw new Error ('Digite o filme corretamente!')

        resp.send(filmeInserido);
    }
    catch(err){
        resp.send(400).send({
            erro: err.message
        })
    }
})

// ALTERAR IMAGEM //

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try
    {
        const { id } = req.params;

        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);

        if(!imagem)
            throw new Error ('Imagem não pode ser inserida');

        

        resp.send(204).send();
    }

    catch(err)
    {
        resp.send(400).send({
            erro: err.message
        })
    }
})

export default server;