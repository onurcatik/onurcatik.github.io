// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Simulate avatar loading and remove loading text
    setTimeout(() => {
      const avatarContainer = document.getElementById('avatar-container');
      const avatarLoading = document.getElementById('avatar-loading');
      avatarLoading.style.display = 'none';
  
      const avatar = document.createElement('img');
      avatar.src = './images/avatar.png'; // Replace with the actual path to the avatar image
      avatar.alt = 'Onur Çatık';
      avatarContainer.appendChild(avatar);
    }, 2000); // Simulate a 2-second loading time
  
    // Interactive greeting based on the time of day
    const heroTitle = document.querySelector('.hero-title');
    const currentHour = new Date().getHours();
  
    if (currentHour < 12) {
      heroTitle.textContent = 'Good Morning!';
    } else if (currentHour < 18) {
      heroTitle.textContent = 'Good Afternoon!';
    } else {
      heroTitle.textContent = 'Good Evening!';
    }
  });
  