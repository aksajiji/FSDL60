angular.module('shoppingCartApp', [])
    .controller('CartController', function ($scope) {
        $scope.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        $scope.discountCode = '';
        $scope.discountApplied = 0;
        $scope.taxRate = 0.10; // 10% tax
        $scope.deliveryFee = 5.00; // Fixed delivery fee

        // Function to add an item to the cart
        $scope.addItem = function () {
            if ($scope.newItem.name && $scope.newItem.price > 0 && $scope.newItem.quantity > 0) {
                const item = {
                    name: $scope.newItem.name,
                    price: parseFloat($scope.newItem.price),
                    quantity: parseInt($scope.newItem.quantity),
                    image: $scope.newItem.image ? URL.createObjectURL($scope.newItem.image) : 'assets/placeholder.jpg'
                };
                $scope.cartItems.push(item);
                $scope.newItem.name = '';
                $scope.newItem.price = '';
                $scope.newItem.quantity = '';
                $scope.newItem.image = '';
                $scope.calculateTotal();
                saveCartToLocalStorage();
            }
        };

        // Function to remove an item from the cart
        $scope.removeItem = function (index) {
            $scope.cartItems.splice(index, 1);
            $scope.calculateTotal();
            saveCartToLocalStorage();
        };

        // Function to edit the quantity of an item
        $scope.editItem = function (index) {
            let newQuantity = prompt("Enter new quantity for " + $scope.cartItems[index].name, $scope.cartItems[index].quantity);
            if (newQuantity && newQuantity > 0) {
                $scope.cartItems[index].quantity = parseInt(newQuantity);
                $scope.calculateTotal();
                saveCartToLocalStorage();
            }
        };

        // Function to apply a discount code
        $scope.applyDiscount = function () {
            const code = $scope.discountCode.toLowerCase();
            if (code === 'fixed10') {
                $scope.discountApplied = 10; // $10 discount
            } else if (code === 'percent15') {
                $scope.discountApplied = $scope.subtotal * 0.15; // 15% discount
            } else {
                $scope.discountApplied = 0;
            }
            $scope.calculateTotal();
        };

        // Function to calculate the subtotal, tax, delivery fee, and final total
        $scope.calculateTotal = function () {
            $scope.subtotal = $scope.cartItems.reduce(function (sum, item) {
                return sum + (item.price * item.quantity);
            }, 0);
            $scope.tax = $scope.subtotal * $scope.taxRate;
            $scope.finalTotal = $scope.subtotal - $scope.discountApplied + $scope.tax + $scope.deliveryFee;
        };

        // Function to clear the cart
        $scope.clearCart = function () {
            $scope.cartItems = [];
            $scope.calculateTotal();
            saveCartToLocalStorage();
        };

        // Function to save the cart to local storage
        function saveCartToLocalStorage() {
            localStorage.setItem('cartItems', JSON.stringify($scope.cartItems));
        }

        // Initialize total calculation on page load
        $scope.calculateTotal();
    });
