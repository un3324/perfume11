let cart = [];
let selectedProduct = null;

window.addEventListener("load", function(){
    setTimeout(function(){
        document.getElementById("loader").classList.add("hide");
    }, 650);
});


function openProductDetails(name, price, image, description, size, ingredients){
    selectedProduct = {
        name:name,
        price:price,
        image:image,
        description:description,
        size:size,
        ingredients:ingredients
    };

    document.getElementById("detailsName").innerHTML = name;
    document.getElementById("detailsPrice").innerHTML = price + " د.ل";
    document.getElementById("detailsImage").src = image;
    document.getElementById("detailsDescription").innerHTML = description;
    document.getElementById("detailsSize").innerHTML = size;
    document.getElementById("detailsIngredients").innerHTML = ingredients;

    document.getElementById("productDetailsModal").style.display = "flex";
}

function closeProductDetails(){
    document.getElementById("productDetailsModal").style.display = "none";
}

function addCurrentProductToCart(){
    if(selectedProduct !== null){
        addToCart(selectedProduct.name, selectedProduct.price);
        closeProductDetails();
    }
}

function confirmCurrentProduct(){
    if(selectedProduct !== null){
        document.getElementById("checkoutModal").style.display = "flex";
    }
}



function closeCheckoutModal(){
    document.getElementById("checkoutModal").style.display = "none";
}

function sendOrder(){
    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let address = document.getElementById("customerAddress").value.trim();

    if(name === "" || phone === "" || address === ""){
        alert("الرجاء تعبئة جميع البيانات");
        return;
    }

    if(selectedProduct !== null){
        addToCart(selectedProduct.name, selectedProduct.price);
    }

    alert("تم إرسال طلبك بنجاح ✨");

    document.getElementById("checkoutModal").style.display = "none";
    document.getElementById("productDetailsModal").style.display = "none";

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
}


function toggleCart(){
    document.getElementById("cartSidebar").classList.toggle("active");
}

function addToCart(name, price){
    cart.push({
        name:name,
        price:price
    });

    updateCart();
    document.getElementById("cartSidebar").classList.add("active");
}

function updateCart(){
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");
    let cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        cartItems.innerHTML = '<p class="empty-cart">السلة فارغة حاليًا</p>';
    }

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price;

        cartItems.innerHTML += `
        <div class="cart-item">
            <h4>${cart[i].name}</h4>
            <p>${cart[i].price} د.ل</p>
            <button class="remove-btn" onclick="removeItem(${i})">حذف</button>
        </div>
        `;
    }

    totalPrice.innerHTML = "المجموع: " + total + " د.ل";
    cartCount.innerHTML = cart.length;
}

function removeItem(index){
    cart.splice(index, 1);
    updateCart();
}

function checkout(){
    if(cart.length === 0){
        alert("السلة فارغة، الرجاء إضافة منتج أولًا");
    }else{
        alert("تم إرسال طلبك بنجاح");
        cart = [];
        updateCart();
        document.getElementById("cartSidebar").classList.remove("active");
    }
}





function resetCardsAnimation(selector){
    let cards = document.querySelectorAll(selector);

    cards.forEach(function(card){
        card.classList.remove("show");
    });

    setTimeout(function(){
        revealCards(selector);
    }, 150);
}

function revealCards(selector){
    let cards = document.querySelectorAll(selector);

    cards.forEach(function(card, index){
        if(card.style.display !== "none"){
            setTimeout(function(){
                card.classList.add("show");
            }, index * 140);
        }
    });
}

function resetPerfumeAnimation(){
    resetCardsAnimation("#perfumeCollection .reveal-card");
}

function resetHomeProductsAnimation(){
    resetCardsAnimation("#products .reveal-card");
}


function showPerfumePage(){
    document.querySelector(".hero").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("contact").style.display = "none";
    document.querySelector("footer").style.display = "none";

    document.getElementById("perfumeCollection").style.display = "block";
    resetPerfumeAnimation();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function showHomePage(){
    document.querySelector(".hero").style.display = "flex";
    document.getElementById("products").style.display = "block";
    document.getElementById("about").style.display = "block";
    document.getElementById("contact").style.display = "block";
    document.querySelector("footer").style.display = "block";

    document.getElementById("perfumeCollection").style.display = "none";
    resetHomeProductsAnimation();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

function scrollToPerfumes(){
    showPerfumePage();
}

function filterPerfumes(category, clickedButton){

    let items = document.querySelectorAll(".perfume-item");
    let buttons = document.querySelectorAll(".filter-btn");
    let noResult = document.getElementById("noResult");

    buttons.forEach(function(btn){
        btn.classList.remove("active");
    });

    clickedButton.classList.add("active");

    let visibleCount = 0;

    items.forEach(function(item){

        if(category === "all"){
            item.style.display = "flex";
            visibleCount++;
        }
        else if(item.classList.contains(category)){
            item.style.display = "flex";
            visibleCount++;
        }
        else{
            item.style.display = "none";
        }

    });

    if(visibleCount === 0){
        noResult.style.display = "block";
    }else{
        noResult.style.display = "none";
    }

    resetPerfumeAnimation();
}

document.getElementById("searchInput").addEventListener("keyup", function(){
    let value = this.value.toLowerCase().trim();
    let perfumes = document.querySelectorAll(".perfume-item");
    let noResult = document.getElementById("noResult");
    let visibleCount = 0;

    perfumes.forEach(function(item){
        let name = item.getAttribute("data-name").toLowerCase();
        let text = item.innerText.toLowerCase();

        if(name.includes(value) || text.includes(value)){
            item.style.display = "block";
            visibleCount++;
        }else{
            item.style.display = "none";
        }
    });

    noResult.style.display = visibleCount === 0 ? "block" : "none";
    resetPerfumeAnimation();
});



let revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.18
});

document.querySelectorAll(".reveal-card").forEach(function(card){
    revealObserver.observe(card);
});


window.addEventListener("load", function(){
    resetHomeProductsAnimation();
});


function sendContactMessage(){
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let message = document.getElementById("contactMessage").value.trim();

    if(name === "" || email === "" || message === ""){
        alert("الرجاء تعبئة جميع حقول التواصل");
        return;
    }

    alert("تم إرسال رسالتك بنجاح، سنقوم بالتواصل معك قريبًا ✨");

    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
}