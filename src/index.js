import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());

// GET /growdevers - Listar growdevers
//     /growdevers?idade=20
app.get("/growdevers", (req, res) => {
    const { idade, nome, email, email_includes } = req.query;

    let dados = growdevers;
    if(idade) {
        dados = dados.filter(item => item.idade >= Number(idade));
    }

    if(nome) {
        dados = dados.filter(item => item.nome.includes(nome));
    }

    if(email) {
        dados = dados.filter(item => item.email === email);
    }

    if(email_includes) {
        dados = dados.filter(item => item.email.includes(email_includes));
    }

    res.status(200).send({
        ok: true,
        mensagem: "Growdevers listados com sucesso",
        dados
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

// PUT /growdevers/:id - Atualizar um growdever especifico
app.put("/growdevers/:id", (req, res) => {
    // 1 entrada
    const { id } = req.params;
    const { nome, email, idade, matriculado } = req.body;

    // 2 processamento
    const growdever = growdevers.find(item => item.id === id);
    if(!growdever) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }

    growdever.nome = nome;
    growdever.email = email;
    growdever.idade = idade;
    growdever.matriculado = matriculado;

    // 3 saida
    res.status(200).send({
        ok: true,
        mensagem: "Growdever atualizado com sucesso",
        dados: growdevers
    });
});


const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está executando na porta " + porta);
});
