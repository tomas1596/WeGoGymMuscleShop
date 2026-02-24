const products = [
    {
        id: 1,
        name: "C4 Pre Entreno",
        category: "pre-entreno",
        price: 8500,
        description: "Pre entreno explosivo con cafeína y beta-alanina para máxima energía",
        image: "/img/PRE/C4.jpg"
    },
    {
        id: 2,
        name: "Pre War Ena Sport",
        category: "pre-entreno",
        price: 9200,
        description: "Energía y enfoque para entrenamientos intensos",
        image: "/img/PRE/ENA.jpg"
    },
    {
        id: 3,
        name: "Pre Entreno TNT",
        category: "pre-entreno",
        price: 10500,
        description: "Explosión de energía y potencia para cada sesión",
        image: "/img/PRE/TNT.jpg"
    },
    {
        id: 4,
        name: "Pre Entreno V8",
        category: "pre-entreno",
        price: 9800,
        description: "Bombeo muscular y concentración máxima para cada entrenamiento",
        image: "/img/PRE/V8.jpg"
    },
    {
    id: 5,
    name: "Creatina Ena Sport",
    category: "creatina",
    price: 5500,
    description: "Creatina monohidratada para aumentar fuerza y rendimiento",
    image: "/img/CREATINA/ENAA.jpg"
    },
    {
    id: 6,
    name: "Creatina Gold",
    category: "creatina",
    price: 7200,
    description: "Creatina de alta pureza para mejorar potencia muscular",
    image: "/img/CREATINA/GOLD.jpg"
    },
    {
    id: 7,
    name: "Creatina Hardcore",
    category: "creatina",
    price: 6800,
    description: "Fórmula concentrada para fuerza y volumen muscular",
    image: "/img/CREATINA/HARDCORE.jpg"
    },
    {
    id: 8,
    name: "Creatina Star Nutrition",
    category: "creatina",
    price: 8900,
    description: "Creatina micronizada para mejor absorción y rendimiento",
    image: "/img/CREATINA/STAR.jpg"
    },
    {
    id: 9,
    name: "Proteína ENA Chocolate",
    category: "proteina",
    price: 12500,
    description: "Proteína de suero sabor chocolate para recuperación muscular",
    image: "/img/PROTEINA/ENAPROTE.jpg"
    },
    {
    id: 10,
    name: "Proteína ENA Sport",
    category: "proteina",
    price: 14200,
    description: "Proteína de alta calidad para aumentar masa muscular",
    image: "/img/PROTEINA/ENASPORTPROTE.jpg"
    },
    {
    id: 11,
    name: "Proteína Pulver Vegana",
    category: "proteina",
    price: 11800,
    description: "Proteína vegetal ideal para fuerza y recuperación",
    image: "/img/PROTEINA/PULVERPROTE.jpg"
    },
    {
    id: 12,
    name: "Proteína Star Nutrition",
    category: "proteina",
    price: 10900,
    description: "Proteína de suero para mejorar rendimiento y masa muscular",
    image: "/img/PROTEINA/STARPROTE.jpg"
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
