        const products = [
            {
                id: 1,
                name: 'Modern Chair',
                price: 299,
                image: 'chair.png',
                arVideo: 'chair2.mp4'
            },
            {
                id: 2,
                name: 'Apple Laptop',
                price: 1000,
                image: 'laptop 3d.png',
                arVideo: 'ar.mp4'
            },
            // Add more products...
        ];

        const cart = [];
        const productGrid = document.querySelector('.product-grid');
        const searchBar = document.querySelector('.search-bar');
        const errorModal = document.getElementById('errorModal');

        // Generate product cards
        function renderProducts(products) {
            productGrid.innerHTML = products.map(product => `
                <article class="product-card">
                    <div class="ar-preview">
                        <video class="ar-video" loop muted playsinline>
                            <source src="${product.arVideo}" type="video/mp4">
                        </video>
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="cart-btn" data-id="${product.id}">
                        Add to Cart
                    </button>
                </article>
            `).join('');
        }

        // Handle AR preview
        function handleARPreview() {
            document.querySelectorAll('.product-card').forEach(card => {
                const video = card.querySelector('video');
                
                card.addEventListener('mouseenter', () => {
                    video.play().catch(() => {
                        showError('AR preview requires user interaction first');
                    });
                });

                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            });
        }

        // Handle cart updates
        function updateCartCount() {
            document.getElementById('cart-count').textContent = cart.length;
        }

        // Error handling
        function showError(message) {
            errorModal.textContent = message;
            errorModal.style.display = 'block';
            setTimeout(() => {
                errorModal.style.display = 'none';
            }, 3000);
        }

        // Event listeners
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('cart-btn')) {
                const productId = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === productId);
                cart.push(product);
                updateCartCount();
            }
        });

        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            
            if (filtered.length === 0) {
                showError('No products found');
            }
            
            renderProducts(filtered);
            handleARPreview();
        });

        // Initial render
        renderProducts(products);
        handleARPreview();