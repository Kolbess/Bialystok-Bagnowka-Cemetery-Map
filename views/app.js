document.addEventListener('DOMContentLoaded', () => {

    const currentPath = window.location.pathname.split('/').pop() || 'home.html';

    // -------------------------
    // Top Navigation
    // -------------------------
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent.trim().toLowerCase();
            if (text === 'map view') {
                window.location.href = 'home.html';
            } else if (text === 'surname search') {
                window.location.href = 'surname_search_base.html';
            } else if (text === 'legend') {
                if (currentPath === 'legend_on.html') {
                    window.location.href = 'legend_off.html';
                } else {
                    window.location.href = 'legend_on.html';
                }
            }
        });
    });

    // -------------------------
    // Sidebar Filter Logic (Mock logic)
    // -------------------------
    const searchBtn = document.querySelector('.sidebar .btn-primary');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (currentPath.startsWith('surname_search')) {
                window.location.href = 'surname_search_result.html';
                return;
            } else if (currentPath.startsWith('unlocated_graves')) {
                window.location.href = 'unlocated_graves.html';
                return;
            }

            // Normal map filtering logic
            const inputs = document.querySelectorAll('.input-glass');
            let secVal = '', rowVal = '', surVal = '';

            inputs.forEach(input => {
                const prev = input.previousElementSibling;
                if (!prev) return;
                const label = prev.textContent.trim().toLowerCase();
                const v = input.value.trim();
                if (label.includes('section') && v) secVal = v;
                if (label.includes('row') && v) rowVal = v;
                if (label.includes('surname') && v) surVal = v;
            });

            if (secVal && rowVal && surVal) {
                window.location.href = 'filter_multi.html';
            } else if (rowVal) {
                window.location.href = 'filter_row.html';
            } else if (secVal) {
                window.location.href = 'filter_section.html';
            } else if (surVal) {
                // surname map filter view doesn't exist? Wait, it's filter_surname.html
                window.location.href = 'filter_surname.html';
            } else {
                // If nothing is entered, return to home
                window.location.href = 'home.html';
            }
        });
    }

    // -------------------------
    // Tabs Navigation (Surname specific)
    // -------------------------
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('active')) return;

            const text = tab.textContent.trim().toLowerCase();
            const isBase = currentPath.includes('base');

            if (text === 'located graves') {
                window.location.href = isBase ? 'surname_search_base.html' : 'surname_search_result.html';
            } else if (text === 'unlocated graves') {
                window.location.href = isBase ? 'unlocated_graves_base.html' : 'unlocated_graves.html';
            }
        });
    });

    // -------------------------
    // Clear Search Navigation
    // -------------------------
    const clearBtns = document.querySelectorAll('.clear-search-btn');
    clearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isUnlocated = currentPath.includes('unlocated');
            window.location.href = isUnlocated ? 'unlocated_graves_base.html' : 'surname_search_base.html';
        });
    });

    // -------------------------
    // List Item Navigation
    // -------------------------
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            if (currentPath === 'surname_search_result.html') {
                window.location.href = 'grave_detail.html';
            }
        });
    });

    // -------------------------
    // Gallery Navigation
    // -------------------------
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');
    const galleryImage = document.getElementById('gallery-image');
    const photoCounter = document.getElementById('photo-counter');

    if (prevBtn && nextBtn && galleryImage && photoCounter) {
        const photos = ['../photo1.jpg', '../photo2.jpg', '../photo3.jpg'];
        let currentPhotoIndex = 0;

        const updateGallery = () => {
            // Slight fade effect
            galleryImage.style.opacity = 0.5;
            setTimeout(() => {
                galleryImage.src = photos[currentPhotoIndex];
                photoCounter.textContent = `Photo ${currentPhotoIndex + 1} of ${photos.length}`;
                galleryImage.style.opacity = 1;
            }, 150);
        };
        
        galleryImage.style.transition = 'opacity 0.2s ease';

        prevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            updateGallery();
        });

        nextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            updateGallery();
        });
    }

    // -------------------------
    // Expand Gallery Logic
    // -------------------------
    const expandBtn = document.getElementById('expand-gallery-btn');
    const modal = document.querySelector('.grave-detail-modal');

    if (expandBtn && modal) {
        expandBtn.addEventListener('click', () => {
            const isExpanded = modal.classList.toggle('expanded');
            if (isExpanded) {
                expandBtn.innerHTML = '&#x25B2;';
            } else {
                expandBtn.innerHTML = '&#x25BC;';
            }
        });
    }

    // -------------------------
    // Map Interaction (Grids & Zooming)
    // -------------------------
    // Map zooming logic when clicking a map section
    const mapSections = document.querySelectorAll('.map-section, .map-section-zoomed');
    mapSections.forEach(section => {
        section.addEventListener('click', (e) => {
            // Prevent if they clicked a specific grave inside the section
            if (e.target.classList.contains('grave-plot') || e.target.classList.contains('grave')) {
                return;
            }
            if (currentPath.includes('row')) {
                window.location.href = 'row_filter_zoom_in.html';
            } else {
                window.location.href = 'zoom_in.html';
            }
        });
    });

    // Specific grave clicks trigger hover/click screens to keep pure HTML flow
    const gravePlots = document.querySelectorAll('.grave-plot');
    gravePlots.forEach(grave => {
        grave.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentPath === 'grave_hover.html') {
                window.location.href = 'grave_click.html';
            } else {
                window.location.href = 'grave_hover.html';
            }
        });
    });

    // -------------------------
    // Modal Details (Grave Click / Details)
    // -------------------------
    const viewFullBtn = document.querySelector('.side-popup .btn-primary');
    if (viewFullBtn) {
        viewFullBtn.addEventListener('click', () => {
            window.location.href = 'grave_detail.html';
        });
    }

    const closeBtn = document.querySelector('.side-popup .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.location.href = 'zoom_in.html';
        });
    }

    // Grave Detail overlay — click blurred background to go back
    const graveDetailModal = document.querySelector('.grave-detail-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    if (graveDetailModal && modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            // Only close if they clicked the overlay itself, not the modal content
            if (!graveDetailModal.contains(e.target)) {
                window.location.href = 'grave_click.html';
            }
        });
    }

    // "Support Our Restoration Work" button → donate page
    const supportRestorationBtn = document.querySelector('.grave-detail-modal .btn-primary');
    if (supportRestorationBtn) {
        supportRestorationBtn.addEventListener('click', () => {
            window.open('https://bialystokcemeteryrestoration.org/donate/', '_blank');
        });
    }

    // -------------------------
    // Zoom +/- Controls
    // -------------------------
    const mapContainer = document.querySelector('.map-container');
    const zoomedInPages = ['zoom_in.html', 'row_filter_zoom_in.html', 'grave_hover.html', 'grave_click.html'];
    const zoomedOutPages = ['zoom_out.html', 'row_filter_zoom_out.html'];
    const basePages = ['home.html', 'filter_section.html', 'filter_row.html', 'filter_surname.html', 'filter_multi.html', 'legend_off.html', 'legend_on.html', 'surname_search_base.html', 'surname_search_result.html'];
    const isZoomedIn = zoomedInPages.includes(currentPath);
    const isZoomedOut = zoomedOutPages.includes(currentPath);
    const isBase = basePages.includes(currentPath);
    const isRowFiltered = currentPath.includes('filter_row.html');

    if (mapContainer && (isZoomedIn || isZoomedOut || isBase)) {
        mapContainer.style.position = 'relative';

        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';

        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn zoom-btn';
        plusBtn.textContent = '+';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn zoom-btn';
        minusBtn.textContent = '−';

        // Disable buttons at limits
        if (isZoomedIn) plusBtn.classList.add('zoom-btn-disabled');
        if (isZoomedOut) minusBtn.classList.add('zoom-btn-disabled');

        plusBtn.addEventListener('click', () => {
            if (isRowFiltered) {
                window.location.href = 'row_filter_zoom_in.html';
            } else if (isBase) {
                window.location.href = 'zoom_in.html';
            } else if (isZoomedOut) {
                window.location.href = currentPath.includes('row') ? 'filter_row.html' : 'home.html';
            }
        });

        minusBtn.addEventListener('click', () => {
            if (isRowFiltered) {
                window.location.href = 'row_filter_zoom_out.html';
            } else if (isBase) {
                window.location.href = 'zoom_out.html';
            } else if (isZoomedIn) {
                if (currentPath.includes('row')) {
                    window.location.href = 'filter_row.html';
                } else {
                    window.location.href = 'home.html';
                }
            } else if (isZoomedOut) {
                window.location.href = 'home.html';
            }
        });

        zoomControls.appendChild(plusBtn);
        zoomControls.appendChild(minusBtn);
        mapContainer.appendChild(zoomControls);
    }

    // -------------------------
    // Support Button
    // -------------------------
    const supportBtn = document.querySelector('.support-btn-wrapper .btn-icon');
    if (supportBtn) {
        supportBtn.addEventListener('click', () => {
            window.location.href = 'support_panel.html';
        });
    }

    // -------------------------
    // FAQ Accordion (Support Panel)
    // -------------------------
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            item.classList.toggle('open');
        });
    });

    // Support panel close
    const supportCloseBtn = document.querySelector('.support-panel-header .close-btn');
    if (supportCloseBtn) {
        supportCloseBtn.addEventListener('click', () => {
            // Go back to the previous page, fallback to home
            if (document.referrer && document.referrer.includes('views')) {
                window.history.back();
            } else {
                window.location.href = 'home.html';
            }
        });
    }

});
