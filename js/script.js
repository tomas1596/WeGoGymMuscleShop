const products = [
    {
        id: 1,
        name: "C4 Original Pre-Workout",
        category: "pre-entreno",
        price: 8500,
        description: "Pre entreno explosivo con cafeína y beta-alanina para máxima energía",
        image: "https://images.pexels.com/photos/4058224/pexels-photo-4058224.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 2,
        name: "NO-Xplode Pre-Workout",
        category: "pre-entreno",
        price: 9200,
        description: "Fórmula avanzada con óxido nítrico para bombeo muscular intenso",
        image: "https://images.pexels.com/photos/4058271/pexels-photo-4058271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 3,
        name: "Pre-Jym Pre-Workout",
        category: "pre-entreno",
        price: 10500,
        description: "Pre entreno premium con ingredientes clínicamente dosificados",
        image: "https://images.pexels.com/photos/3766211/pexels-photo-3766211.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 4,
        name: "Legion Pulse Pre-Workout",
        category: "pre-entreno",
        price: 9800,
        description: "Pre entreno natural sin colorantes ni saborizantes artificiales",
        image: "https://images.pexels.com/photos/4058413/pexels-photo-4058413.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 5,
        name: "Creatina Monohidratada Pura",
        category: "creatina",
        price: 5500,
        description: "Creatina monohidrato micronizada 100% pura para máxima absorción",
        image: "https://images.pexels.com/photos/6550835/pexels-photo-6550835.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 6,
        name: "Creatine HCL",
        category: "creatina",
        price: 7200,
        description: "Clorhidrato de creatina de alta biodisponibilidad sin retención de líquidos",
        image: "https://images.pexels.com/photos/7699388/pexels-photo-7699388.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 7,
        name: "Kre-Alkalyn Creatina",
        category: "creatina",
        price: 6800,
        description: "Creatina con pH ajustado para mejor estabilidad y absorción",
        image: "https://images.pexels.com/photos/4058106/pexels-photo-4058106.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 8,
        name: "Creatina + Glutamina",
        category: "creatina",
        price: 8900,
        description: "Combinación perfecta de creatina y glutamina para recuperación y fuerza",
        image: "https://images.pexels.com/photos/6550831/pexels-photo-6550831.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 9,
        name: "Whey Protein Gold Standard",
        category: "proteina",
        price: 12500,
        description: "Proteína de suero aislada de rápida absorción, ideal post-entrenamiento",
        image: "https://images.pexels.com/photos/4058144/pexels-photo-4058144.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 10,
        name: "Isolate Protein Pro",
        category: "proteina",
        price: 14200,
        description: "Proteína aislada 95% pura, sin lactosa y bajo en carbohidratos",
        image: "https://images.pexels.com/photos/4058219/pexels-photo-4058219.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 11,
        name: "Caseína Micelar Night",
        category: "proteina",
        price: 11800,
        description: "Proteína de absorción lenta ideal para tomar antes de dormir",
        image: "https://images.pexels.com/photos/6550842/pexels-photo-6550842.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
        id: 12,
        name: "Proteína Vegana Plant Power",
        category: "proteina",
        price: 10900,
        description: "Blend de proteínas vegetales de guisante, arroz y hemp 100% natural",
        image: "https://images.pexels.com/photos/4058218/pexels-photo-4058218.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
];

let cart = [];
let currentFilter = 'todos';
let productQuantities = {};

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    products.forEach(product => {
        productQuantities[product.id] = 1;
    });

    displayFeaturedProducts();
    displayAllProducts();
    setupEventListeners();
}

function displayFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.slice(0, 3);

    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function displayAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toLocaleString()}</div>
                <div class="quantity-selector">
                    <button onclick="decreaseQuantity(${product.id})">-</button>
                    <span id="qty-${product.id}">1</span>
                    <button onclick="increaseQuantity(${product.id})">+</button>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const categories = {
        'pre-entreno': 'Pre Entreno',
        'creatina': 'Creatina',
        'proteina': 'Proteína'
    };
    return categories[category] || category;
}

window.increaseQuantity = function(productId) {
    productQuantities[productId]++;
    updateProductQuantityDisplay(productId);
}

window.decreaseQuantity = function(productId) {
    if (productQuantities[productId] > 1) {
        productQuantities[productId]--;
        updateProductQuantityDisplay(productId);
    }
}

function updateProductQuantityDisplay(productId) {
    const elements = document.querySelectorAll(`#qty-${productId}`);
    elements.forEach(el => {
        el.textContent = productQuantities[productId];
    });
}

function setupEventListeners() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    const continueCheckout = document.getElementById('continueCheckout');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('cardDetails');
    const confirmationModal = document.getElementById('confirmationModal');
    const continueShopping = document.getElementById('continueShopping');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        animateHamburger(hamburger);
    });

    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });

    continueCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        closeCartModal();
        openCheckout();
    });

    closeCheckout.addEventListener('click', closeCheckoutModal);

    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });

    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.classList.remove('hidden');
            } else {
                cardDetails.classList.add('hidden');
            }
        });
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });

    continueShopping.addEventListener('click', () => {
        closeConfirmationModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    confirmationModal.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeConfirmationModal();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            filterProducts(category);

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });

            document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });

            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                animateHamburger(hamburger);
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && !this.hasAttribute('data-category')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });

                    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        animateHamburger(hamburger);
                    }
                }
            }
        });
    });
}

function animateHamburger(hamburger) {
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.parentElement.querySelector('.nav-menu').classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function filterProducts(category) {
    currentFilter = category;
    const productCards = document.querySelectorAll('#productsContainer .product-card');

    productCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.classList.add('hidden');
        }
    });
}

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = productQuantities[productId] || 1;
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    productQuantities[productId] = 1;
    updateProductQuantityDisplay(productId);

    updateCartCount();
    updateCartDisplay();
    showAddToCartAnimation();
}

function showAddToCartAnimation() {
    const cartCount = document.getElementById('cartCount');
    cartCount.style.animation = 'none';
    setTimeout(() => {
        cartCount.style.animation = 'bounce 0.5s ease';
    }, 10);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">No hay productos en el carrito</div>';
        cartTotal.textContent = '$0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="cart-quantity-btn" onclick="decreaseCartQuantity(${item.id})">-</button>
                    <span class="cart-quantity-display">${item.quantity}</span>
                    <button class="cart-quantity-btn" onclick="increaseCartQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;
}

window.increaseCartQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        updateCartCount();
        updateCartDisplay();
    }
}

window.decreaseCartQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    updateCartDisplay();
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

function openCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `$${total.toLocaleString()}`;

    checkoutModal.classList.add('active');
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
}

function processOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);

    const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        address: formData.get('address'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        paymentMethod: formData.get('paymentMethod')
    };

    const orderId = generateOrderId();

    closeCheckoutModal();
    showOrderConfirmation(orderId, orderData);
}

function generateOrderId() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `WGM-2026-${randomNum}`;
}

function showOrderConfirmation(orderId, orderData) {
    const confirmationModal = document.getElementById('confirmationModal');
    const orderIdElement = document.getElementById('orderId');
    const confirmationShipping = document.getElementById('confirmationShipping');
    const confirmationItems = document.getElementById('confirmationItems');
    const confirmationPayment = document.getElementById('confirmationPayment');
    const confirmationTotal = document.getElementById('confirmationTotal');

    orderIdElement.textContent = orderId;

    confirmationShipping.innerHTML = `
        <div class="confirmation-info">
            <p><strong>${orderData.firstName} ${orderData.lastName}</strong></p>
            <p>${orderData.email}</p>
            <p>${orderData.address}</p>
            <p>${orderData.city}, CP ${orderData.postalCode}</p>
        </div>
    `;

    confirmationItems.innerHTML = cart.map(item => `
        <div class="confirmation-item">
            <div class="confirmation-item-name">${item.name}</div>
            <div class="confirmation-item-details">
                ${item.quantity} x $${item.price.toLocaleString()}
            </div>
        </div>
    `).join('');

    const paymentMethodText = orderData.paymentMethod === 'card'
        ? 'Tarjeta de Crédito/Débito'
        : 'MercadoPago';

    confirmationPayment.innerHTML = `
        <div class="confirmation-info">
            <p>${paymentMethodText}</p>
        </div>
    `;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    confirmationTotal.textContent = `$${total.toLocaleString()}`;

    cart = [];
    updateCartCount();

    document.getElementById('checkoutForm').reset();
    document.getElementById('cardDetails').classList.remove('hidden');

    confirmationModal.classList.add('active');
}

function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.classList.remove('active');
}

const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);
