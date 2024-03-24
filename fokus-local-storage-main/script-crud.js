/*  new features: */
const btnAdicionarTarefa = document.querySelector('.app__button--add-task'); // Seleciona o botão para adicionar tarefas
const formAdicionarTarefa = document.querySelector('.app__form-add-task.hidden'); // Seleciona o formulário para adicionar tarefas (inicialmente oculto)
const textarea = document.querySelector('.app__form-textarea'); // Seleciona o campo de texto do formulário

const tarefas = []; // Array para armazenar as tarefas

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

