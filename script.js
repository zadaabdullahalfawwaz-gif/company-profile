
"use strict";

// ==========================================
// MYTHIC GADGET STORE
// SCRIPT.JS BARU + FOTO PRODUK
// ==========================================

// NOMOR WHATSAPP TOKO
const nomorWhatsApp = "628977460421";

// ==========================================
// DATA PRODUK DAN FOTO
// ==========================================

const products = [
    {
        id: 1,
        name: "ROG Phone 8 Pro",
        price: 15999000,
        category: "Gaming",
        image: "https://press.asus.com/assets/w_640%2Ch_640/dfd04c89-22c4-4d59-931c-93ea7bf2c104/ROG%20Phone%208%20Pro-02.png",
        tag: "GAMING FLAGSHIP",
        description: "Smartphone gaming premium dengan performa tinggi, layar AMOLED, dan sistem pendingin canggih."
    },
    {
        id: 2,
        name: "RedMagic 9 Pro",
        price: 12999000,
        category: "Gaming",
        image: "https://fdn2.gsmarena.com/vv/pics/zte/zte-nubia-red-magic-9-pro-1.jpg",
        tag: "BEST GAMING",
        description: "HP gaming dengan desain futuristik, performa kuat, dan teknologi pendingin aktif."
    },
    {
        id: 3,
        name: "POCO X6 Pro",
        price: 4499000,
        category: "Gaming",
        image: "https://i02.appmifile.com/80_item_hk/08/01/2024/ccee9581cb6b46b59345a791734d8f84.png",
        tag: "BEST VALUE",
        description: "Performa cepat untuk bermain game dengan layar AMOLED berkualitas."
    },
    {
        id: 4,
        name: "Infinix GT 20 Pro",
        price: 3499000,
        category: "Gaming",
        image: "https://id.pro.infinixmobility.com/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/o/r/orange_1.png",
        tag: "GAMING SERIES",
        description: "Desain gaming modern dengan layar refresh rate tinggi dan performa responsif."
    },
    {
        id: 5,
        name: "ROG Phone 9 Pro",
        price: 18999000,
        category: "Gaming",
        image: "https://dlcdnwebimgs.asus.com/gain/696EF1BE-13DE-4A30-B27E-D856E21F203B/w717/h525",
        tag: "PREMIUM",
        description: "Smartphone gaming kelas atas dengan chipset bertenaga dan fitur gaming premium."
    },
    {
        id: 6,
        name: "RedMagic 10 Pro",
        price: 14999000,
        category: "Gaming",
        image: "https://cdn.hstatic.net/products/1000300544/download_-_2025-07-21t125032.674_3eb9962c22214b5cb61f41e2c72ddcdd.png",
        tag: "POWERFUL",
        description: "Performa gaming maksimal dengan sistem pendingin dan desain futuristik."
    },
    {
        id: 7,
        name: "POCO F7 Ultra",
        price: 9999000,
        category: "Flagship",
        image: "https://cdn.webshopapp.com/shops/256009/files/475244433/xiaomi-xiaomi-poco-f7-ultra-16gb-512gb.jpg",
        tag: "FLAGSHIP KILLER",
        description: "Smartphone bertenaga dengan layar berkualitas dan performa kelas flagship."
    },
    {
        id: 8,
        name: "iQOO 13",
        price: 10999000,
        category: "Gaming",
        image: "https://cdnpro.eraspace.com/media/catalog/product/i/q/iqoo_13_legend_white_01_1.jpg",
        tag: "HIGH PERFORMANCE",
        description: "Performa cepat, tampilan premium, dan pengalaman gaming responsif."
    },
    {
        id: 9,
        name: "Samsung Galaxy S25 Ultra",
        price: 19999000,
        category: "Flagship",
        image: "https://www.mobileciti.com.au/media/catalog/product/s/a/samsung-galaxy-s25-ultra-256gb-titanium-black-5.jpg?image-type=image&store=mobileciti",
        tag: "ULTRA PREMIUM",
        description: "Smartphone premium dengan kamera unggulan, layar berkualitas, dan performa tinggi."
    },
    {
        id: 10,
        name: "Xiaomi 15 Ultra",
        price: 16999000,
        category: "Flagship",
        image: "https://i05.appmifile.com/264_item_uk/24/02/2025/4de692cc0a0ea98c850ac446c8007e35.png?q=85&thumb=1",
        tag: "PREMIUM CAMERA",
        description: "Teknologi kamera premium dengan performa cepat dan desain elegan."
    },
    {
        id: 11,
        name: "Nubia Z70 Ultra",
        price: 11999000,
        category: "Flagship",
        image: "https://i.blogs.es/c1c563/blob/original.png",
        tag: "ELITE SERIES",
        description: "Desain modern dengan layar luas dan pengalaman penggunaan premium."
    },
    {
        id: 12,
        name: "Infinix GT 30 Pro",
        price: 4499000,
        category: "Gaming",
        image: "https://clickbuy.com.vn/uploads/news/infinix-gt-30-pro-8584328924084735194.png",
        tag: "GAMING CHOICE",
        description: "HP gaming modern dengan desain futuristik dan fitur menarik."
    }
];

// ==========================================
// DATA KERANJANG
// ==========================================

let cart = [];
let activeCategory = "Semua";
let searchText = "";

// ==========================================
// MENGAMBIL ELEMEN HTML
// ==========================================

const productContainer = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCartButton = document.getElementById("closeCart");
const checkoutButton = document.getElementById("checkoutButton");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const toast = document.getElementById("toast");

// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

// ==========================================
// MENAMPILKAN FOTO DAN PRODUK
// ==========================================

function renderProducts() {
    if (!productContainer) return;

    productContainer.innerHTML = "";

    const filteredProducts = products.filter(product => {
        const categoryMatch =
            activeCategory === "Semua" ||
            product.category === activeCategory;

        const searchMatch =
            product.name.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });

    if (filteredProducts.length === 0) {
        productContainer.innerHTML = `
            <div class="empty-product">
                Produk tidak ditemukan.
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.name = product.name;
        card.dataset.category = product.category;

        const imageBox = document.createElement("div");
        imageBox.className = "product-image";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            this.onerror = null;
            this.src = "";
            this.style.display = "none";
            imageBox.textContent = "Foto produk tidak tersedia";
        };

        imageBox.appendChild(image);

        const details = document.createElement("div");
        details.className = "product-details";

        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = product.tag;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = formatRupiah(product.price);

        const button = document.createElement("button");
        button.className = "add-button";
        button.type = "button";
        button.textContent = "+ Tambahkan ke Keranjang";
        button.dataset.id = product.id;

        details.append(tag, title, description, price, button);
        card.append(imageBox, details);

        productContainer.appendChild(card);
    });
}

// ==========================================
// PENCARIAN PRODUK
// ==========================================

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchText = this.value.trim().toLowerCase();
        renderProducts();
    });
}

// ==========================================
// FILTER KATEGORI
// ==========================================

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", function () {
        activeCategory = this.dataset.filter || "Semua";

        document.querySelectorAll(".filter").forEach(filter => {
            filter.classList.remove("active");
        });

        this.classList.add("active");
        renderProducts();
    });
});

// ==========================================
// NOTIFIKASI
// ==========================================

let toastTimer;

function showNotification(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ==========================================
// MENAMBAHKAN PRODUK KE KERANJANG
// ==========================================

function addToCart(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(product.name + " berhasil ditambahkan!");
}

// EVENT TOMBOL TAMBAH
if (productContainer) {
    productContainer.addEventListener("click", function (event) {
        const button = event.target.closest(".add-button");

        if (!button) return;

        addToCart(Number(button.dataset.id));
    });
}

// ==========================================
// MEMPERBARUI KERANJANG
// ==========================================

function updateCart() {
    updateCartCount();
    displayCart();
    calculateTotal();
}

// ==========================================
// JUMLAH PRODUK KERANJANG
// ==========================================

function updateCartCount() {
    if (!cartCount) return;

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}

// ==========================================
// MENAMPILKAN ISI KERANJANG
// ==========================================

function displayCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Keranjang Masih Kosong</h3>
                <p>Silakan pilih produk favoritmu.</p>
            </div>
        `;
        return;
    }

    cart.forEach(item => {
        const element = document.createElement("div");
        element.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const title = document.createElement("h4");
        title.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = formatRupiah(item.price);

        const controls = document.createElement("div");
        controls.className = "quantity-control";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.className = "quantity-btn";
        minus.textContent = "-";
        minus.dataset.action = "decrease";
        minus.dataset.id = item.id;

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.className = "quantity-btn";
        plus.textContent = "+";
        plus.dataset.action = "increase";
        plus.dataset.id = item.id;

        controls.append(minus, quantity, plus);
        info.append(title, price, controls);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "remove-cart-btn";
        remove.textContent = "Hapus";
        remove.dataset.action = "remove";
        remove.dataset.id = item.id;

        element.append(info, remove);
        cartItemsContainer.appendChild(element);
    });
}

// ==========================================
// MENGHITUNG TOTAL HARGA
// ==========================================

function calculateTotal() {
    if (!cartTotal) return;

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = formatRupiah(total);
}

// ==========================================
// MENGUBAH JUMLAH PRODUK
// ==========================================

function changeQuantity(id, action) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
    }

    updateCart();
}

// ==========================================
// MENGHAPUS PRODUK
// ==========================================

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    updateCart();
    showNotification("Produk berhasil dihapus!");
}

// EVENT TOMBOL KERANJANG
if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", function (event) {
        const button = event.target.closest("button");

        if (!button) return;

        const id = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "increase" || action === "decrease") {
            changeQuantity(id, action);
        }

        if (action === "remove") {
            removeFromCart(id);
        }
    });
}

// ==========================================
// MEMBUKA KERANJANG
// ==========================================

function openCart() {
    if (!cartModal) return;

    cartModal.classList.add("active");
    cartModal.setAttribute("aria-hidden", "false");
}

if (cartButton) {
    cartButton.addEventListener("click", openCart);
}

// ==========================================
// MENUTUP KERANJANG
// ==========================================

function closeCart() {
    if (!cartModal) return;

    cartModal.classList.remove("active");
    cartModal.setAttribute("aria-hidden", "true");
}

if (closeCartButton) {
    closeCartButton.addEventListener("click", closeCart);
}

if (cartModal) {
    cartModal.addEventListener("click", function (event) {
        if (event.target === cartModal) {
            closeCart();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeCart();
    }
});

// ==========================================
// MENU NAVIGASI
// ==========================================

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ==========================================
// CHECKOUT WHATSAPP
// ==========================================

function checkout() {
    if (cart.length === 0) {
        showNotification("Keranjang kamu masih kosong!");
        return;
    }

    let message =
        "Halo Mythic Gadget Store! Saya ingin memesan:\n\n";

    cart.forEach(item => {
        message +=
            "Produk: " + item.name + "\n" +
            "Jumlah: " + item.quantity + "\n" +
            "Harga: " +
            formatRupiah(item.price * item.quantity) +
            "\n\n";
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message +=
        "Total Pembayaran: " + formatRupiah(total) +
        "\n\nMohon informasi lebih lanjut. Terima kasih!";

    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
}

if (checkoutButton) {
    checkoutButton.addEventListener("click", checkout);
}

// ==========================================
// TAHUN OTOMATIS
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ==========================================
// MENJALANKAN WEBSITE
// ==========================================

renderProducts();
updateCart();

console.log("Mythic Gadget Store berhasil dijalankan!");
