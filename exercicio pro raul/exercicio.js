const express = require('express');
const app = express();
const port = 3000;

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

/*
    Simula um banco de dados
*/ 
let items = [
    { id: 1, name: "Engenharia de Software"},
    { id: 2, name: "Sistemas de Informação"},
];

/**
 * 
 * Endpoint para buscar os dados da lista
 * 
 */
app.get('/item', (req, res) => {
    res.status(200).json(items);
});

/**
 * Endpoint para buscar um item específico pelo id
 */
app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id); // Pega o id dos parâmetros da URL
    const item = items.find(item => item.id === id); // Busca o item pelo id
    if (item) {
        res.status(200).json(item); 
    } else {
        res.status(404).json({ message: "Item não encontrado" }); // Se não encontrado, retorna erro 404
    }
});

/**
 * Endpoint para criar um novo item
 */
app.post('/item', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ message: "Erro, número de caracteres insuficiente" });
    }})

//vamos passar como parametro na chamada o id do objeto que irá ser excluido
app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if(index !== -1) {
        //desafio remover o item do array
        items.splice(index, 1);
        res.status(200).json({mensage: "Item removido"});
    } else {
        res.status(404).json({mensage: "Item não encontrado"});
    }
});

app.put('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = {id, ...req.body}
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!"});
    }
});

/**
 * Endpoint para atualizar apenas o campo 'name' de um item específico (PATCH)
 */
app.patch('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        // Validação do campo name
        if (!name || typeof name !== 'string' || name.length < 3) {
            return res.status(400).json({ message: "O campo 'name' é obrigatório e deve conter pelo menos 3 caracteres." });
        }
        // Atualiza apenas o campo 'name', sem modificar outras propriedades
        items[index].name = name;
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

/**
 * Endpoint para deletar todos os itens (DELETE)
 */
app.delete('/items', (req, res) => {
    items = []; // Limpa o array de itens
    res.status(200).json({ message: "Todos os itens foram removidos!" });
});

/**
 * Endpoint para contar o número de itens (GET /items/count)
 */
app.get('/items/count', (req, res) => {
    const count = items.length; // Calcula a quantidade de itens no array
    res.status(200).json({ count });
});

app.listen(port, () => {
    console.log (O servidor está rodando em http://localhost:${port});
})