var gamesApp = angular.module('gamesModule', []);
gamesApp.controller('gamesController', ['$scope','$http','$sce', function($scope,$http,$sce) {
    $scope.games = [
        {name:'Word Find'},
        {name:'Picture Match'},
        {name:'Q&A'}
    ];
	
	$scope.selectedIndex = 0;
	
	$scope.changeGame = function (index) {
		if($scope.selectedIndex != index) {
			$scope.selectedIndex = index;
		}
	};
	
	$scope.words = [
		{value:'Gregory',found:0},
		{value:'Prill',found:0},
		{value:'Awesome',found:0},
		{value:'AngularJS',found:0}
	];
	
	$scope.wordFound = function(index) {
		$scope.words[index].found = 1;
	};
	
	$scope.wordReset = function () {
		for (var i in $scope.words) {
			$scope.words[i].found = 0;
		}
	}
	
	$scope.picturematch = {
		score:0,
		currentPicture:0,
		options : [
			{name:'Data'},
			{name:'Warf'},
			{name:'Picard'},
			{name:'Q'},
			{name:'Riker'}
		],
		pictures : [
			{src:'startrek/picard.jpg'},
			{src:'startrek/riker.jpg'},
			{src:'startrek/data.jpg'},
			{src:'startrek/q.jpg'},
			{src:'startrek/warf.jpg'}
		],
		guesses : [
			{currentGuess:-1,correctGuess:2},
			{currentGuess:-1,correctGuess:4},
			{currentGuess:-1,correctGuess:0},
			{currentGuess:-1,correctGuess:3},
			{currentGuess:-1,correctGuess:1}
		]
	};
	
	$scope.pictureGuess = function (index, guess) {
		$scope.picturematch.guesses[index].currentGuess = guess;
		var score = 0;
		for (var i in $scope.picturematch.guesses) {
			if(	$scope.picturematch.guesses[i].currentGuess == $scope.picturematch.guesses[i].correctGuess) {
				score ++;
			}
		}
		$scope.picturematch.score = score;
	}
	
	$scope.pictureReset = function () {
		for (var i in $scope.picturematch.guesses) {
			$scope.picturematch.guesses[i].currentGuess = -1;
		}
		$scope.picturematch.score = 0;
		$scope.picturematch.currentPicture = 0;
	}
	
	$scope.questions = {
		score : 0,
		options : [
			{question: 'What language was this demo built to demonstrate?', answer: 'angularjs', guess: ''},
			{question: 'What is the first name of the developer that made this?', answer: 'Gregory', guess: ''},
			{question: 'Out of 10 points, what score does this demo get?', answer: '10', guess: ''}
		]
	}
	
	$scope.questionsCheck = function () {
		var score = 0;
		for (var i in $scope.questions.options) {
			if( $scope.questions.options[i].guess.toUpperCase() === $scope.questions.options[i].answer.toUpperCase() ){
				score ++;
			}
		}
		$scope.questions.score = score;
	}	
	
	$scope.questionsReset = function () {
		for (var i in $scope.questions.options) {
			$scope.questions.options[i].guess = '';
		}
		
		$scope.questions.score = 0;
	}
	
}]);

gamesApp.directive("wordfind", function() {
    return {
		restrict: 'E',
		templateUrl: "wordfind.html"
    };
});

gamesApp.directive("picturematch", function() {
    return {
		restrict: 'E',
		templateUrl: "picturematch.html"
    };
});

gamesApp.directive("questions", function() {
    return {
		restrict: 'E',
		templateUrl: "questions.html"
    };
});