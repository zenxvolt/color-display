document.addEventListener('DOMContentLoaded', () => {
    // Get elements from the DOM
    const hexInput = document.getElementById('hexInput');
    const showColorBtn = document.getElementById('showColorBtn');
    const colorPalette = document.getElementById('colorPalette');
    const colorDisplay = document.getElementById('colorDisplay');

    // List of recommended colors
    const recommendedColors = [
        '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
        '#1abc9c', '#3498db', '#9b59b6', '#34495e',
        '#ecf0f1', '#95a5a6', '#c0392b', '#16a085'
    ];

    // Create the recommended color palette
    recommendedColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.classList.add('color-swatch');
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.addEventListener('click', () => {
            // Remove the # symbol when inserted into the input
            const pureHex = color.replace('#', '');
            hexInput.value = pureHex;
            displayColor(pureHex);
        });
        colorPalette.appendChild(swatch);
    });

    // Function to display the color in fullscreen
    const displayColor = (colorHex) => {
        // Remove # symbol if the user accidentally types it
        const cleanColor = colorHex.replace('#', '');
        
        // Updated Regex: Validate 3 or 6 digits without #
        const hexRegex = /^([0-9A-F]{3}){1,2}$/i;
        if (!hexRegex.test(cleanColor)) {
            alert('Invalid Hex Code format. Please enter 3 or 6 characters (e.g., RRGGBB).');
            return;
        }

        // Add the # back for the CSS background property
        colorDisplay.style.backgroundColor = '#' + cleanColor;
        colorDisplay.style.display = 'block';

        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    // Event listener for the "Show" button
    showColorBtn.addEventListener('click', () => {
        displayColor(hexInput.value);
    });
    
    // Event listener for the input (press Enter)
    hexInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            displayColor(hexInput.value);
        }
    });

    // FIX: Tap the color screen to exit fullscreen
    colorDisplay.addEventListener('click', () => {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        } else {
            // If for some reason it's not in fullscreen state, still hide the display
            colorDisplay.style.display = 'none';
        }
    });

    // Event listener to detect exiting fullscreen
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            colorDisplay.style.display = 'none';
        }
    });
});
