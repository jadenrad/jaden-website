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
    const friendsPostForm = document.getElementById('friends-post-form');
    const friendsPostContent = document.getElementById('friends-post-content');
    const submitFriendsPostBtn = document.getElementById('submit-friends-post');

    friendsOnlyBtn.addEventListener('click', () => {
        friendsOnlySection.style.display = 'block';
    });

    friendsOnlyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (pinInput.value === '696420') {
            friendsOnlySection.style.display = 'none';
            friendsPostForm.style.display = 'block';
        } else {
            alert('Invalid PIN');
        }
    });

    submitFriendsPostBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const postContent = friendsPostContent.value;

        if (postContent.trim() !== "") {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerText = postContent;
            postContainer.appendChild(postElement);

            friendsPostContent.value = "";
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

    // Hide loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle post submissions
    const postForm = document.getElementById('post-form');
    const postContainer = document.getElementById('post-container');

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('post-name').value;
        const email = document.getElementById('post-email').value;
        const displayEmail = document.getElementById('email-opt-in').checked;
        const content = document.getElementById('post-content').value;
        const mediaFile = document.getElementById('post-media').files[0];

        if (content.trim() !== "") {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const nameElement = document.createElement('h3');
            nameElement.innerText = name;
            postElement.appendChild(nameElement);

            if (displayEmail && email.trim() !== "") {
                const emailElement = document.createElement('p');
                emailElement.innerText = email;
                postElement.appendChild(emailElement);
            }

            const contentElement = document.createElement('p');
            contentElement.innerText = content;
            postElement.appendChild(contentElement);

            if (mediaFile) {
                const mediaElement = document.createElement(mediaFile.type.startsWith('image/') ? 'img' : 'video');
                mediaElement.src = URL.createObjectURL(mediaFile);
                if (mediaFile.type.startsWith('video/')) {
                    mediaElement.controls = true;
                }
                postElement.appendChild(mediaElement);
            }

            postContainer.appendChild(postElement);
            postForm.reset();
        }
    });
});