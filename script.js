document.addEventListener("DOMContentLoaded", () => {
    // 1. Banner Slider Otomatis
    const bannerTexts = [
        { text: "Promo Alat Tulis Terbaik!", subtext: "Temukan berbagai alat tulis kantor dengan harga terbaik." },
        { text: "Diskon Besar!", subtext: "Dapatkan diskon hingga 50% untuk produk tertentu." },
        { text: "Alat Tulis Berkualitas", subtext: "Pilihan terbaik untuk kebutuhan kantor Anda." }
    ];
    let currentBannerIndex = 0;

    function changeBanner() {
        const bannerTextElement = document.querySelector(".banner h2");
        const bannerSubTextElement = document.querySelector(".banner p");

        bannerTextElement.textContent = bannerTexts[currentBannerIndex].text;
        bannerSubTextElement.textContent = bannerTexts[currentBannerIndex].subtext;

        currentBannerIndex = (currentBannerIndex + 1) % bannerTexts.length;
    }

    setInterval(changeBanner, 3000); // Ganti banner setiap 3 detik

    // 2. Notifikasi Tambah ke Keranjang
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            showNotification("Produk berhasil ditambahkan ke keranjang!");
        });
    });

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("fade");
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 2000);
    }

    // 3. Validasi Formulir Pemesanan
    const orderForm = document.querySelector("form");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Cegah pengiriman form default

            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const telepon = document.getElementById("telepon").value.trim();
            const alamat = document.getElementById("alamat").value.trim();

            if (!nama || !email || !telepon || !alamat) {
                showNotification("Mohon lengkapi semua data sebelum memproses pesanan.");
            } else {
                showNotification("Pemesanan berhasil diproses!");
                orderForm.reset();
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Mendapatkan data keranjang dari localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Menampilkan jumlah produk di keranjang
    function updateCartCount() {
        document.getElementById("cart-count").textContent = cart.length;
    }

    // Fungsi untuk menambah produk ke keranjang
    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart)); // Simpan ke localStorage
        updateCartCount();
        showNotification(`${product.name} berhasil ditambahkan ke keranjang!`);
    }

    // Ambil tombol "Beli" untuk setiap produk
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".card");
            const product = {
                name: productCard.querySelector(".card-title").textContent,
                price: productCard.querySelector(".card-text").textContent,
                image: productCard.querySelector("img").src
            };
            addToCart(product);
        });
    });

    updateCartCount(); 
    // Update jumlah produk saat halaman dimuat
});


