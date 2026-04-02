const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let produtos = [];
let idAtual = 1;

// CREATE
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    const novoProduto = {
        id: idAtual++,
        nome,
        preco
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// READ
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// UPDATE
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    produto.nome = nome;
    produto.preco = preco;

    res.json(produto);
});

// DELETE
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    produtos = produtos.filter(p => p.id !== id);

    res.json({ mensagem: "Produto removido com sucesso" });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
