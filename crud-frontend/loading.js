function showLoading () {
    const div = document.createElement('div');
    div.classList.add('loading', 'centralize');

    const label = document.createElement('label');
    label.innerText = 'Carregando...';

    div.appendChild(label);

    document.body.appendChild(div);
}

function hideLoading () {
    const loadings = document.getElementsByClassName('loading'); // Pega os elementos com classe 'loading'

    if (loadings.length) { // Se loadings tiver um tamanho, remova o primeiro elemento (só vai ter um)
        loadings[0].remove();
    }

}
