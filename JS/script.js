//Tâches à faire
//Comprendre le code JS
//Le classer dans les bons endroits
//Changer Les questions


// ====================================================
// =  Déclaration des variables globales              =
// ====================================================


// ====================================================
// =  Déclaration des événements                      =
// ====================================================



// ====================================================
// =  Code qui sera exécuté au chargement de la page  =
// ====================================================



// ====================================================
// =  Déclaration des fonctions                       =
// ====================================================

/*
Class Question
Paramètre Text = La question
Paramètre Choices = Les choix de réponses
Paramètre answer = La réponse

Il appelle la fonction isCorrestAnswer avec choice. 
Si vrai, choice va dans this.answer.
*/
class Question 
{
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
}
  
/*
Class Quiz 

Appelle la fonction getCurrentQuestion:
Retourne une position dans le tableau questions

Appelle la fonction guess: 
Il fait référence à l'index de question qui est un tableau. 
Fait la fonction qui vérifie la question
Si c'est vrai, il augmente le score
Augmente l'index

hasENded est une fonction qui coupe si l'index devient plus haut que le tableau de questions
*/
  class Quiz 
{
constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}
getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
}
guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
    }
    this.currentQuestionIndex++;
}
hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
}
}

let questions = [
    new Question("Comment calculer le PMP ?", ["Long*Larg*hauteur(po)/144", "Long*Larg*hauteur(mm)/70", "Long*Larg*hauteur(mm)/144", "Long*Larg*hauteur(po)/30"], "Long*Larg*hauteur(po)/144"),
    new Question("Quel bois n'est pas un considéré comme un bois dur ?", ["Chêne","Érable", "Peuplier", "Merisier"], "Peuplier"),
    new Question("Dans quel sens une pièce de bois est le plus solide?", ["Perpendiculaire au grain","C'est toujours solide", "En oblique", "Sens du grain"], "Sens du grain"),
    new Question("Quel est le type de matériel connexe le moins solide?", ["Métal","La mélamine", "Le contreplaqué", "L'aggloméré"], "L'aggloméré"),
    new Question("Quel habitude est important de faire lors de l'usinage d'une pièce de bois", ["Vérifier l'équerrage","Vérifier l'intégralité des machines", "Lire le plan", "Toutes ces réponses"], "Toutes ces réponses"),
  ];

/*
display est un ensemble de fonctions qui recoit en paramètre un id et un text

Cela permet d'éviter de répéter tout ce qui suit

elementShown :Affiche un text selon l'id
endQuiz: Affiche la fin du Quiz et le score
question: affiche la question
choices: Affiche les choix et confient la fonction guessHandler qui va faire l'évèmenent onclick
progress : Affiche question x / nombres de questions
*/
  
const display = {
elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
},
endQuiz: function() {
    endQuizHTML = `
    <h1>Quiz terminé !</h1>
    <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
},
question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
},
choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
    document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
    }
    }
    // affichage choix + prise en compte du choix
    for(let i = 0; i < choices.length; i++) {
    this.elementShown("choice" + i, choices[i]);
    guessHandler("guess" + i, choices[i]);
    }
},
progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
},
};

// Game logic
/*
Si le quiz a arrêté, affiche endQuiz
Sinon montre les questions, les choix et le progrès
*/
quizApp = () => {
if (quiz.hasEnded()) {
    display.endQuiz();
} else {
    display.question();
    display.choices();
    display.progress();
} 
}
// Create Quiz
/*
Variable qui regroupe tout le programme. 
*/
let quiz = new Quiz(questions);
quizApp();