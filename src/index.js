import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Criar nossas rotas

app.get("/hello", (req, res) => {
    res.send("Exercicio feito!!!!");
});

app.get("/about", (req, res) => {
    res.send({
        nome: "Paulo Cardoso",
        email: "paulo@growdev.com",
        resumo: "Mentor da Growdev",
        idade: 29,
        skills: ["Node.js", "API REST", "Express"]
    });

    //nome, email, resumo do perfil, idade, lista de skills
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("O servidor está executando na porta " + porta);
});
