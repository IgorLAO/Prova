import { Router } from "express";
import { AddClient, Delete, List, Update } from "../repositorys/clientsRepository.js";

let server = Router();

server.get('/cliente', async (req, resp) => {
    try {
        let data = await List();
        resp.send(data)

    } catch (err) { 
        resp.status(500).send({
        erro: err.message
    });
    }
});

server.post('/cliente', async (req, resp) => {
    try {
        const add = req.body
        let data = await AddClient(add);

        resp.send(data)
    } catch (err) {
        resp.status(500).send({
            error: err.message
        });
    }
});



server.put('/cliente/:id', async (req, resp) => {
    try {
        let addId = req.params.id
        let add = req.body

        const resposta = await Update(addId, add)
        if (resposta != 1)
            throw new Error('O contato não pode ser alterado')
        else
            resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.delete('/cliente/:id', async (req, resp) => {
    try {
        const addId = req.params.id
         const resposta = await Delete(addId)
        resp.status(204).send()
    } catch (err) {
        resp.status(500).send({
            error: err.message
        });
    }
});


export default server;