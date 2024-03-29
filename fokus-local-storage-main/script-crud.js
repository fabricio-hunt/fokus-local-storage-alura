/*  new features: */
const btnAdicionarTarefa = document.querySelector('.app__button--add-task'); // Seleciona o botão para adicionar tarefas
const formAdicionarTarefa = document.querySelector('.app__form-add-task.hidden'); // Seleciona o formulário para adicionar tarefas (inicialmente oculto)
const textarea = document.querySelector('.app__form-textarea'); // Seleciona o campo de texto do formulário
const ulTarefas = document.querySelector('.app__section-task-list')


const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []




function criarElementoTarefa(tarefa){
    const li = document.createComment('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = ` <li class="app__section-task-list-item">
    <svg>
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    </svg>
    <p class="app__section-task-list-item-description">
        Estudando localStorage
    </p>
    <button class="app_button-edit">
        <img src="/imagens/edit.png">
    </button>
</li>
 `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/fokus-local-storage-main/')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li


}

// Adiciona um ouvinte de eventos para o clique no botão de adicionar tarefa
btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden'); // Alterna a visibilidade do formulário quando o botão é clicado
});


// Adiciona um ouvinte de eventos para o envio do formulário
formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Cria um objeto tarefa com a descrição fornecida no campo de texto
    const tarefa = {
        descricao: textarea.value
    };

    tarefas.push(tarefa); // Adiciona a tarefa ao array de tarefas

    // Armazena o array de tarefas no localStorage após serializá-lo em uma string
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});



