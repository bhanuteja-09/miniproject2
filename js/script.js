document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const navbarLinks = document.querySelectorAll('.navbar-nav a');
    navbarLinks.forEach(navbarLink => {
        navbarLink.addEventListener('click', function(event) {
            event.preventDefault();
            const hash = this.hash;
            const offset = document.querySelector('.navbar').offsetHeight;

            // Smooth scroll to the hash target
            window.scrollTo({
                top: document.querySelector(hash).offsetTop - offset,
                behavior: 'smooth'
            });

            // Close the responsive navbar menu after clicking on a link
            const navbarCollapse = document.querySelector(".navbar-collapse");
            navbarCollapse.classList.remove("show");
        });
    });

    // Responsive menu toggle
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function() {
        navbarCollapse.classList.toggle("show");

        // Toggle the aria-expanded attribute for accessibility
        const isOpen = navbarCollapse.classList.contains("show");
        navbarToggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close navbar menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute("aria-expanded", "false");
        }
    });

    // Animate navigation items on load
    function animateNav() {
        const navItems = document.querySelectorAll('.navbar-nav li');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = 0;
                setTimeout(() => {
                    item.style.opacity = 1;
                }, 300);
            }, index * 100);
        });
    }

    animateNav(); // Trigger animation on initial load

    // Back to top button functionality
    const backToTopButton = document.getElementById("backToTop");
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show or hide back to top button based on scroll position
    window.addEventListener("scroll", function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Tab switching functionality
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            tabLinks.forEach(link => link.classList.remove('active-link'));
            tabContents.forEach(content => content.classList.remove('active-tab'));

            this.classList.add('active-link');
            document.getElementById(tabName).classList.add('active-tab');
        });
    });

    // Function to validate the contact form
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        let valid = true;

        if (name === '') {
            nameError.textContent = 'Please enter your name';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            valid = false;
        }

        if (message === '') {
            messageError.textContent = 'Please enter your message';
            valid = false;
        }

        return valid;
    }
});
