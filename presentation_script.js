document.addEventListener('DOMContentLoaded', () => {
    // === Slide Navigation Logic ===
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    let currentSlide = 0;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            indicators[index].classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
                indicators[index].classList.add('active');
            }
        });
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlide();
        }
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    });

    // === Chat Simulation Logic ===
    const chatBody = document.getElementById('chatBody');
    const statusDiv = document.getElementById('simulation-status');
    let chatState = 0; // 0: Start, 1: AI Result, 2: User Select, 3: Delivery Offer, 4: Done

    window.startChatDemo = function () {
        // Reset chat
        chatBody.innerHTML = '';
        chatState = 0;
        statusDiv.innerText = "Simulasi dimulai...";

        // Poin 4: Tantangan NLP (Bahasa Gaul/Daerah & Typo)
        // User menggunakan bahasa lokal/singkatan
        addMessage('Cari kripik singkong pedes cacak', 'out');

        // Step 2: AI Thinking & Replies
        setTimeout(() => {
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage('Berikut rekomendasi Keripik Singkong Pedas terdekat:', 'in');

                // Add product options
                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('message', 'in', 'product-options');

                const p1 = createProductOption('Keripik "Mak Nyak" - Rp 12.000 - 500m', 1);
                const p2 = createProductOption('Keripik "Sumber Rejeki" - Rp 10.000 - 1.2km', 2);

                optionsDiv.appendChild(p1);
                optionsDiv.appendChild(p2);
                chatBody.appendChild(optionsDiv);

                statusDiv.innerText = "AI memahami konteks lokal & menampilkan hasil.";
                scrollToBottom();
            }, 1000); // AI think time
        }, 500); // Network delay
    };

    function createProductOption(text, id) {
        const div = document.createElement('div');
        div.classList.add('product-option');
        div.innerText = text;
        div.onclick = () => selectProduct(text);
        return div;
    }

    function selectProduct(text) {
        addMessage(text, 'out');

        if (text.includes('Mak Nyak')) {
            // Poin 1: Sinkronisasi Inventaris (Skenario Habis Stok & Rekomendasi)
            statusDiv.innerText = "Memeriksa ketersediaan stok ke penjual...";
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage('Waduh, barusan dicek ke penjual, Keripik "Mak Nyak" ternyata baru saja habis di toko offline. 😅', 'in');
                    setTimeout(() => {
                        showTyping();
                        setTimeout(() => {
                            removeTyping();
                            addMessage('Sebagai gantinya, "Keripik Sumber Rejeki" ready dan jaraknya dekat (1.2km). Mau pesankan ini saja?', 'in');
                            const confirmDiv = document.createElement('div');
                            confirmDiv.classList.add('message', 'in', 'product-options');
                            const yesBtn = document.createElement('div');
                            yesBtn.classList.add('product-option');
                            yesBtn.innerText = 'Boleh, pesan Sumber Rejeki';
                            yesBtn.onclick = () => selectProduct('Boleh, pesan Sumber Rejeki');
                            confirmDiv.appendChild(yesBtn);
                            chatBody.appendChild(confirmDiv);
                            scrollToBottom();
                            statusDiv.innerText = "AI menawarkan alternatif (Negosiasi otomatis).";
                        }, 1000);
                    }, 500);
                }, 1000);
            }, 500);
        } else if (text.includes('Sumber Rejeki')) {
            // Normal product selection flow
            statusDiv.innerText = "User menyetujui produk.";
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage(`Baik, pesanan diteruskan ke penjual Keripik "Sumber Rejeki".`, 'in');
                    setTimeout(() => {
                        addMessage(`Perlu jasa antar sampai rumah?`, 'in');
                        const confirmDiv = document.createElement('div');
                        confirmDiv.classList.add('message', 'in', 'product-options');
                        const yesBtn = document.createElement('div');
                        yesBtn.classList.add('product-option');
                        yesBtn.innerText = 'Ya, tolong carikan kurir';
                        yesBtn.onclick = () => selectProduct('Ya, tolong carikan kurir');
                        confirmDiv.appendChild(yesBtn);
                        chatBody.appendChild(confirmDiv);
                        scrollToBottom();
                        statusDiv.innerText = "AI menawarkan kurir.";
                    }, 800);
                }, 1000);
            }, 500);
        } else if (text.includes('kurir')) {
            // Poin 5 & Poin 2: Sustainability (Admin Fee) & Validasi Pembayaran Mandiri (BPRS API)
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage('Kurir "Cak Budi" sedang menuju ke penjual. Estimasi ongkir Rp 5.000.', 'in');

                    setTimeout(() => {
                        addMessage('📝 Rincian Pembayaran:\n- Produk: Rp 10.000\n- Ongkir: Rp 5.000\n- Admin Layanan: Rp 1.000\n\nTotal: Rp 16.000', 'in');

                        setTimeout(() => {
                            addMessage('Anda bisa bayar via transfer BPRS Bhakti Sumekar (AI otomatis memvalidasi mutasi via Open API) atau COD.', 'in');
                            statusDiv.innerText = "Transaksi Selesai & Validasi Pembayaran.";
                            scrollToBottom();
                        }, 1200);
                    }, 1000);
                }, 1000);
            }, 500);
        }
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.classList.add('message', type);
        div.innerText = text;
        chatBody.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        const div = document.createElement('div');
        div.classList.add('message', 'in', 'typing-indicator');
        div.id = 'typing';
        div.innerText = '...';
        chatBody.appendChild(div);
        scrollToBottom();
    }

    function removeTyping() {
        const typing = document.getElementById('typing');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
