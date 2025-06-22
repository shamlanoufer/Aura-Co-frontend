document.addEventListener("DOMContentLoaded", function() {
    console.log("Contact page loaded");
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                console.log('Form submitted:', { name, email, message });
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Review Modal
    const modal = document.getElementById('reviewModal');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const closeModal = document.querySelector('.close-modal');
    const ratingStars = document.querySelectorAll('.rating-input i');
    const reviewForm = document.getElementById('reviewForm');
    
    if (writeReviewBtn) {
        // Open modal
        writeReviewBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Star rating interaction
        let selectedRating = 0;
        
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                selectedRating = rating;
                
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas', 'active');
                    } else {
                        s.classList.remove('fas', 'active');
                        s.classList.add('far');
                    }
                });
            });
            
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                ratingStars.forEach((s, index) => {
                    if (index >= selectedRating) {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
        
        // Form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewerName').value;
            const reviewText = document.getElementById('reviewText').value;
            
            if (selectedRating === 0) {
                alert('Please select a rating');
                return;
            }
            
            if (name && reviewText) {
                // In a real app, you would send this data to your server
                console.log('Review submitted:', {
                    name,
                    rating: selectedRating,
                    text: reviewText
                });
                
                alert('Thank you for your review!');
                reviewForm.reset();
                selectedRating = 0;
                ratingStars.forEach(star => {
                    star.classList.remove('fas', 'active');
                    star.classList.add('far');
                });
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});