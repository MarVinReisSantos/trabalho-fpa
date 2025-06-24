// Cabeçalho
// Autores: Gabriel, Marcos, Riquelme
// Versão: 1.3
// Data: 19 de junho de 2025
// Descrição: Interface gráfica que encontra todas as maiores subsequências comuns entre duas strings usando DP + backtracking

// Função que valida se a entrada possui apenas letras minúsculas e até 80 caracteres
function validarEntrada(str) {
  return /^[a-z]{1,80}$/.test(str);
}

// Função principal que coleta os dados da interface, valida e chama os algoritmos
function processarSequencias() {
  const helena = document.getElementById("helena").value.trim();
  const marcus = document.getElementById("marcus").value.trim();
  const errorDiv = document.getElementById("error");
  const outputDiv = document.getElementById("output");
  errorDiv.innerText = "";
  outputDiv.innerText = "";

  // Validação básica das entradas
  if (!validarEntrada(helena) || !validarEntrada(marcus)) {
    errorDiv.innerText = "As sequências devem conter apenas letras minúsculas de 'a' a 'z' e ter até 80 caracteres.";
    return;
  }

  // Chama a função principal de LCS e exibe o resultado ordenado
  const resultados = encontrarLCS(helena, marcus);
  resultados.sort();
  outputDiv.innerText = resultados.join("\n");
}

function validarEntradaNumerica(str) {
  // Função que valida se a entrada é um número inteiro entre 1 e 10

  const num = parseInt(str, 10);
  return !isNaN(num) && num >= 1 && num <= 10;
}

function processarSequenciasDinamico(){
  // Função que obtém o número de entradas, valida, gera os campos de entrada e processa as sequências

  // Obtém o valor do campo de entrada em string e remove espaços em branco
  const d_str = document.getElementById("numEntradas").value.trim();
  const errorDiv = document.getElementById("error");

  // Chama a função de validação para verificar se o número de entradas é válido
  if (!validarEntradaNumerica(d_str)) {
    // Se a validação falhar, exibe uma mensagem de erro
    errorDiv.innerText = "O número de entradas deve ser um inteiro entre 1 e 10.";
    return;
  }
  // Se a validação passar, converte a string para número inteiro
  const d = parseInt(d_str, 10);
  // Limpa o campo de erro
  errorDiv.innerText = "";

  
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
