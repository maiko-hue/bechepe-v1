// zoom.js
document.addEventListener('DOMContentLoaded', () => {
    let currentZoom = parseFloat(localStorage.getItem('appZoomLevel')) || 1.0;
    
    const applyZoom = (zoom) => {
        document.documentElement.style.zoom = zoom;
        document.documentElement.style.setProperty('--app-zoom', zoom);
        
        // Ajustar el alto del html y body por si acaso
        const adjustedHeight = (100 / zoom) + 'vh';
        document.documentElement.style.minHeight = adjustedHeight;
        document.body.style.minHeight = adjustedHeight;
        
        requestAnimationFrame(() => {
            const bodyBg = window.getComputedStyle(document.body).backgroundColor;
            document.documentElement.style.backgroundColor = bodyBg;
        });
    };

    applyZoom(currentZoom);

    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const zoomText = document.getElementById('zoom-text');

    if (btnZoomIn && btnZoomOut && zoomText) {
        zoomText.innerText = Math.round(currentZoom * 100) + '%';
        btnZoomIn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentZoom < 1.4) {
                currentZoom += 0.1;
                localStorage.setItem('appZoomLevel', currentZoom.toFixed(1));
                applyZoom(currentZoom);
                zoomText.innerText = Math.round(currentZoom * 100) + '%';
            }
        });
        btnZoomOut.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentZoom > 0.7) {
                currentZoom -= 0.1;
                localStorage.setItem('appZoomLevel', currentZoom.toFixed(1));
                applyZoom(currentZoom);
                zoomText.innerText = Math.round(currentZoom * 100) + '%';
            }
        });
    }
    // --- MODO IPHONE ---
    const applyIphoneMode = (isIphone) => {
        if (isIphone) {
            document.body.classList.add('iphone-mode');
        } else {
            document.body.classList.remove('iphone-mode');
        }
    };
    
    let isIphoneMode = localStorage.getItem('iphoneMode') === 'true';
    applyIphoneMode(isIphoneMode);

    const iphoneToggle = document.getElementById('iphone-mode-toggle');
    if (iphoneToggle) {
        iphoneToggle.checked = isIphoneMode;
        iphoneToggle.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            localStorage.setItem('iphoneMode', isChecked ? 'true' : 'false');
            applyIphoneMode(isChecked);
        });
    }
});
