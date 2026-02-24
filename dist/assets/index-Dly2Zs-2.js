(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const E=[{id:1,name:"C4 Pre Entreno",category:"pre-entreno",price:8500,description:"Pre entreno explosivo con cafeína y beta-alanina para máxima energía",image:"/public/img/PRE/C4.jpg"},{id:2,name:"Pre War Ena Sport",category:"pre-entreno",price:9200,description:"Energía y enfoque para entrenamientos intensos",image:"/public/img/PRE/ENA.jpg"},{id:3,name:"Pre Entreno TNT",category:"pre-entreno",price:10500,description:"Explosión de energía y potencia para cada sesión",image:"/public/img/PRE/TNT.jpg"},{id:4,name:"Pre Entreno V8",category:"pre-entreno",price:9800,description:"Bombeo muscular y concentración máxima para cada entrenamiento",image:"/public/img/PRE/V8.jpg"},{id:5,name:"Creatina Ena Sport",category:"creatina",price:5500,description:"Creatina monohidratada para aumentar fuerza y rendimiento",image:"/public/img/CREATINA/ENAA.jpg"},{id:6,name:"Creatina Gold",category:"creatina",price:7200,description:"Creatina de alta pureza para mejorar potencia muscular",image:"/public/img/CREATINA/GOLD.jpg"},{id:7,name:"Creatina Hardcore",category:"creatina",price:6800,description:"Fórmula concentrada para fuerza y volumen muscular",image:"/public/img/CREATINA/HARDCORE.jpg"},{id:8,name:"Creatina Star Nutrition",category:"creatina",price:8900,description:"Creatina micronizada para mejor absorción y rendimiento",image:"/public/img/CREATINA/STAR.jpg"},{id:9,name:"Proteína ENA Chocolate",category:"proteina",price:12500,description:"Proteína de suero sabor chocolate para recuperación muscular",image:"/public/img/PROTEINA/ENAPROTE.jpg"},{id:10,name:"Proteína ENA Sport",category:"proteina",price:14200,description:"Proteína de alta calidad para aumentar masa muscular",image:"/public/img/PROTEINA/ENASPORTPROTE.jpg"},{id:11,name:"Proteína Pulver Vegana",category:"proteina",price:11800,description:"Proteína vegetal ideal para fuerza y recuperación",image:"/public/img/PROTEINA/PULVERPROTE.jpg"},{id:12,name:"Proteína Star Nutrition",category:"proteina",price:10900,description:"Proteína de suero para mejorar rendimiento y masa muscular",image:"/public/img/PROTEINA/STARPROTE.jpg"}];let r=[],m={};document.addEventListener("DOMContentLoaded",()=>{N()});function N(){E.forEach(t=>{m[t.id]=1}),S(),w(),j()}function S(){const t=document.getElementById("featuredProducts"),e=E.slice(0,3);t.innerHTML=e.map(a=>k(a)).join("")}function w(){const t=document.getElementById("productsContainer");t.innerHTML=E.map(e=>k(e)).join("")}function k(t){return`
        <div class="product-card" data-category="${t.category}">
            <img src="${t.image}" alt="${t.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${R(t.category)}</div>
                <h3 class="product-name">${t.name}</h3>
                <p class="product-description">${t.description}</p>
                <div class="product-price">$${t.price.toLocaleString()}</div>
                <div class="quantity-selector">
                    <button onclick="decreaseQuantity(${t.id})">-</button>
                    <span id="qty-${t.id}">1</span>
                    <button onclick="increaseQuantity(${t.id})">+</button>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${t.id})">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `}function R(t){return{"pre-entreno":"Pre Entreno",creatina:"Creatina",proteina:"Proteína"}[t]||t}window.increaseQuantity=function(t){m[t]++,M(t)};window.decreaseQuantity=function(t){m[t]>1&&(m[t]--,M(t))};function M(t){document.querySelectorAll(`#qty-${t}`).forEach(a=>{a.textContent=m[t]})}function j(){const t=document.getElementById("hamburger"),e=document.querySelector(".nav-menu"),a=document.getElementById("cartIcon"),o=document.getElementById("cartModal"),n=document.getElementById("closeCart"),i=document.querySelectorAll(".filter-btn"),s=document.querySelectorAll(".dropdown-menu a"),h=document.getElementById("continueCheckout"),y=document.getElementById("checkoutModal"),C=document.getElementById("closeCheckout"),d=document.getElementById("checkoutForm"),v=document.querySelectorAll('input[name="paymentMethod"]'),P=document.getElementById("cardDetails"),$=document.getElementById("confirmationModal"),q=document.getElementById("continueShopping");t.addEventListener("click",()=>{e.classList.toggle("active"),L(t)}),a.addEventListener("click",x),n.addEventListener("click",I),o.addEventListener("click",c=>{c.target===o&&I()}),h.addEventListener("click",()=>{if(r.length===0){alert("El carrito está vacío");return}I(),F()}),C.addEventListener("click",b),y.addEventListener("click",c=>{c.target===y&&b()}),v.forEach(c=>{c.addEventListener("change",l=>{l.target.value==="card"?P.classList.remove("hidden"):P.classList.add("hidden")})}),d.addEventListener("submit",c=>{c.preventDefault(),H()}),q.addEventListener("click",()=>{T(),window.scrollTo({top:0,behavior:"smooth"})}),$.addEventListener("click",c=>{c.target===$&&(T(),window.scrollTo({top:0,behavior:"smooth"}))}),i.forEach(c=>{c.addEventListener("click",()=>{i.forEach(u=>u.classList.remove("active")),c.classList.add("active");const l=c.getAttribute("data-filter");A(l)})}),s.forEach(c=>{c.addEventListener("click",l=>{l.preventDefault();const u=c.getAttribute("data-category");A(u),i.forEach(p=>{p.classList.remove("active"),p.getAttribute("data-filter")===u&&p.classList.add("active")}),document.getElementById("productos").scrollIntoView({behavior:"smooth"}),window.innerWidth<=768&&(e.classList.remove("active"),L(t))})}),document.querySelectorAll('a[href^="#"]').forEach(c=>{c.addEventListener("click",function(l){if(this.getAttribute("href")!=="#"&&!this.hasAttribute("data-category")){l.preventDefault();const u=this.getAttribute("href"),p=document.querySelector(u);p&&(p.scrollIntoView({behavior:"smooth"}),window.innerWidth<=768&&e.classList.contains("active")&&(e.classList.remove("active"),L(t)))}})})}function L(t){const e=t.querySelectorAll("span");t.parentElement.querySelector(".nav-menu").classList.contains("active")?(e[0].style.transform="rotate(45deg) translate(5px, 5px)",e[1].style.opacity="0",e[2].style.transform="rotate(-45deg) translate(7px, -6px)"):(e[0].style.transform="none",e[1].style.opacity="1",e[2].style.transform="none")}function A(t){document.querySelectorAll("#productsContainer .product-card").forEach(a=>{t==="todos"||a.getAttribute("data-category")===t?(a.classList.remove("hidden"),a.style.animation="fadeIn 0.5s ease"):a.classList.add("hidden")})}window.addToCart=function(t){const e=E.find(n=>n.id===t),a=m[t]||1,o=r.find(n=>n.id===t);o?o.quantity+=a:r.push({...e,quantity:a}),m[t]=1,M(t),g(),f(),O()};function O(){const t=document.getElementById("cartCount");t.style.animation="none",setTimeout(()=>{t.style.animation="bounce 0.5s ease"},10)}function g(){const t=r.reduce((e,a)=>e+a.quantity,0);document.getElementById("cartCount").textContent=t}function f(){const t=document.getElementById("cartItems"),e=document.getElementById("cartTotal");if(r.length===0){t.innerHTML='<div class="cart-empty">No hay productos en el carrito</div>',e.textContent="$0";return}t.innerHTML=r.map(o=>`
        <div class="cart-item">
            <img src="${o.image}" alt="${o.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${o.name}</div>
                <div class="cart-item-price">$${(o.price*o.quantity).toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="cart-quantity-btn" onclick="decreaseCartQuantity(${o.id})">-</button>
                    <span class="cart-quantity-display">${o.quantity}</span>
                    <button class="cart-quantity-btn" onclick="increaseCartQuantity(${o.id})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${o.id})">&times;</button>
        </div>
    `).join("");const a=r.reduce((o,n)=>o+n.price*n.quantity,0);e.textContent=`$${a.toLocaleString()}`}window.increaseCartQuantity=function(t){const e=r.find(a=>a.id===t);e&&(e.quantity++,g(),f())};window.decreaseCartQuantity=function(t){const e=r.find(a=>a.id===t);e&&(e.quantity--,e.quantity===0?removeFromCart(t):(g(),f()))};window.removeFromCart=function(t){r=r.filter(e=>e.id!==t),g(),f()};function x(){document.getElementById("cartModal").classList.add("active"),f()}function I(){document.getElementById("cartModal").classList.remove("active")}function F(){const t=document.getElementById("checkoutModal"),e=document.getElementById("checkoutItems"),a=document.getElementById("checkoutTotal");e.innerHTML=r.map(n=>`
        <div class="checkout-item">
            <span>${n.name} x ${n.quantity}</span>
            <span>$${(n.price*n.quantity).toLocaleString()}</span>
        </div>
    `).join("");const o=r.reduce((n,i)=>n+i.price*i.quantity,0);a.textContent=`$${o.toLocaleString()}`,t.classList.add("active")}function b(){document.getElementById("checkoutModal").classList.remove("active")}function H(){const t=document.getElementById("checkoutForm"),e=new FormData(t),a={firstName:e.get("firstName"),lastName:e.get("lastName"),email:e.get("email"),address:e.get("address"),city:e.get("city"),postalCode:e.get("postalCode"),paymentMethod:e.get("paymentMethod")},o=Q();b(),D(o,a)}function Q(){return`WGM-2026-${Math.floor(1e3+Math.random()*9e3)}`}function D(t,e){const a=document.getElementById("confirmationModal"),o=document.getElementById("orderId"),n=document.getElementById("confirmationShipping"),i=document.getElementById("confirmationItems"),s=document.getElementById("confirmationPayment"),h=document.getElementById("confirmationTotal");o.textContent=t,n.innerHTML=`
        <div class="confirmation-info">
            <p><strong>${e.firstName} ${e.lastName}</strong></p>
            <p>${e.email}</p>
            <p>${e.address}</p>
            <p>${e.city}, CP ${e.postalCode}</p>
        </div>
    `,i.innerHTML=r.map(d=>`
        <div class="confirmation-item">
            <div class="confirmation-item-name">${d.name}</div>
            <div class="confirmation-item-details">
                ${d.quantity} x $${d.price.toLocaleString()}
            </div>
        </div>
    `).join("");const y=e.paymentMethod==="card"?"Tarjeta de Crédito/Débito":"MercadoPago";s.innerHTML=`
        <div class="confirmation-info">
            <p>${y}</p>
        </div>
    `;const C=r.reduce((d,v)=>d+v.price*v.quantity,0);h.textContent=`$${C.toLocaleString()}`,r=[],g(),document.getElementById("checkoutForm").reset(),document.getElementById("cardDetails").classList.remove("hidden"),a.classList.add("active")}function T(){document.getElementById("confirmationModal").classList.remove("active")}const B=document.createElement("style");B.textContent=`
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;document.head.appendChild(B);
