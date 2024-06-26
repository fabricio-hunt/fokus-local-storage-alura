const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task.hidden')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')



const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('app__section-task-icon-status');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '12');
    circle.setAttribute('fill', '#FFF');

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', 'M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z');
    path.setAttribute('fill', '#01080E');

    svg.appendChild(circle);
    svg.appendChild(path);

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app__button-edit');

    botao.onclick = () => {
       const novaDescricao = prompt("Qual é no novo nome da tarefa? ")
       console.log('Novo teste: ', novaDescricao)
       if (novaDescricao) {
        paragrafo.textContent = novaDescricao
        tarefa.descricao = novaDescricao
        atualizarTarefas()
       }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/fokus-local-storage-main/imagens/edit.png');
    botao.appendChild(imagemBotao);

    li.appendChild(svg);
    li.appendChild(paragrafo);
    li.appendChild(botao);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach( elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
       
        li.classList.add('app__section-task-list-item-active')
    } 

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {

    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao: textarea.value
    };

    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.appendChild(elementoTarefa);
    atualizarTarefas()
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})



//Limpar (Cancelar uma tarefa)
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');


const limparFormulario = () => {
    textarea.value = '';  
    formularioTarefa.classList.add('hidden'); 
}

btnCancelar.addEventListener('click', limparFormulario);


tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.appendChild(elementoTarefa);
});

