# Documentação das funções do script

Abaixo há uma breve descrição de cada função do arquivo `script.js`.

## validarEntrada(str)
A função `validarEntrada(str)` recebe uma string dos campos de Helena e Marcus e checa se são strings válidas para os requisítos do trabalho, caso não sejam preenche o campo de erro.

## validarEntradaNumerica(str)

A função `validarEntradaNumerica(str)` recebe uma string do primeiro campo da interface, onde se insere um número de 1 a 10, referente às iterações necessárias. Esta função checa se é um número válido.

## processarSequenciaAtual() 

A função `processarSequenciaAtual()` extrai os textos dos campos de Helena e Marcus, realiza a validação destes campos com a função `validarEntrada(str)`, utiliza a função `encontrarLCS(a, b)` para obter o array de resultados com as subsequências, ordena o array e então armazena na variável global `sequenciasGeradas` para que o resultado seja mostrado no final, após isso, verifica a variável `iteracaoAtual`, caso ela seja igual a `maxIteracoes` aparecerá o botão para ver os resultados finais, caso contrário aparecerá o botão para a próxima iteração.

## proximaIteracao()

Atualiza a variável `iteracaoAtual` e chama a função `gerarCamposEntrada()` para mostrar os campos de Helena e Marcus para a próxima iteração, se houver.

## processarSequenciasDinamico()

Função principal para o gerenciamento das iterações. Primeiro valida a entrada númerica com `validarEntradaNumerica(str)` e atribui a entrada à variável global `maxIteracoes` e então gera os campos com `gerarCamposEntrada()`.

## mostrarResultados()

Exibe os resultados armazenados na variável `sequenciasGeradas`, criando a interface dinamicamente e o botão para reiniciar o processo.

## reiniciar()

Chamada após o botão "Reiniciar" ser apertado, restaura todas as variáveis e retorna a interface para o estado original.

## gerarCamposEntrada() 

Gera os campos de entrada para Marcus e Helena cada vez que é chamada.

## construirMatrizDP(a, b)

Cria a tabela dinâmica, a qual armazena o tamanho das subsequências em comum de `a` a `b`. Primeiro cria a tabela com tamanho (m + 1) x (n + 1) preenchida com 0. Após isso itera sobre a tabela para encontrar tamanhos iguais na posição anterior, se os valores forem iguais acrescenta 1 ao valor da diagonal, caso contrário utiliza o maior valor de cima ou da esquerda

## backtrack(dp, a, b, i, j, memo)

Utiliza a tabela dinâmica para reconstruir todas as subsequências com comprimento máximo usando backtracking com memoização. Quando os caracteres são iguais, segue a diagonal adicionando o caractere à subsequência. Quando diferentes, explora os caminhos (cima/esquerda) que mantêm o comprimento máximo da LCS, garantindo que todas as subsequências ótimas sejam encontradas. A memoização evita recalcular subproblemas já resolvidos.
O algoritmo funciona "de trás para frente" na tabela DP, reconstruindo as subsequências a partir dos valores já calculados.

## encontrarLCS(a, b)

Mescla a tabela da função `construirMatrizDP(a, b)` com a reconstrução das subsequências da função `backtrack(dp, a, b, i, j, memo)` para obtenção eficiente das subsequências em uma array que é retornada. 
