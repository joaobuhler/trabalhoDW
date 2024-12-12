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
    const botaoEditar = tarefa.querySelector(".edit-btn");

    botaoExcluir.addEventListener("click", () => {
        tarefa.remove();
        atualizarProgresso();
    });

    checkbox.addEventListener("change", (event) => {
        tarefa.querySelector(".task-text").classList.toggle("completed", event.target.checked);
        atualizarProgresso();
    });

    botaoEditar.addEventListener("click", () => {
        const textoTarefa = tarefa.querySelector(".task-text");
        abrirModalEdicao(textoTarefa);
    });
}

function abrirModalEdicao(textoTarefa) {
    // Cria o modal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        <div class="modal-content">
            <input type="text" class="modal-input" value="${textoTarefa.textContent}">
        </div>
    `;

    document.body.appendChild(modal);

    const inputModal = modal.querySelector(".modal-input");

    // Salvar ao pressionar Enter
    inputModal.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            textoTarefa.textContent = inputModal.value.trim();
            modal.remove();
        }
    });

   

    // Fechar o modal ao clicar fora dele
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.remove();
        }
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

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const tela2 = document.querySelector(".tela2");

    // Esconde a div "tela2" inicialmente
    tela2.style.display = "none";

    // Adiciona o listener para a combinação de teclas
    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "h") {
            event.preventDefault(); // Evita o comportamento padrão do navegador
            if (tela2.style.display === "none") {
                tela2.style.display = "block";
                container.style.display = "block";
            } else {
                tela2.style.display = "none";
                container.style.display = "block";
            }
        }
    });
});
