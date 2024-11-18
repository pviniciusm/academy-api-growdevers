import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());

// GET /growdevers - Listar growdevers
app.get("/growdevers", (req, res) => {
    res.status(200).send({
        ok: true,
        mensagem: "Growdevers listados com sucesso",
        dados: growdevers
    });
});

// POST /growdevers - Criar um growdever
app.post("/growdevers", (req, res) => {
    // 1- entrada
    const body = req.body;

    const novoGrowdever = {
        id: randomUUID(),
        nome: body.nome,
        email: body.email,
        idade: body.idade,
        matriculado: body.matriculado
    }

    // 2- processamento
    growdevers.push(novoGrowdever);

    // 3- saida
    res.status(201).send({
        ok: true,
        mensagem: "Growdever criado com sucesso",
        dados: growdevers
    })
});

// GET /growdevers/:id - Obter um growdever pelo seu ID
app.get("/growdevers/:id", (req, res) => {
    // 1 entrada
    const { id } = req.params;

    // 2 processamento
    const growdever = growdevers.find((item) => item.id === id);
    if(!growdever) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }

    // 3 saida
    res.status(200).send({
        ok: true,
        mensagem: "Growdever obtido com sucesso",
        dados: growdever
    });
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está executando na porta " + porta);
});
