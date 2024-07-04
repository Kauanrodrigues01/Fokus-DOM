const html = document.querySelector('html')

// botões para alterar o modo
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

//elementos alterados
const banner = document.querySelector('.app__image')
const displayTempo = document.querySelector('#timer')
const titulo = document.querySelector('.app__title')

// audios
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

//cronômetro
const startPauseBt = document.querySelector('#start-pause')
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioBeep = new Audio('/sons/beep.mp3')
const imgBtComecar = startPauseBt.children[0]
let tempoDecorridoEmSegundos = 5
let intervaloId = null

musicaFocoInput.addEventListener('change', ()=>{
    if (musica.paused){
        musica.currentTime = 15
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarModoDeTempo('foco',  focoBt, '25:00')
})

curtoBt.addEventListener('click', () => {
    alterarModoDeTempo('descanso-curto', curtoBt, '05:00')
})

longoBt.addEventListener('click', () => {
    alterarModoDeTempo('descanso-longo', longoBt, '15:00')
})

// Função para alternar o modo de descanso
const alterarModoDeTempo = (contexto, el, temporizador) => {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    focoBt.classList.remove('active')
    curtoBt.classList.remove('active')
    longoBt.classList.remove('active')

    el.classList.add('active')

    displayTempo.innerHTML = temporizador

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = ()=>{
    if (tempoDecorridoEmSegundos > 0){
        tempoDecorridoEmSegundos -= 1
        console.log('temporizador: ' + tempoDecorridoEmSegundos)
    } else{
        zerar()
        audioBeep.play()
        alert('Tempo finalizado!')
        return
    }
}

const iniciarOuPausar = () => {
    if(intervaloId){
        audioPausa.volume = 0.7
        audioPausa.play()
        imgBtComecar.setAttribute('scr', 'imagens/play_arrow.png')
        zerar()
        return
    }
    audioPlay.play()
    imgBtComecar.setAttribute('src', '/imagens/pause.png')
    intervaloId = setInterval(contagemRegressiva, 1000)
}

const zerar = () => {
    clearInterval(intervaloId)
    intervaloId = null
}

startPauseBt.addEventListener('click', iniciarOuPausar)