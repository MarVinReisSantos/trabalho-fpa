// Cabeçalho
// Autores: Gabriel, Marcos, Riquelme, Victor
// Versão: 1.4
// Data: 24 de junho de 2025
// Descrição: Interface gráfica que encontra todas as maiores subsequências comuns entre duas strings usando DP + backtracking


let iteracaoAtual = 0; // Variável global para controlar a iteração atual
let sequenciasGeradas = []; // Variável global para armazenar as sequências geradas
let maxIteracoes = 0; // Variável global para armazenar o número máximo de iterações

// Função que valida se a entrada possui apenas letras minúsculas e até 80 caracteres
function validarEntrada(str) {
  return /^[a-z]{1,80}$/.test(str);
}

// Função que valida se a entrada é um número inteiro entre 1 e 10
function validarEntradaNumerica(str) {

  const num = parseInt(str, 10);
  return !isNaN(num) && num >= 1 && num <= 10;
}

// Função que coleta os dados da interface atual, valida, chama os algoritmos e armazena os resultados
function processarSequenciaAtual(botaoClicado) {
  const helena = document.getElementById("helena").value.trim();
  const marcus = document.getElementById("marcus").value.trim();
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");
  const proxBtn = document.getElementById("proxBtn");
  const botaoClicadoId = botaoClicado.id;

  errorDiv.innerText = "";
  outputDiv.innerText = "";

  // Validação básica das entradas
  if (!validarEntrada(helena) || !validarEntrada(marcus)) {
    errorDiv.innerText = "As sequências devem conter apenas letras minúsculas de 'a' a 'z' e ter até 80 caracteres.";
    return;
  }
  var resultados = [];
  if(botaoClicadoId === "dyn_prog") {
    // Solução com Programação Dinâmica
    var dp = construirMatrizDP(helena, marcus);
    resultados = dp[helena.length][marcus.length];
  }
  else if(botaoClicadoId === "dpbt") {
    // Solução com Backtracking e Programação Dinâmica
    resultados = encontrarLCS(helena, marcus);
  }
  
  // Ordena os resultados para exibição
  resultados.sort();
  outputDiv.innerText = resultados.join("\n");

  // Armazena a sequência atual
  sequenciasGeradas[iteracaoAtual] = { iteracao: iteracaoAtual + 1, helena, marcus, resultados };

  if (iteracaoAtual < maxIteracoes - 1) {
    // Mostra o botao proximo apos confirmar que a entrada é válida
    proxBtn.style.display = "block";
  }
  else {
    // Se for a última iteração, esconde o botão e exibe o botão de reiniciar
    proxBtn.style.display = "block";
    proxBtn.innerText = "Ver resultados";
    proxBtn.onclick = mostrarResultados;
  }
}

// Função que avança para a próxima iteração, atualizando a interface e os dados
function proximaIteracao() {
  iteracaoAtual++;
  gerarCamposEntrada();
}


// Função principal que obtém o número de entradas, valida, gera os campos de entrada e processa as sequências
function processarSequenciasDinamico(){

  // Obtém o valor do campo de entrada em string e remove espaços em branco
  const d_str = document.getElementById("numEntradas").value.trim();
  const errorDiv = document.getElementById("error");

  // Chama a função de validação numerica para verificar se o número de entradas é válido
  if (!validarEntradaNumerica(d_str)) {
    // Se a validação falhar, exibe uma mensagem de erro
    errorDiv.innerText = "O número de entradas deve ser um inteiro entre 1 e 10.";
    return;
  }
  // Se a validação passar, converte a string para número inteiro
  maxIteracoes = parseInt(d_str, 10);
  
  errorDiv.innerText = ""; // Limpa a mensagem de erro caso exista
  document.getElementById("entradasForm").style.display = "none";
  gerarCamposEntrada(); // Gera os campos de entrada para Helena e Marcus
} 

function mostrarResultados() {
  // Função que exibe os resultados das sequências processadas
  const sequenciaInputs = document.getElementById("sequenciaInputs");
  sequenciaInputs.style.display = "none"; // Esconde os campos de entrada
  document.getElementById("proxBtn").style.display = "none";
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.style.display = "block"; // Mostra a div de resultados

  htmlText = "";
  // Itera sobre as sequências geradas e constrói o HTML para exibição
  for (const seq of sequenciasGeradas) {
    htmlText += `<b>Iteração ${seq.iteracao}:</b><br>`;
    htmlText += `Eventos de Helena: <span class="helena">${seq.helena}</span><br>`;
    htmlText += `Eventos de Marcus: <span class="marcus">${seq.marcus}</span><br>`;
    htmlText += `Subsequências Comuns: <span class="resultado">${seq.resultados.join(", ")}</span><br><br>`;
  }
  resultadosDiv.innerHTML = htmlText; // Atualiza o conteúdo da div de resultados

  // Adiciona o botão de reiniciar
  resultadosDiv.innerHTML += `<button id="reiniciarBtn" onclick="reiniciar()">Reiniciar</button>`;

}

function reiniciar() {
  // Função que reinicia o estado da aplicação, limpando as variáveis e a interface
  iteracaoAtual = 0;
  sequenciasGeradas = [];
  maxIteracoes = 0;
  document.getElementById("entradasForm").style.display = "block";
  document.getElementById("sequenciaInputs").style.display = "none";
  document.getElementById("resultados").style.display = "none";
  document.getElementById("numEntradas").value = "";
  const proxBtn = document.getElementById("proxBtn");
  proxBtn.innerText = "Próximo";
  proxBtn.onclick = proximaIteracao;
  proxBtn.style.display = "none";
}

function gerarCamposEntrada() {
  // Função que gera os campos de entrada para Helena e Marcus cada vez que é chamada

  const container = document.getElementById("sequenciaInputs");

  // Resolve problema de exibição do container apos reiniciar
  container.style.display = "block";

  // HTML para os campos de entrada
  container.innerHTML = `
    <b><p>Iteração ${iteracaoAtual + 1} de ${maxIteracoes}</p></b>
  <div class="input-group">
      <label for="helena">Eventos de Helena:</label>
      <input type="text" id="helena" maxlength="80" placeholder="Ex: ijkijkii">
    </div>
    
    <div class="input-group">
      <label for="marcus">Eventos de Marcus:</label>
      <input type="text" id="marcus" maxlength="80" placeholder="Ex: ikjikji">
    </div>

    <button onclick="processarSequenciaAtual(this)" id="dpbt">Processar DP+BT</button>
    <button onclick="processarSequenciaAtual(this)" id="dyn_prog">Processar DP</button><br><br>
    <div class="output" id="output"></div>
  `;
  document.getElementById("output").innerText = "";
  document.getElementById("error").innerText = "";
  // corrige problema de exibição do botão de próximo
  document.getElementById("proxBtn").style.display = "none";
}

// Cria uma matriz dp para armazenar o comprimento das subsequências comuns entre prefixos de a e b
function construirMatrizDP(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        // Se os caracteres forem iguais, soma 1 ao valor da diagonal anterior
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Caso contrário, pega o maior valor entre cima ou esquerda
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

// Função recursiva que reconstrói todas as subsequências usando backtracking
function backtrack(dp, a, b, i, j, memo) {
  // Caso base: chegou ao início de alguma das strings
  if (i === 0 || j === 0) return new Set([""]);
  const key = `${i},${j}`;
  if (memo.has(key)) return memo.get(key);

  const result = new Set();

  // Se os caracteres forem iguais, segue na diagonal e adiciona o caractere
  if (a[i - 1] === b[j - 1]) {
    for (const sub of backtrack(dp, a, b, i - 1, j - 1, memo)) {
      result.add(sub + a[i - 1]);
    }
  } else {
    // Se os caminhos de cima ou da esquerda forem válidos (mantêm o comprimento máximo), explora ambos
    if (dp[i - 1][j] >= dp[i][j - 1]) {
      for (const sub of backtrack(dp, a, b, i - 1, j, memo)) result.add(sub);
    }
    if (dp[i][j - 1] >= dp[i - 1][j]) {
      for (const sub of backtrack(dp, a, b, i, j - 1, memo)) result.add(sub);
    }
  }

  memo.set(key, result); // Memoriza o resultado
  return result;
}

// Função principal que une a construção da matriz e a extração das subsequências
function encontrarLCS(a, b) {
  const dp = construirMatrizDP(a, b); // Etapa de programação dinâmica
  const subsequencias = backtrack(dp, a, b, a.length, b.length, new Map()); // Etapa de backtracking
  return Array.from(subsequencias);
}
