class Forca {

  //Confesso que nunca tinha mexido com javascript na vida! Foi
  //divertido aprender a linguagem enquanto fazia o desafio, peço
  //desculpas se eu fiz o uso errado de alguma nomenclatura ou atropelei
  //alguma boa prática!

  //Método construtor, iniciando todos os atributos necessários
  constructor(_palavra){
    this._estadoAtual = "aguardando chute";
    this._resposta = _palavra;
    this._letrasChutadas = [];
    this._vidas = 6;
    this._palavra = this.formarPalavra(_palavra.length) ;
  }

  //Este método é responsável por ler o tamanho da palavra 
  //para formar o array de "dica" exibido em cada rodada
  formarPalavra(n){
    let word = [];
    for(var c = 0; c < n; c++){
      word.push("_")
    }
    return word;
  }

  //O método chutar apenas recebe a letra do usuário, todas as ações
  //estão encapsuladas em outras funções
  chutar(letra) { 
    if(this.Chute_Validator(letra) == true){
      this.Chute_Manager(letra);
    }
    this.progression_Manager();
  }

  buscarEstado() { 
    return this._estadoAtual; 
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this._letrasChutadas,
          vidas: this._vidas, 
          palavra: this._palavra, 
      }
  }

  //Método que valida se o chute feito pelo usuário é valido, ou seja
  //não é uma letra repetida ou alguma expressão com mais de uma letra.
  //Ele também já adiciona a letra no array de letras chutadas caso
  //seja uma letra nova
  Chute_Validator(chute){
    let isValid = true;
    if(this._letrasChutadas.includes(chute)){
      isValid = false;
    } else if (chute.length > 1){
      isValid = false;
    }
    if (isValid == true){
      this._letrasChutadas.push(chute);
    }
    return isValid;
  }

  //Este método guarda todas as ações a serem tomadas caso um chute seja
  //válido (verificar se a letra está na palavra e substituir no 
  // array de dicas ou subtrair uma vida)
  Chute_Manager(letra){
    let OccurrencesIndex = [];
    if(this._resposta.includes(letra) == false ){
      this._vidas = this._vidas - 1;
    } else{
      for(var i = 0; i < this._resposta.length; i++){
        if (this._resposta.substring(i, i + 1) == letra){
          OccurrencesIndex.push(i);
        }
      }
      for(var i = 0; i < this._palavra.length; i++){
        if(OccurrencesIndex.includes(i)){
          this._palavra[i] = letra;
        }
      }
    }
  }

  //Método que verifica se o estado do jogo deve ser alterado
  progression_Manager(){
    if(this._vidas == 0){
      this._estadoAtual = "perdeu";
    } else if (this._palavra.includes("_") == false){
      this._estadoAtual = "ganhou";
    }
  }
}

module.exports = Forca;
