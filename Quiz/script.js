const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const button = document.getElementById('button');
const button2 = document.getElementById('button2');


let score = 0;

function buildQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p class="h1 hero-title">${q.question}</p>`;

        q.options.forEach((option, i) => {
            const optionContainer = document.createElement('div');
            optionContainer.classList.add('section-text'); // Ajout de la classe à l'élément optionContainer
            optionContainer.style.display = 'flex'; // Utilisation de flexbox pour aligner les éléments horizontalement

            const radioBtn = document.createElement('input');
            radioBtn.type = 'radio';
            radioBtn.name = `question${index}`;
            radioBtn.value = option;
            optionContainer.appendChild(radioBtn);

            const label = document.createElement('label');
            label.textContent = option;
            optionContainer.appendChild(label);

            questionDiv.appendChild(optionContainer);
        });

        quizContainer.appendChild(questionDiv);
    });
}

function end() {
    window.location.href = "../Accueil.html";

}

function calculateScore() {
    const radioBtns = document.querySelectorAll('input[type="radio"]:checked');

    if (radioBtns.length !== questions.length) {
        alert("Veuillez répondre à toutes les questions avant de soumettre.");
        return;
    }

    score = 0;

    radioBtns.forEach((radioBtn, index) => {
        const userAnswer = radioBtn.value;
        const correctAnswer = questions[index].correctAnswer;

        if (userAnswer === correctAnswer) {
            score++;
        }
    });

    displayResult();
}

function displayResult() {
    quizContainer.style.display = 'none';
    button.style.display = 'none';
    resultContainer.style.display = 'block';
    button2.style.display = 'block';
    resultContainer.innerHTML = `<p class="h1 hero-title">Votre score est de ${score} sur ${questions.length}.</p>`;

    questions.forEach((q, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`).value;
        const correctAnswer = q.correctAnswer;

        const questionResult = document.createElement('div');
        questionResult.classList.add('question-result'); // Ajout de la classe CSS

        const questionTitle = document.createElement('p');
        questionTitle.classList.add('question-title'); // Ajout de la classe CSS
        questionTitle.textContent = q.question;

        const userAnswerText = document.createElement('p');
        userAnswerText.classList.add('user-answer'); // Ajout de la classe CSS
        userAnswerText.textContent = `Votre réponse : ${userAnswer}.`;

        const correctAnswerText = document.createElement('p');
        correctAnswerText.classList.add('correct-answer'); // Ajout de la classe CSS
        correctAnswerText.textContent = `Réponse correcte : ${correctAnswer}.`;

        if (userAnswer === correctAnswer) {
            questionResult.classList.add('correct-answer-bg'); // Ajout de la classe CSS pour la couleur verte
            questionResult.classList.add('correct-answer-text'); // Ajout de la classe CSS pour la couleur du texte en vert
        } else {
            questionResult.classList.add('wrong-answer-bg'); // Ajout de la classe CSS pour la couleur rouge
            questionResult.classList.add('wrong-answer-text'); // Ajout de la classe CSS pour la couleur du texte en rouge
        }

        questionResult.appendChild(questionTitle);
        questionResult.appendChild(userAnswerText);
        questionResult.appendChild(correctAnswerText);

        resultContainer.appendChild(questionResult);

        // Ajouter un saut de ligne entre chaque question
        resultContainer.appendChild(document.createElement('br'));
    });
}




buildQuiz();
