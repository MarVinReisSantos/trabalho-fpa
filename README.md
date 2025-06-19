# Projeto: Descobrindo padrões — a jornada para sincronizar dados complexos

## Disciplina
Fundamentos de Projeto e Análise de Algoritmos

## Integrantes
- Gabriel, Marcos, Riquelme

## Descrição
Este projeto resolve o problema de encontrar todas as **maiores subsequências comuns (LCS)** entre duas sequências de eventos. É uma tarefa essencial em ambientes de análise de dados, onde diferentes fontes precisam ser sincronizadas com precisão.

A solução foi implementada com uma interface gráfica usando HTML, CSS e JavaScript. Utilizamos **programação dinâmica** para calcular a LCS e **backtracking** para recuperar todas as soluções possíveis sem repetições.

---

## Respostas às perguntas

### 1. Como a programação dinâmica foi aplicada na solução?
Utilizamos programação dinâmica para preencher uma matriz `dp[i][j]`, onde cada célula representa o comprimento da maior subsequência comum entre os prefixos `a[0..i-1]` e `b[0..j-1]`.

A matriz é preenchida com as seguintes regras:
- Se `a[i-1] == b[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1`
- Caso contrário: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

Essa técnica evita a recomputação de subproblemas e garante desempenho eficiente.

---

### 2. Por que o uso de backtracking é necessário neste problema?
A programação dinâmica apenas calcula o **comprimento** da maior subsequência comum. Para recuperar **todas as subsequências distintas com esse comprimento**, usamos backtracking:

- A partir da matriz `dp`, a função `backtrack` explora todos os caminhos possíveis que resultam no comprimento máximo.
- A abordagem recursiva garante que todas as soluções válidas (sem repetição) sejam retornadas.

---

### 3. Houve desafios na implementação? Quais? Como foram superados?
Sim, os principais desafios foram:

- **Evitar repetições nas subsequências:** Usamos a estrutura `Set` para garantir unicidade.
- **Gerenciar a recursão eficientemente:** Adicionamos um `Map` (`memo`) para memorizar resultados intermediários e evitar recomputações excessivas.
- **Interface amigável:** Integramos a lógica ao HTML e validamos as entradas com expressões regulares.

---

### 4. Qual é a complexidade da solução proposta?

#### Apenas com programação dinâmica:
- **Construção da matriz `dp`**: O(m × n), onde m = |a| e n = |b|
- **Espaço**: O(m × n)

#### Programação dinâmica + backtracking:
- **Construção da matriz `dp`**: O(m × n)
- **Backtracking**:
  - Pior caso: até O(2^L), onde L é o comprimento da LCS.
  - Porém, limitado a 1000 soluções únicas, conforme enunciado.
- **Espaço**: O(m × n + quantidade de subsequências)

---

### 5. O que o grupo aprendeu ao resolver esse problema?

- Aplicação prática de programação dinâmica para problemas de comparação de sequências.
- Uso de backtracking para reconstruir soluções múltiplas.
- Importância da otimização com memoização.
- Integração de algoritmos com interfaces gráficas interativas.
- Cooperação em grupo para planejar e dividir tarefas de forma eficiente.

---

## Como executar

1. Abra o arquivo `.html` em um navegador moderno.
2. Digite as duas sequências nos campos correspondentes.
3. Clique em “Processar” para visualizar as subsequências comuns mais longas.

---

## Licença
Projeto acadêmico sem fins lucrativos. Proibida a cópia.

