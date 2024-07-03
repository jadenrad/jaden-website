document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    const friendsOnlyBtn = document.getElementById('friends-only-btn');
    const friendsOnlySection = document.getElementById('friends-only-section');
    const friendsOnlyForm = document.getElementById('friends-only-form');
    const pinInput = document.getElementById('pin-input');

    friendsOnlyBtn.addEventListener('click', () => {
        friendsOnlySection.style.display = 'block';
    });

    friendsOnlyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (pinInput.value === '696420') {
            friendsOnlyForm.style.display = 'none';
            alert('access granted');
        } else {
            alert('invalid pin');
        }
    });

    const visitorCount = document.getElementById('visitor-count');
    fetch('https://api.countapi.xyz/hit/jaden-website/visits')
        .then(response => response.json())
        .then(data => {
            visitorCount.textContent = data.value;
        });

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.7)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fetch Google Sheets data and load gallery
    function fetchGalleryData() {
        const sheetId = '18R2GoOAPbXtAq45OXKjlYyW4vLi5FS9lqhkw4B5XQtc';
        const sheetName = 'Form Responses 1';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=YOUR_API_KEY`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rows = data.values.slice(1); // Skip header row
                const galleryGrid = document.getElementById('gallery-grid');
                rows.forEach(row => {
                    const [timestamp, title, description, imageUrl] = row;
                    const galleryItem = document.createElement('div');
                    galleryItem.classList.add('gallery-item');
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = title;
                    galleryItem.appendChild(img);
                    const heartButton = document.createElement('div');
                    heartButton.classList.add('heart-button');
                    galleryItem.appendChild(heartButton);
                    galleryGrid.appendChild(galleryItem);
                });
            })
            .catch(error => console.error('Error fetching gallery data:', error));
    }

    fetchGalleryData();
});