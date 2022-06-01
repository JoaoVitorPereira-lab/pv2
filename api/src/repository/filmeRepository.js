import server from '../controller/filmeController.js';
import { con } from './connection.js'

export async function inserirFilme (filme){
    const comando = 
    ` INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
            VALUES (?, ?, ?, ?, ?, ?) `;

    const [resposta] = await con.query(comando, [filme.usuario, filme.nome , filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel]);
    filme.id = resposta.insertId;
    
    return filme;
}

// ALTERAR IMAGEM //

export async function alterarImagem(imagem, id){
    const comando =
    ` UPDATE tb_filme 
         SET img_filme     = ?
       WHERE id_filme      = ? `;

    const [resposta] = await con.query(comando, [imagem, id]);
    return resposta.affectedRows;
}

// LISTAR TODOS OS FILMES //

export async function consultarFilme (){
    const comando = 
    ` SELECT    id_filme			id,
                nm_filme			nome,
                vl_avaliacao		avaliacao,
                dt_lancamento	    lancamento,
                bt_disponivel	    disponivel
        FROM    tb_filme; `;

        const[linhas] = await con.query(comando);
        return linhas;
}

// LISTAR FILMES POR NOME //

export async function consultarFilmePorNome(nome){
    const comando = 
    ` SELECT id_filme			id,
             nm_filme			nome,
             vl_avaliacao		avaliacao,
             dt_lancamento	    lancamento,
             bt_disponivel	    disponivel
        FROM tb_filme
       WHERE nm_filme			like ? `;

        const [linhas] = await con.query(comando, [ `%${nome}%` ]);
        return linhas;
}

// LISTAR FILMES POR ID //

export async function consultarFilmePorId(id){
    const comando = 
    ` SELECT id_filme		   id,
             nm_filme	       nome,
             vl_avaliacao	   avaliacao,
             ds_sinopse		   sinopse,
             dt_lancamento	   lancamento,
             bt_disponivel	   disponivel,
             img_filme         capa
        FROM tb_filme
       WHERE id_filme			= ? `;

        const [linhas] = await con.query(comando, [ id ]);
        return linhas;
}

// DELETAR FILME //

export async function deletarFilme(id){
    const comando = 
    ` DELETE FROM     tb_filme
             WHERE    id_filme = ?`;
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

// ALTERAR FILME //

export async function alterFilme(id, filme){
    const comando =
    `UPDATE tb_filme
     SET    nm_filme      =   ?,
            ds_sinopse    =   ?,
            vl_avaliacao  =   ?,
            dt_lancamento =   ?,
            bt_disponivel =   ?,
     WHERE  id_filme      =   ? `;

    const [resposta] = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, id ]);
    return resposta.affectedRows;
}