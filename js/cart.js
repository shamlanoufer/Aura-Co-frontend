document.addEventListener('DOMContentLoaded', function() {
    // Quantity adjustment
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            const quantityElement = item.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.classList.contains('plus')) {
                quantity++;
            } else if (this.classList.contains('minus') && quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
            updateCartTotal();
        });
    });

    // Remove item
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.cart-item').remove();
            updateCartCount();
            updateCartTotal();
        });
    });

    // Update cart total function
    function updateCartTotal() {
        let subtotal = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            subtotal += price * quantity;
        });
        
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }

    // Update cart count in header
    function updateCartCount() {
        const count = document.querySelectorAll('.cart-item').length;
        document.querySelector('.cart-count').textContent = count;
    }

    // Initialize
    updateCartTotal();
});