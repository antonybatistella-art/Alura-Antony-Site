// ==========================================
// 1. ALTERNAR TEMA (DARK MODE)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

// ==========================================
// 2. INTERAÇÃO DO CONTADOR (MINIJOGO)
// ==========================================
let cliques = 0;
const contadorNumero = document.getElementById('contador-numero');
const btnContar = document.getElementById('btn-contar');
const btnResetar = document.getElementById('btn-resetar');

btnContar.addEventListener('click', () => {
    cliques++;
    contadorNumero.innerText = cliques;
    // Pequeno efeito visual de pulo no número ao clicar
    contadorNumero.style.transform = 'scale(1.2)';
    setTimeout(() => contadorNumero.style.transform = 'scale(1)', 100);
});

btnResetar.addEventListener('click', () => {
    cliques = 0;
    contadorNumero.innerText = cliques;
});

// ==========================================
// 3. SISTEMA DE COMENTÁRIOS (MURAL)
// ==========================================
const listaComentarios = document.getElementById('lista-comentarios');

// Carrega os comentários já salvos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarComentarios);

function adicionarComentario(event) {
    event.preventDefault();

    const autorInput = document.getElementById('autor');
    const textoInput = document.getElementById('texto-comentario');

    const novoComentario = {
        autor: autorInput.value,
        texto: textoInput.value
    };

    // Salva no LocalStorage do navegador
    let comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosSalvos.push(novoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentariosSalvos));

    // Atualiza a tela
    renderizarComentario(novoComentario);

    // Limpa o formulário
    document.getElementById('comment-form').reset();
}

function carregarComentarios() {
    let comentariosSalvos = JSON.parse(localStorage.getItem('comentarios')) || [];
    if (comentariosSalvos.length === 0) {
        listaComentarios.innerHTML = '<p style="color: gray; font-style: italic;">Nenhum recado ainda. Seja o primeiro!</p>';
    } else {
        listaComentarios.innerHTML = '';
        comentariosSalvos.forEach(renderizarComentario);
    }
}

function renderizarComentario(comentario) {
    // Se a mensagem de "Nenhum recado" estiver na tela, limpa ela
    if (listaComentarios.innerHTML.includes("Nenhum recado ainda")) {
        listaComentarios.innerHTML = '';
    }

    const div = document.createElement('div');
    div.classList.add('comentario-item');
    div.innerHTML = `<strong>👤 ${comentario.autor}</strong><p>${comentario.texto}</p>`;
    listaComentarios.appendChild(div);
}

// ==========================================
// 4. EFEITO DE DIGITAÇÃO (EXTRA)
// ==========================================
const titulo = document.getElementById('efeito-titulo');
const textoTitulo = "🚀 Meu Projeto Escolar Interativo";
let i = 0;

function digitar() {
    if (i < textoTitulo.length) {
        if(i === 0) titulo.innerText = "";
        titulo.innerText += textoTitulo.charAt(i);
        i++;
        setTimeout(digitar, 100);
    }
}
window.onload = digitar;
