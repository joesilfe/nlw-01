import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

// Rota: Endereço completo da requisição
// Recursos: Qual entidade estamos acessando no sistema

// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma nova informação no back-end
// DELETE: Excluir uma informação existente no back-end

// POST http://localhost:3333/users = Criar um usuário 
// GET http://localhost:3333/users = Lista usuário
// GET http://localhost:3333/users/5 = Buscar dados do usuário com IDs

// Request Params: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetros que vm na própria rota geralmente opcionais para filtros, paginação.
// Request Body: Parâmetros para criação e atualizações de informações

const users = [
    'Diego',
    'Jhudit',
    'Cleiton',
    'Sueli',
    'Rob'
]

app.get('/users', (request: Request, response: Response) => {
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    // JSON
    response.json(filteredUsers);
});

app.get('/users/:id', (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const user = users[id]
    // JSON
    response.json(user);
});


app.post('/users', (request: Request, response: Response) => {
    const data = request.body;
    
    const user = {
        name: data.name,
        email: data.email,
    }

    return response.json(user);
});

app.listen(3333);

###
-- Serve para rodar uma migrate local do projeto em Knex
npx knex migrate:latest --knexfile knexfile.ts

### Important
Ao tipar um pacote que instalou para ter acesso ao intelicesse e no pacote possuir @, para instalar o pacote e acessar a tipagem, torque por __.

Exemplo.:
Nome do pacote.: @hapi/joi
Instalando pacote.:  npm install @types/hapi__joi -D 