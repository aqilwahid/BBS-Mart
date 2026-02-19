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

    window.startChatDemo = function() {
        // Reset chat
        chatBody.innerHTML = '';
        chatState = 0;
        statusDiv.innerText = "Simulasi dimulai...";
        
        // Step 1: User asks
        addMessage('Cari keripik singkong pedas', 'out');
        
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
                
                statusDiv.innerText = "AI menampilkan hasil.";
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

    function selectProduct(productName) {
        // Step 3: User selects
        addMessage(`Saya pesan ${productName}`, 'out');
        statusDiv.innerText = "User memilih produk.";
        
        // Step 4: AI Confirms & Upsell
        setTimeout(() => {
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage(`Baik, pesanan diteruskan ke penjual.`, 'in');
                
                setTimeout(() => {
                    addMessage(`Perlu jasa antar sampai rumah?`, 'in');
                    
                    // Yes/No Options
                    const confirmDiv = document.createElement('div');
                    confirmDiv.classList.add('message', 'in', 'product-options');
                    const yesBtn = createProductOption('Ya, tolong carikan kurir', 'yes');
                    confirmDiv.appendChild(yesBtn);
                    chatBody.appendChild(confirmDiv);
                    scrollToBottom();
                    statusDiv.innerText = "AI menawarkan kurir.";

                }, 800);
            }, 1000);
        }, 500);
    }

    window.selectCourier = function() { // Implicitly called by the 'yes' option above logic if expanded, but simple click handler handles it
        // We attach the logic dynamically in createProductOption for simplicity, 
        // but here we need to handle the specific "Yes" click.
        // Modified createProductOption above handles generic click, let's override for the "Yes" logic or just use the generic one for flow.
        // We will make the createProductOption smarter in a real app, but for proto:
    };
    
    // Override click for the "Yes" button specifically in the flow:
    // Actually, let's refactor createProductOption to take a callback or just inspect text.
    // For this prototype, I'll rely on the text content to branch logic.
    
    const originalSelect = selectProduct;
    selectProduct = function(text) {
        addMessage(text, 'out');
        
        if (text.includes('kurir')) {
            // Final Step
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage('Kurir "Cak Budi" sedang menuju lokasi. Estimasi biaya Rp 5.000.', 'in');
                    addMessage('Total: Rp 17.000. Bayar via BPRS atau COD.', 'in');
                    statusDiv.innerText = "Transaksi Selesai.";
                    scrollToBottom();
                }, 1000);
            }, 500);
        } else {
            // Normal product selection flow
            // Re-use logic from before, but avoid infinite recursion if I called originalSelect inside.
            // Let's just inline the product selection logic here for clarity.
             statusDiv.innerText = "User memilih produk.";
             
             setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage(`Baik, pesanan diteruskan ke penjual.`, 'in');
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
