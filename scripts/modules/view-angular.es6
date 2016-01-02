import * as PD from './PD.es6';

var app = angular.module('app', []);

app.controller('ctrl', function($scope) {
    /**
     * 状态。1为展示，2为编辑
     * @type {number}
     */
    $scope.status = 1;

    $scope.wordTree = new PD.WordTree();

    $scope.data = {
        input: '',
        word: null,
        wordSpelling: null,
        wordList: []
    };

    $scope.method = {
        find: function(spelling) {
            $scope.data.wordList = $scope.wordTree.find(spelling);
        },
        show: function(index) {
            $scope.data.word = $scope.data.wordList[index];
            $scope.data.wordSpelling = $scope.data.word.getSpelling();
            $scope.data.wordList = [];
            $scope.status = 1;
        },
        init: function() {
            $scope.$watch('data.input', function() {
                $scope.method.find($scope.data.input);
            });
        },
        edit: function() {
            $scope.status = 2;
        },
        addRow: function(index) {
            $scope.data.word.getPOS()[index].addMeaning(new PD.Meaning(null, null));
        },
        delRow: function(index, meaningIndex) {
            $scope.data.word.getPOS()[index].getMeaning().splice(meaningIndex, 1);
        },
        update: function() {
            $scope.wordTree.update($scope.data.wordSpelling, $scope.data.word);
            alert("修改成功");
        }
    };

    $scope.method.init();

});