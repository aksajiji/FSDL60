angular.module('angularProject', ['ui.sortable'])
  .controller('TodoController', function($scope) {
    
    // Initialize with demo data if nothing in localStorage
    $scope.categories = JSON.parse(localStorage.getItem('angularProjectData')) || [
      { 
        name: 'Work', 
        tasks: [
          { name: 'Complete project report', priority: 'high', isCompleted: false },
          { name: 'Team meeting', priority: 'medium', isCompleted: true }
        ] 
      },
      { 
        name: 'Personal', 
        tasks: [
          { name: 'Buy groceries', priority: 'medium', isCompleted: false },
          { name: 'Gym session', priority: 'low', isCompleted: false }
        ] 
      }
    ];
    
    // Initialize models
    $scope.newCategory = '';
    $scope.newTask = {};
    $scope.newTaskPriority = {};
    
    // Drag and drop configuration
    $scope.sortableOptions = {
      update: function() {
        $scope.saveTasks();
      },
      containment: 'parent'
    };
    
    // Helper function for priority label classes
    $scope.getPriorityClass = function(priority) {
      switch(priority) {
        case 'high': return 'danger';
        case 'medium': return 'warning';
        case 'low': return 'success';
        default: return 'default';
      }
    };
    
    // Category functions
    $scope.addCategory = function() {
      if ($scope.newCategory.trim() !== '') {
        $scope.categories.push({
          name: $scope.newCategory,
          tasks: []
        });
        $scope.newCategory = '';
        $scope.newTaskPriority[$scope.newCategory] = 'medium';
        $scope.saveTasks();
      }
    };
    
    $scope.removeCategory = function(index) {
      if (confirm('Are you sure you want to delete this category and all its tasks?')) {
        $scope.categories.splice(index, 1);
        $scope.saveTasks();
      }
    };
    
    // Task functions
    $scope.addTask = function(category) {
      if ($scope.newTask[category.name] && $scope.newTask[category.name].trim() !== '') {
        category.tasks.push({
          name: $scope.newTask[category.name],
          priority: $scope.newTaskPriority[category.name] || 'medium',
          isCompleted: false
        });
        $scope.newTask[category.name] = '';
        $scope.saveTasks();
      }
    };
    
    $scope.removeTask = function(category, index) {
      category.tasks.splice(index, 1);
      $scope.saveTasks();
    };
    
    $scope.editTask = function(task) {
      var newName = prompt('Edit task:', task.name);
      if (newName !== null && newName.trim() !== '') {
        task.name = newName;
        $scope.saveTasks();
      }
    };
    
    // Progress tracking
    $scope.getCompletedCount = function(category) {
      return category.tasks.filter(function(task) {
        return task.isCompleted;
      }).length;
    };
    
    $scope.getProgress = function(category) {
      if (category.tasks.length === 0) return 0;
      return Math.round(($scope.getCompletedCount(category) / category.tasks.length) * 100);
    };
    
    // Persistence
    $scope.saveTasks = function() {
      localStorage.setItem('angularProjectData', JSON.stringify($scope.categories));
    };
    
    // Initialize priority defaults for existing categories
    $scope.categories.forEach(function(category) {
      $scope.newTaskPriority[category.name] = 'medium';
    });
  });