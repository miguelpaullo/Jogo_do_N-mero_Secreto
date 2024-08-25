let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

// //Selecionando o titulo no ducumento index.html e atribuindo um valor
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// //Selecionando o paragrafo no ducumento index.html e atribuindo um valor
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Criar uma função que fará ambas as linhas a cima

function exibirNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //graças a linha 7 do index.html, que é um script, podemos narrar algo.
    //nesse caso narraremos um texto que será exibido na tela
    //e utilizamos a função "speak" para possibilitar a fala
    //rate para definir a velocidade da fala
    // e o segundo parãmetro da função é o idioma disponivel em: https://responsivevoice.org
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

//criando essa função para nao repetir linhas de codigo quando o jogo for reiniciado, somente chamaremos a função.
function exibirMensagem(){
    exibirNaTela('h1', 'Jogo do Número Secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e 100');
}

//chamando a função para iniciar o jogo
exibirMensagem();

//criar uma função para verificar o chute, mesmo nome que utilizamos no html
function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você adivinhou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirNaTela('p', 'O número secreto é menor!');
        } else{
            exibirNaTela('p', 'O número secreto é maior!');
        }//tentativas = tentativas + 1
        tentativas++;
        limparcampo()
    }
    
}

function gerarNumeroSecreto(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }
    //includes serve para verificar se o numero escolhido já esta dentro da lista, ou seja, se ja foi sorteado antes
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    } else{
        //adicionado o número escolhido na lista na ultima posição por meio do "push"
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroSecreto()
    limparcampo()
    tentativas = 1
    exibirMensagem()
    //desabilitar o botão reiniciar, pois acabamos de reiniciar, o botão só deve ficar habilitado caso acertemos
    document.getElementById('reiniciar').setAttribute('disabled',true)
}