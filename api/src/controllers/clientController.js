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

        let get = List()
        if (data.ID_CPF == get.ID_CPF)
            throw new Error('sao ingual')
        else
            resp.status(204).send()
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