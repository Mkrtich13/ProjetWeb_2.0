/*
  Author : Antonio Dedej
*/

var g8Container = document.querySelector('#g8container');
var g8q1 = [
  "Comment crée une base de donées ?",  //for every array[0] is the qusetion
  "CREATE DATABASE ma_base",  //for every array[1] is the good answer
  "ENTER DATABASE ma_base",   //for every array[bigger than 1] is the wrong answer
  "CREATE DATABASE",
  "INSERT DATABASE ma_base"];
var g8q2 = [
  "Comment crée une table ?",
  "CREATE TABLE ... (colonne1 type_donnees, colonne2 type_donnees)",
  "CREATE TABLE ...",
  "CREATE TABLE",
  "LOAD TABLE ... (colonne1 type_donnees, colonne2 type_donnees)"];
var g8q3 = [
  "Comment ajouter une colonne dans une table ?",
  "ADD",
  "INSERT",
  "ENTER",
  "CREATE"];
var g8q4 = [
  "Comment lire les données d'une table ?",
  "SELECT ... FROM ...",
  "LOAD ... FROM ...",
  "LOAD ... IN ...",
  "SELECT ... IN ..."];
var g8q5 = [
  "Quel mot clé utiliser pour lire les données d'une table avec une seul condition ?",
  "WHERE con",
  "WHEN con",
  "WHEN con1 AND con2",
  "WHERE con1 OR con2"];
var g8q6 = [
  "Quel mot clé utiliser pour lire les données d'une table avec plusieurs condition ?",
  "WHERE con1 AND con2",
  "WHEN con1 AND con2",
  "WHEN con1 OR con2",
  "WHERE con1 AND OR con2"];
var g8q7 = [
  "Quel mot clé utiliser pour unir les résultats de 2 tableaux sans afficher les doublons ?",
  "UNION",
  "MERGE",
  "U *",
  "MERGE *"];
var g8q8 = [
  "Quel mot clé utiliser pour unir les résultats de 2 tableaux même avec les doublons ?",
  "UNION ALL",
  "UNION *",
  "SELECT *",
  "UNION"];
var g8q9 = [
  "Quel mot clé utiliser pour insérer des donéesss dans une table ?",
  "INSERT INTO",
  "ADD INTO",
  "INSERT IN",
  "ADD IN"];
var g8q10 = [
  "Quel mot clé utiliser pour obtenir l'intersection des résultats de 2 tables ?",
  "INTERSECT",
  "INTER",
  "INTERSECT ALL",
  "INTER ALL"];
var g8QA = [g8q1, g8q2, g8q3, g8q4, g8q5, g8q6, g8q7, g8q8, g8q9, g8q10]; // All questions and answers array holder..
var g8QARandIndex;
var g8ResultGoodOpinions = ["Very Good !","You're the BOSS !","We're Proud Of You ! ^_^"];
var g8ResultMiddleOpinions = ["Not Bad !","You Can Do Better !","Good !"];
var g8ResultLowOpinions = ["Try Better Next Time !","Not To Good","That's All ?"];
var g8Questions = document.createElement("h2");
g8Questions.classList.add("p3-4","pt-1");
var g8Answers = [];
var g8AnswersContainer = document.createElement("div");
var g8Points = 0;
var g8PointsCounter = 0;
var g8TimerCount = 11;
var g8Timer = 11;
var g8QuestStart = false;
var g8TimerContainer = document.createElement("div");
var g8Interval;
var g8TimerUpdate;

function g8Tm() {
  if (g8QuestStart) {
    g8Timer = g8Timer - 1;
    g8TimerContainer.innerHTML = "Your Time : " + g8Timer.toString() + "s";
    g8TimerUpdate = setTimeout(function () {
      g8Tm();
    }, 1000);
  }
}

function g8RandOp(tab) {
  var i = Math.floor(Math.random() * tab.length);
  return tab[i];
}

g8Container.appendChild(g8TimerContainer);
g8Quest();
g8Tm();
function g8Quest() {
  if (g8QA.length === 0) {
    g8QuestStart = false;
    g8RemoveAllChildren(g8Questions);
    g8RemoveAllChildren(g8AnswersContainer);
    g8RemoveAllChildren(g8TimerContainer);
    var g8Result = document.createElement("div");
    g8Result.classList.add("d-inline-block","border","p-2");
    var g8ResultOpinion = document.createElement("h1");
    g8ResultOpinion.classList.add("text-center");
    var g8ResultScore = document.createElement("p");
    g8ResultScore.classList.add("text-center");
    if (g8PointsCounter > 8) {
      g8ResultOpinion.innerHTML = g8RandOp(g8ResultGoodOpinions);
      g8ResultScore.innerHTML = "Your score from this mini-game is: " + g8PointsCount(g8PointsCounter) + " / 10";
      g8Result.classList.add("border-success");
    } else if (g8PointsCounter > 5) {
      g8ResultOpinion.innerHTML = g8RandOp(g8ResultMiddleOpinions);
      g8ResultScore.innerHTML = "Your score from this mini-game is: " + g8PointsCount(g8PointsCounter) + " / 10";
      g8Result.classList.add("border-success");
    } else if (g8PointsCounter > 2) {
      g8ResultOpinion.innerHTML = g8RandOp(g8ResultLowOpinions);
      g8ResultScore.innerHTML = "Your score from this mini-game is: " + g8PointsCount(g8PointsCounter) + " / 10";
      g8Result.classList.add("border-warning");
    } else {
      g8ResultOpinion.innerHTML = "Wtf is this score ?";
      g8ResultScore.innerHTML = "Your score from this mini-game is: " + g8PointsCount(g8PointsCounter) + " / 10";
      g8Result.classList.add("border-danger");
    }
    g8Result.appendChild(g8ResultOpinion);
    g8Result.appendChild(g8ResultScore);
    g8Container.appendChild(g8Result);
    setTimeout(function () {
      loadNextMiniGame();
    }, 5000); //ater 5 sec
  } else {
    g8QuestStart = true;
    g8QARandIndex = Math.floor(Math.random() * g8QA.length);
    g8AnswersFunc(g8QA[g8QARandIndex]);
    g8Interval = setTimeout(function () {
      g8QA.splice(g8QARandIndex, 1);
      g8Timer = 11;
      g8Quest();
    }, g8TimerCount * 1000);
  }
}

function g8AnswersFunc(tab) {
  g8AnswersContainer.innerHTML = "";
  var i = 1;
  var children;
  var g8Temp;

  while (i < tab.length) {
    if (i === 1) {
      g8Questions.innerHTML = tab[0];
      g8Container.appendChild(g8Questions);
      g8Answers = document.createElement("button");
      g8Answers.id = "goodAnswer";
      g8Answers.classList.add("btn","btn-light","border","border-primary","m-2");
      g8Answers.innerHTML = tab[1];
    } else {
      g8Answers = document.createElement("button");
      g8Answers.classList.add("badAnswers");
      g8Answers.classList.add("btn","btn-light","border","border-primary","m-2");
      g8Answers.innerHTML = tab[i];
    }
    g8AnswersContainer.appendChild(g8Answers);
    i++;
  }

  if (g8AnswersContainer.hasChildNodes()) {
    children = g8AnswersContainer.childNodes;
    var j = 0;
    g8Temp = [];
    while (j < children.length) {
      g8Temp[j] = children[j].outerHTML;
      j++;
    }

    g8RemoveAllChildren(g8AnswersContainer);
    g8AnswersContainer.innerHTML = g8shuffle(g8Temp);

    for (var l = 0; l < children.length; l++) {
      if (children[l].textContent === ",") {
        children[l].textContent = "";
      }
    }
  }

  g8Container.appendChild(g8AnswersContainer);

  function g8GoodAnsFunc() {
    clearTimeout(g8Interval);
    clearTimeout(g8TimerUpdate);
    g8GoodAnswerBtn.classList.add("border-success","bg-success");
    g8GoodAnswerBtn.disabled = true;
    document.getElementsByClassName("badAnswers")[0].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[1].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[2].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[0].disabled = true;
    document.getElementsByClassName("badAnswers")[1].disabled = true;
    document.getElementsByClassName("badAnswers")[2].disabled = true;
    setTimeout(function () {
      clearTimeout(g8Interval);
      clearTimeout(g8TimerUpdate);
      g8Timer = 11;
      g8QA.splice(g8QARandIndex, 1);
      g8PointsCounter++;
      g8Quest();
      g8Tm();
      addPoints(g8Points + 1);
    }, 2000);
  }

  function g8BadAnswerFunc() {
    clearTimeout(g8Interval);
    clearTimeout(g8TimerUpdate);
    g8GoodAnswerBtn.classList.add("border-success","bg-success");
    g8GoodAnswerBtn.disabled = true;
    document.getElementsByClassName("badAnswers")[0].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[1].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[2].classList.add("border-danger","bg-danger");
    document.getElementsByClassName("badAnswers")[0].disabled = true;
    document.getElementsByClassName("badAnswers")[1].disabled = true;
    document.getElementsByClassName("badAnswers")[2].disabled = true;
    setTimeout(function () {
      clearTimeout(g8Interval);
      clearTimeout(g8TimerUpdate);
      g8Timer = 11;
      g8QA.splice(g8QARandIndex, 1);
      g8Quest();
      g8Tm();
    }, 2000);
  }

  var g8GoodAnswerBtn = document.querySelector("#goodAnswer");
  g8GoodAnswerBtn.addEventListener('click', g8GoodAnsFunc);
  var n = 0;

  while (n < g8Temp.length) {
    switch (n) {
      case 0:
        document.getElementsByClassName("badAnswers")[0].addEventListener('click', g8BadAnswerFunc);
        break;
      case 1:
        document.getElementsByClassName("badAnswers")[1].addEventListener('click', g8BadAnswerFunc);
        break;
      case 2:
        document.getElementsByClassName("badAnswers")[2].addEventListener('click', g8BadAnswerFunc);
        break;
    }
    n++;
  }
  return tab;
}

function g8PointsCount(count) {
  return count.toString();
}

function g8RemoveAllChildren(elm) {
  while (elm.firstChild) {
    elm.removeChild(elm.firstChild);
  }
  return elm;
}

function g8shuffle(o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
