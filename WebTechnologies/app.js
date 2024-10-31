document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    let phone = document.getElementById('phone').value;
    let phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid 11-digit phone number.');
        event.preventDefault();
    }
});
document.getElementById('open-popup')?.addEventListener('click', function() {
    document.getElementById('popup-form').classList.remove('d-none');
});
document.getElementById('close-popup')?.addEventListener('click', function() {
    document.getElementById('popup-form').classList.add('d-none');
});
function updateDateTime() {
    let now = new Date();
    let formattedDate = now.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    document.getElementById('date-time').textContent = formattedDate;
}
if (document.getElementById('date-time')) {
    setInterval(updateDateTime, 1000);
}
document.getElementById('toggle-theme')?.addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    if (document.body.classList.contains('night-mode')) {
        document.body.classList.remove('day-mode');
        this.textContent = 'Switch to Day Mode';
    } else {
        document.body.classList.add('day-mode');
        this.textContent = 'Switch to Night Mode';
    }
});

let accordions = document.getElementsByClassName('accordion');
for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let panel = this.nextElementSibling;
        panel.classList.toggle('show');
    });
}
document.getElementById('change-color')?.addEventListener('click', function() {
    let colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});
document.getElementById('read-more').addEventListener('click', function() {
    const moreText = document.getElementById('more-text');
    moreText.style.display = moreText.style.display === 'none' ? 'block' : 'none';
    this.textContent = moreText.style.display === 'none' ? 'Read More' : 'Read Less';
});
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = document.getElementById('main-image');
        mainImage.src = this.dataset.fullsize;
    });
});
document.getElementById('reset-form').addEventListener('click', function() {
    document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => input.value = '');
});
const errorSound = new Audio('6_sto-k-odnomu-ne-pra_ilnyy-ot_e.mp3');
const successSound = new Audio('117b84d0f296403.mp3');

document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    let phone = document.getElementById('phone').value;
    let phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(phone)) {
        errorSound.play();
        alert('Please enter a valid 11-digit phone number.');
        event.preventDefault();
    } else {
        successSound.play();
        alert('Form submitted successfully!');
    }
});
document.addEventListener('keydown', function(event) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let focusedIndex = Array.from(navLinks).indexOf(document.activeElement);
    if (event.key === 'ArrowRight') {
        focusedIndex = (focusedIndex + 1) % navLinks.length;
        navLinks[focusedIndex].focus();
    } else if (event.key === 'ArrowLeft') {
        focusedIndex = (focusedIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[focusedIndex].focus();
    }
});
document.getElementById('auth-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    alert(`Welcome, ${username}!`);
    toggleAuthUI();
});
document.getElementById('logout-button')?.addEventListener('click', function() {
    localStorage.removeItem('username');
    alert('Logged out successfully.');
    toggleAuthUI();
});
function toggleAuthUI() {
    const username = localStorage.getItem('username');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    if (username) {
        loginForm.classList.add('d-none');
        logoutButton.classList.remove('d-none');
    } else {
        loginForm.classList.remove('d-none');
        logoutButton.classList.add('d-none');
    }
}
toggleAuthUI();
document.getElementById('toggle-theme')?.addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('day-mode');
    const theme = document.body.classList.contains('night-mode') ? 'night' : 'day';
    localStorage.setItem('theme', theme);
});
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        document.body.classList.add('night-mode');
        document.body.classList.remove('day-mode');
        document.getElementById('toggle-theme').textContent = 'Switch to Day Mode';
    } else {
        document.body.classList.add('day-mode');
        document.body.classList.remove('night-mode');
        document.getElementById('toggle-theme').textContent = 'Switch to Night Mode';
    }
});
// Ensure only day-mode or night-mode exists at any time
document.getElementById('toggle-theme')?.addEventListener('click', function() {
    if (document.body.classList.contains('night-mode')) {
        document.body.classList.remove('night-mode');
        document.body.classList.add('day-mode');
        this.textContent = 'Switch to Night Mode';
    } else {
        document.body.classList.remove('day-mode');
        document.body.classList.add('night-mode');
        this.textContent = 'Switch to Day Mode';
    }
});

document.getElementById('destination')?.addEventListener('change', function() {
    localStorage.setItem('selectedDestination', this.value);
});
window.addEventListener('DOMContentLoaded', () => {
    const savedDestination = localStorage.getItem('selectedDestination');
    if (savedDestination) {
        document.getElementById('destination').value = savedDestination;
    }
});
