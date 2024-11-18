import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Criar nossas rotas

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log("O servidor está executando na porta " + porta);
});
