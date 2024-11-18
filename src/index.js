import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';

dotenv.config();

const app = express();
app.use(express.json());

// Criar nossas rotas
// GET /growdevers - Listar growdevers
app.get("/growdevers", (req, res) => {
    res.status(200).send({
        ok: true,
        mensagem: "Growdevers listados com sucesso",
        dados: growdevers
    });
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está executando na porta " + porta);
});
