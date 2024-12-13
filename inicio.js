// Obtém elementos do DOM
const inputTarefa = document.getElementById("inputTarefa");
const botaoMais = document.getElementById("botaoMais");
const listaTarefas = document.getElementById("listaTarefas");
const tarefaProgress = document.getElementById("tarefaProgress");
const progressText = document.getElementById("progressText");
const darkModeButton = document.getElementById("dark");

// Atualiza o progresso das tarefas (tarefas concluídas/total)
function atualizarProgresso() {
    const totalTarefas = listaTarefas.children.length; // Número total de tarefas
    const tarefasConcluidas = listaTarefas.querySelectorAll(".task-text.completed").length; // Número de tarefas concluídas
    tarefaProgress.max = totalTarefas; // Define o valor máximo do progresso
    tarefaProgress.value = tarefasConcluidas; // Atualiza o progresso atual
    progressText.textContent = `${tarefasConcluidas}/${totalTarefas} tarefas concluídas`; // Atualiza o texto de progresso
}

// Adiciona uma nova tarefa à lista
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim(); // Obtém o texto da tarefa e remove espaços extras

    if (textoTarefa === "") { // Verifica se o campo está vazio
        alert("Por favor, insira uma tarefa!");
        return;
    }

    // Cria um novo elemento de tarefa
    const novaTarefa = document.createElement("li");
    novaTarefa.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${textoTarefa}</span>
        <input type="text" class="edit-input" style="display: none;">
        <button class="edit-btn"><span class="material-symbols-outlined icon-edit"></span></button>
        <button class="delete-btn"><span class="material-symbols-outlined icon-delete"></span></button>
    `;

    listaTarefas.appendChild(novaTarefa); // Adiciona a nova tarefa à lista
    inputTarefa.value = ""; // Limpa o campo de entrada
    adicionarEventos(novaTarefa); // Adiciona eventos à nova tarefa
    atualizarProgresso(); // Atualiza o progresso
}

// Adiciona eventos às tarefas (excluir, concluir, editar)
function adicionarEventos(tarefa) {
    const botaoExcluir = tarefa.querySelector(".delete-btn"); // Botão de excluir
    const checkbox = tarefa.querySelector(".task-checkbox"); // Checkbox de concluir tarefa
    const botaoEditar = tarefa.querySelector(".edit-btn"); // Botão de editar tarefa
    const textoTarefa = tarefa.querySelector(".task-text"); // Texto da tarefa
    const inputEdicao = tarefa.querySelector(".edit-input"); // Campo de edição

    // Evento para excluir a tarefa
    botaoExcluir.addEventListener("click", () => {
        tarefa.remove(); // Remove a tarefa
        atualizarProgresso(); // Atualiza o progresso
    });

    // Evento para marcar/desmarcar tarefa como concluída
    checkbox.addEventListener("change", (event) => {
        textoTarefa.classList.toggle("completed", event.target.checked); // Adiciona ou remove a classe "completed"
        atualizarProgresso(); // Atualiza o progresso
    });

    // Evento para alternar entre edição e exibição do texto
    botaoEditar.addEventListener("click", () => {
        if (inputEdicao.style.display === "none") {
            inputEdicao.style.display = "block";
            inputEdicao.value = textoTarefa.textContent;
            textoTarefa.style.display = "none";
            inputEdicao.focus();
        } else {
            textoTarefa.textContent = inputEdicao.value.trim();
            inputEdicao.style.display = "none";
            textoTarefa.style.display = "block";
        }
    });

    // Evento para salvar edição ao pressionar Enter
    inputEdicao.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            textoTarefa.textContent = inputEdicao.value.trim();
            inputEdicao.style.display = "none";
            textoTarefa.style.display = "block";
        }
    });
}

// Adiciona tarefa ao clicar no botão "+" ou pressionar Enter
botaoMais.addEventListener("click", adicionarTarefa);
inputTarefa.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// Alterna o modo escuro/claro
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); // Adiciona ou remove a classe "dark-mode"

    // Alterna o ícone do botão
    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.classList.replace("icon-light_mode", "icon-dark_mode");
    } else {
        darkModeButton.classList.replace("icon-dark_mode", "icon-light_mode");
    }
});

// Configurações iniciais da página
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const tela2 = document.querySelector(".tela2");
    const xButton = document.getElementById("botao_fechar"); // Obtém o botão "x"

    // Esconde a div "tela2" inicialmente
    tela2.style.display = "none";
    
    // Atalho Ctrl + H para alternar exibição da tela2
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "h") {
            event.preventDefault();
            if (tela2.style.display === "none") {
                tela2.style.display = "block";
                container.style.display = "block";
            } else {
                tela2.style.display = "none";
                container.style.display = "block";
            }
        }
    });

    // Evento para fechar a tela2 ao clicar no "x"
    xButton.addEventListener("click", () => {
        tela2.style.display = "none"; // Fecha a tela2
        container.style.display = "block";
    });
});
