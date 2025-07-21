document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen dari DOM
    const hexInput = document.getElementById('hexInput');
    const showColorBtn = document.getElementById('showColorBtn');
    const colorPalette = document.getElementById('colorPalette');
    const colorDisplay = document.getElementById('colorDisplay');
    const exitBtn = document.getElementById('exitBtn');

    // Variabel untuk timer
    let hideButtonTimer;

    // Daftar warna rekomendasi
    const recommendedColors = [
        '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
        '#1abc9c', '#3498db', '#9b59b6', '#34495e',
        '#ecf0f1', '#95a5a6', '#c0392b', '#16a085'
    ];

    // Buat palet warna rekomendasi
    recommendedColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.addEventListener('click', () => {
            hexInput.value = color;
            displayColor(color);
        });
        colorPalette.appendChild(swatch);
    });

    // Fungsi untuk menyembunyikan tombol X setelah jeda
    const startHideTimer = () => {
        clearTimeout(hideButtonTimer); // Hapus timer sebelumnya
        hideButtonTimer = setTimeout(() => {
            exitBtn.classList.add('hidden');
        }, 3000); // Sembunyikan setelah 3 detik
    };

    // Fungsi untuk menampilkan warna
    const displayColor = (color) => {
        const hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
        if (!hexRegex.test(color)) {
            alert('Format Hex Code tidak valid. Gunakan format #RRGGBB atau #RGB.');
            return;
        }

        colorDisplay.style.backgroundColor = color;
        colorDisplay.style.display = 'block';

        // Tampilkan tombol X dan mulai timer untuk menyembunyikannya
        exitBtn.classList.remove('hidden');
        startHideTimer();

        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    // Event listener untuk tombol "Tampilkan"
    showColorBtn.addEventListener('click', () => {
        displayColor(hexInput.value);
    });
    
    // Event listener untuk input (tekan Enter)
    hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            displayColor(hexInput.value);
        }
    });

    // Event listener untuk tombol keluar
    exitBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event klik menyebar ke colorDisplay
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });

    // Event listener untuk mendeteksi keluar dari fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            colorDisplay.style.display = 'none';
            clearTimeout(hideButtonTimer); // Matikan timer saat keluar
        }
    });

    // Event listener pada area warna untuk menampilkan kembali tombol X
    colorDisplay.addEventListener('click', () => {
        // Jika tombol sedang tersembunyi, tampilkan kembali
        if (exitBtn.classList.contains('hidden')) {
            exitBtn.classList.remove('hidden');
            startHideTimer(); // Mulai lagi timer untuk menyembunyikan
        }
    });
});
