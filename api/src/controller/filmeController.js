import { Router } from 'express';
import { alterarImagem, alterFilme, consultarFilme, consultarFilmePorId, consultarFilmePorNome, deletarFilme, inserirFilme } from '../repository/filmeRepository.js';

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
        resp.status(400).send({
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

// LISTAR TODOS OS FILMES //

server.get('/filme', async (req, resp) =>{
    try
    {
        const resposta = await consultarFilme();
        resp.send(resposta); 
    }

    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })
    }
})

// LISTAR FILMES POR NOME //

server.get('/filme/busca', async (req, resp) =>{
    try
    {
        const { nome } = req.query;

        const resposta = await consultarFilmePorNome(nome);

        if(!resposta)
            resp.status(404).send( [] );

        else
            resp.send(resposta);
    }

    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

// LISTAR FILMES POR ID //

server.get('/filme/:id', async (req, resp) =>{
    try
    {
        const id = Number(req.params.id);

        const resposta = await consultarFilmePorId(id);

        if(!resposta)
            resp.status(404).send( [] );

        else
            resp.send(resposta);
    }

    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })    
    }
})

// DELETAR FILME //

server.delete('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;

        const resposta = await deletarFilme(id);
        if (resposta != 1)
           throw new Error('Filme não pode ser removido.');
        resp.status(204).send();
       } catch (err) {
           resp.status(400).send({
               erro: err.message
           })
       }
})

// ALTERAR FILME //

server.put('/filme/:id', async (req, resp) => {
    try
    {
       const { id } = req.params;
       const filme = req.body;

       if(!filme.nome)
           throw new Error('Nome do filme obrigatório');
        if(!filme.sinopse)
           throw new Error('Sinopse obrigatória');
        if(!filme.avaliacao == undefined || filme.avaliacao <= 0)
           throw new Error('Avaliação obrigatório');
        if(!filme.lancamento)
           throw new Error('Lançamento obrigatório');
        if(!filme.disponivel)
           throw new Error('Campo Disponível é obrigatório');
        if(!filme.nome)
           throw new Error('Usuário não logado');

        const resposta = await alterFilme(id, filme);

        if(resposta != 1)
            throw new Error ('Filme não pode ser alterado.')
        else
            resp.status(204).send();
    }

    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;