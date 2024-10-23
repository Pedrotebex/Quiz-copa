document.addEventListener("DOMContentLoaded", () => {
    // Seleção de elementos do DOM
    const questionContainer = document.getElementById("question-container");
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const checkAnswerButton = document.getElementById("check-answer");
    const nextButton = document.getElementById("next-button");
    const progressBar = document.getElementById("progress-bar");
    const progressContainer = document.getElementById("progress-container"); // Seleciona o container da barra

    let currentQuestionIndex = 0; // Para rastrear a pergunta atual
    let selectedAnswer = ""; // Armazena a resposta selecionada

    // Função para mostrar a pergunta
    function showQuestion(question) {
        questionElement.innerText = question.question;
        answerButtons.innerHTML = ""; // Limpa as opções anteriores

        // Adiciona as opções de resposta
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.style.color = "black"; // Define a cor do texto para preto
            button.style.backgroundColor = "white"; // Define fundo branco
            button.classList.add("px-4", "py-2", "rounded", "hover:bg-gray-200", "transition", "duration-300");
            button.addEventListener("click", () => selectAnswer(option, button)); // Passa o botão clicado
            answerButtons.appendChild(button);
        });

        checkAnswerButton.classList.remove("hidden"); // Botão de checar resposta sempre visível
        nextButton.classList.add("hidden"); // Oculta o botão de próxima pergunta

        // Atualiza a barra de progresso
        updateProgressBar();
    }

    // Exibe a primeira pergunta
    showQuestion(questions[currentQuestionIndex]);

    // Função para lidar com a seleção de resposta
    function selectAnswer(selectedOption, clickedButton) {
        selectedAnswer = selectedOption; // Armazena a resposta selecionada
        console.log("Você selecionou:", selectedAnswer); // Log para depuração

        // Adiciona a classe 'selected' a todas as opções
        const buttons = answerButtons.querySelectorAll("button");
        buttons.forEach(button => {
            button.classList.remove("selected"); // Remove a classe de seleção
            button.style.backgroundColor = "white"; // Restaura o fundo branco
            button.style.color = "black"; // Restaura a cor do texto para preto
        });

        // Marca a opção clicada
        clickedButton.classList.add("selected");
        clickedButton.style.backgroundColor = "blue"; // Altera o fundo para azul
        clickedButton.style.color = "white"; // Altera a cor do texto para branco
    }

    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100; // Corrigido para não incluir a primeira pergunta
        progressBar.style.width = `${progressPercentage}%`; // Atualiza a largura da barra
    }

    // Evento para verificar a resposta
    checkAnswerButton.addEventListener("click", () => {
        if (!selectedAnswer) {
            alert("Selecione uma opção antes de checar a resposta!"); // Alerta se nada estiver selecionado
            return; // Retorna para não prosseguir
        }

        const correctAnswer = questions[currentQuestionIndex].correctAnswer; // Obtém a resposta correta
        const buttons = answerButtons.querySelectorAll("button");

        console.log("Resposta correta:", correctAnswer); // Log para depuração

        // Verifica se a resposta selecionada está correta
        buttons.forEach(button => {
            if (button.innerText === selectedAnswer) {
                if (selectedAnswer === correctAnswer) {
                    // Resposta correta
                    button.style.backgroundColor = "green"; // Define fundo verde para a resposta correta
                    button.style.color = "white"; // Altera a cor do texto para branco
                    checkAnswerButton.classList.add("hidden"); // Esconde o botão de checar resposta
                    nextButton.classList.remove("hidden"); // Mostra o botão de próxima pergunta
                } else {
                    // Resposta errada
                    button.style.backgroundColor = "red"; // Define fundo vermelho para a opção errada
                    button.style.color = "white"; // Altera a cor do texto para branco
                }
            } else if (button.innerText === correctAnswer) {
                // Apenas marca a opção correta se a resposta estiver errada
                if (selectedAnswer !== correctAnswer) {
                    button.style.backgroundColor = "white"; // Mantém fundo branco para a opção correta
                    button.style.color = "black"; // Restaura a cor do texto para preto
                }
            }
        });
    });

    // Evento para ir para a próxima pergunta
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++; // Incrementa o índice da pergunta atual
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]); // Mostra a próxima pergunta
            selectedAnswer = ""; // Limpa a resposta selecionada
            nextButton.classList.add("hidden"); // Oculta o botão de próxima pergunta
            checkAnswerButton.classList.remove("hidden"); // Mostra o botão de checar resposta
        } else {
            // Mensagem de finalização do quiz
            questionElement.innerHTML = "<div class='text-2xl text-center'>Você finalizou o quiz!</div>"; // Centraliza e aumenta o tamanho da fonte
            answerButtons.innerHTML = ""; // Limpa as opções de resposta
            nextButton.classList.add("hidden"); // Esconde o botão de próxima pergunta
            checkAnswerButton.classList.add("hidden"); // Esconde o botão de checar resposta
            progressContainer.style.display = "none"; // Oculta a barra de progresso

            // Redireciona após 2 segundos
            setTimeout(() => {
                window.location.href = "index.html"; // Redireciona para o arquivo index.html
            }, 2000); // 2000 milissegundos = 2 segundos
        }
    });
});
