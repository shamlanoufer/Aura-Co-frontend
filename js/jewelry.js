// Enhanced version with localStorage example
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const cartCount = document.querySelector('.cart-count');
    const wishlistCount = document.querySelector('.wishlist-count');
    const productGrid = document.querySelector('.product-grid');

    // Toggle mobile navigation
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Load cart and wishlist counts from localStorage
    const updateCounters = () => {
        const currentCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        if (cartCount) cartCount.textContent = currentCartCount;

        const currentWishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;
        if (wishlistCount) wishlistCount.textContent = currentWishlistCount;
    };
    
    updateCounters();

    // Event delegation for product actions
    if (productGrid) {
        productGrid.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            if (!productCard) return;

            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('p.price').textContent,
                image: productCard.querySelector('img').src
            };

            // Handle Add to Cart
            if (e.target.classList.contains('add-to-cart')) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));

                const currentCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
                const newCartCount = currentCartCount + 1;
                localStorage.setItem('cartCount', newCartCount);
                if (cartCount) cartCount.textContent = newCartCount;

                e.target.textContent = 'Added!';
                setTimeout(() => { e.target.textContent = 'Add to Cart'; }, 2000);
            }

            // Handle Add to Wishlist
            if (e.target.closest('.add-to-wishlist')) {
                const wishlistButton = e.target.closest('.add-to-wishlist');
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                
                // Check if item is already in wishlist to prevent duplicates
                const isAlreadyInWishlist = wishlist.some(item => item.name === product.name);
                
                if (!isAlreadyInWishlist) {
                    wishlist.push(product);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));

                    const currentWishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;
                    const newWishlistCount = currentWishlistCount + 1;
                    localStorage.setItem('wishlistCount', newWishlistCount);
                    if (wishlistCount) wishlistCount.textContent = newWishlistCount;

                    wishlistButton.classList.add('active');
                    wishlistButton.querySelector('.fa-heart').classList.replace('far', 'fas');
                }
            }
        });
    }

    // Update wishlist button states on page load
    const updateWishlistButtons = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            const productCard = button.closest('.product-card');
            if(productCard) {
                const productName = productCard.querySelector('h3').textContent;
                if (wishlist.some(item => item.name === productName)) {
                    button.classList.add('active');
                    const icon = button.querySelector('.fa-heart');
                    if(icon) {
                       icon.classList.replace('far', 'fas'); // Make heart solid
                    }
                }
            }
        });
    };

    updateWishlistButtons();

    // Correct button order
    document.querySelectorAll('.product-actions').forEach(actions => {
        const wishlistButton = actions.querySelector('.add-to-wishlist');
        const cartButton = actions.querySelector('.add-to-cart');
        if (wishlistButton && cartButton) {
            actions.insertBefore(wishlistButton, cartButton);
        }
    });

    const addToCart = (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;
        const quantityInput = productCard.querySelector('.quantity-input');
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.name === productName);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${quantity} x ${productName} has been added to your cart.`);
    };

    const addToWishlist = (e) => {
        // ... existing code ...
    };
});