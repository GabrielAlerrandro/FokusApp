const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const mscPlay = new Audio('/sons/play.wav')
const mscPause = new Audio('/sons/pause.mp3')
const mscBeep = new Audio('/sons/beep.mp3')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon") 
tempoNaTela = document.querySelector('#timer')

let intervaloID = null

musica.loop = true

let tempoDecorridoEmSegundos = 1500


focoBt.addEventListener('click', () =>{
     tempoDecorridoEmSegundos = 1500

 alterarContexto('foco')
 focoBt.classList.add('active')

})

curtoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300

alterarContexto('descanso-curto')
curtoBt.classList.add('active')

})
longoBt.addEventListener('click', () =>{
     tempoDecorridoEmSegundos = 900

alterarContexto('descanso-longo')
longoBt.classList.add('active')

})

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
       musica.play()
    }else{
        musica.pause()
    }
})



function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto )
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case 'foco':
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break
        case 'descanso-curto':
            titulo.innerHTML = ` Que tal uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break
        default:
            break
    } 

}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        mscBeep.play()
        alert("Tempo Finalizado!")
        mscBeep.pause()
        zerar()
        return
    }

        tempoDecorridoEmSegundos -= 1
        mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if (intervaloID){
        zerar()
        mscPause.play()
        return
    }
    mscPlay.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`)
}

function zerar(){
clearInterval(intervaloID)
iniciarOuPausarBt.textContent = "Começar"
iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloID = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000 ) 
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()