'use strict'

async function pesquisarJogo(jogo) {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games?category=' + jogo)}` // Entra na API
    const response = await fetch(url) // Procura item na API

    const data = await response.json() // Transforma o que o response recebe em JSON

    // Convertendo a string JSON contida em `data.contents` para um objeto
    const gamesData = JSON.parse(data.contents) 

    const fotoimg = []

    console.log(gamesData)

    gamesData.forEach(function(jogo) {
        fotoimg.push(jogo.thumbnail)
    })

    return fotoimg
}

function criarImagem(link) {
    const galeria = document.getElementById('galeria')
    const novaImg = document.createElement('img')

    novaImg.src = link
    galeria.appendChild(novaImg)
}

async function preencherFotos() {
    const jogo = document.getElementById('jogo').value
    const fotos = await pesquisarJogo(jogo)

    console.log(fotos)

    const galeria = document.getElementById('galeria')

    galeria.replaceChildren('')
    fotos.forEach(criarImagem)
}

document.getElementById('pesquisar')
    .addEventListener('click', preencherFotos)
