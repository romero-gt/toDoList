let tarefas = JSON.parse(localStorage.getItem('tarefa')) || [];
const formulario = document.getElementById('formularioTarefa');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);
    const title = dados.get('titulo');
    const tags = dados.get('tags').split(',').map(tag => tag.trim());

    const novaTarefa = {
        id: Date.now(),
        title,
        tags,
        criadoEm: new Date()
    }

    tarefas = [...tarefas, novaTarefa];
    salvarTarefas();
    renderizarTarefas(tarefas);
    formulario.reset();
});

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

const renderizarTarefas = (lista) => {
    const container = document.getElementById('listaTarefas');
    container.innerHTML = "";

    lista.forEach(({ id, title, tags }) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
        <div class="card p-3 mb-3 shadow-sm">
            <h5>${title}</h5>
            <div>${tags.map(tag => `<span class="card-tag">${tag}</span>`).join("")}</div>
            <button class="btn btn-sm btn-danger mt-2" onclick="removerTarefa(${id})">Remover</button>
        </div>
        `;

        container.appendChild(card);
    })
}