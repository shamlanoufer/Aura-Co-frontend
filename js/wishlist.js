document.addEventListener('DOMContentLoaded', function() {
    const wishlistItemsContainer = document.querySelector('.cart-items');
    const emptyMessage = document.querySelector('.cart-empty-message');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (wishlistItemsContainer) wishlistItemsContainer.style.display = 'none';
    } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        if (wishlistItemsContainer) {
            wishlistItemsContainer.style.display = 'block';
            wishlistItemsContainer.innerHTML = ''; // Clear existing items

            wishlist.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.price}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-from-wishlist" data-index="${index}">&times;</button>
                        <button class="add-to-cart-from-wishlist">Add to Cart</button>
                    </div>
                `;
                wishlistItemsContainer.appendChild(itemElement);
            });
        }
    }

    // Add event listener for removing items from wishlist
    wishlistItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-from-wishlist')) {
            const itemIndex = parseInt(e.target.getAttribute('data-index'));
            let currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            currentWishlist.splice(itemIndex, 1);
            localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
            
            // Update wishlist count
            const wishlistCount = document.querySelector('.wishlist-count');
            const newCount = currentWishlist.length;
            localStorage.setItem('wishlistCount', newCount);
            if (wishlistCount) wishlistCount.textContent = newCount;
            
            // Re-render the wishlist
            location.reload();
        }

        if (e.target.classList.contains('add-to-cart-from-wishlist')) {
            const productCard = e.target.closest('.cart-item');
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('p').textContent,
                image: productCard.querySelector('img').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));

            const cartCount = document.querySelector('.cart-count');
            const currentCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
            const newCartCount = currentCartCount + 1;
            localStorage.setItem('cartCount', newCartCount);
            if (cartCount) cartCount.textContent = newCartCount;

            e.target.textContent = 'Added!';
            setTimeout(() => e.target.textContent = 'Add to Cart', 2000);
        }
    });
}); 