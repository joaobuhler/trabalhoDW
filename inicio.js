const inputTarefa = document.getElementById("inputTarefa");
const botaoMais = document.getElementById("botaoMais");
const listaTarefas = document.getElementById("listaTarefas");
const tarefaProgress = document.getElementById("tarefaProgress");
const progressText = document.getElementById("progressText");
const darkModeButton = document.getElementById("dark");

function atualizarProgresso() {
    const totalTarefas = listaTarefas.children.length;
    const tarefasConcluidas = listaTarefas.querySelectorAll(".task-text.completed").length;
    tarefaProgress.max = totalTarefas;
    tarefaProgress.value = tarefasConcluidas;
    progressText.textContent = `${tarefasConcluidas}/${totalTarefas} tarefas concluídas`;
}

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    if (textoTarefa === "") {
        alert("Por favor, insira uma tarefa!");
        return;
    }

    const novaTarefa = document.createElement("li");
    novaTarefa.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${textoTarefa}</span>
        <button class="edit-btn"><span class="material-symbols-outlined icon-edit"></span></button>
        <button class="delete-btn"><span class="material-symbols-outlined icon-delete"></span></button>
    `;

    listaTarefas.appendChild(novaTarefa);
    inputTarefa.value = "";
    adicionarEventos(novaTarefa);
    atualizarProgresso();
}

function adicionarEventos(tarefa) {
    const botaoExcluir = tarefa.querySelector(".delete-btn");
    const checkbox = tarefa.querySelector(".task-checkbox");

    botaoExcluir.addEventListener("click", () => {
        tarefa.remove();
        atualizarProgresso();
    });

    checkbox.addEventListener("change", (event) => {
        tarefa.querySelector(".task-text").classList.toggle("completed", event.target.checked);
        atualizarProgresso();
    });
}

botaoMais.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

// Alternar modo escuro
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Alternar ícone
    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.classList.replace("icon-light_mode", "icon-dark_mode");
    } else {
        darkModeButton.classList.replace("icon-dark_mode", "icon-light_mode");
    }
});