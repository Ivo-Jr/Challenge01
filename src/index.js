const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.get('/projects', (request, response) => {
    return response.json(projects)
})

server.get('/projects/:id', (request, response) => {
    const { id } = request.params;

    const num = projects.find(item => item.id == id )
    // O "num" está vindo com o valor de um objeto.

    return response.json(num)
})

server.post('/projects', (request, response) => {
    const { id, title } = request.body;

    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return response.json(projects)
})

server.post('/projects/:id/tasks', (request, response) => {
    const { id } = request.params
    const { task } = request.body;

    // Foi colocado o metodo ".find()" abaixo porque ele retorna o primeiro elemento do array
    // que satisfasz a função teste provida, isto é, nesse caso ele está localizando e retornando um objeto
    // pontual que passamos para ele. Se utilizássemos o método ".filter()", ele criaria um novo 
    // array com todos os elementos passados pela função teste e seu retorno seria um vetor de objetos 
    // o que dificultaria o caminho para acrescentar o tasks.
    const num = projects.find(item => item.id == id);

    num.tasks.push(task);

    return response.json(num);

});

server.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const num = projects.find(item => item.id == id);

    num.title = title;

    return response.json(projects)

});

server.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const num = projects.filter(item => item.id == id);

    projects.splice(num, 1);

    return response.json(projects)
});

server.listen(3333, () => {
    console.log('Backend running! 🚀')
});

