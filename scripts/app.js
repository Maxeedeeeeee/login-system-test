// Function to handle registration  
document.getElementById("register-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const registerError = document.getElementById("register-error");

    // Validation: Check if passwords match  
    if (password !== confirmPassword) {
        registerError.textContent = "Passwords do not match!";
        return;
    }

    // Check if user already exists  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        registerError.textContent = "Username already exists!";
        return;
    }

    // Add new user  
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! Please log in.");
    window.location.href = 'login.html'; // Redirect to login  
});

// Function to handle login  
document.getElementById("login-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("login-error");
    const loginStatus = document.getElementById("login-status");

    // Fetch users  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Logged in as " + username);
        localStorage.setItem('loggedInUser', username); // Set logged-in user  
        loginStatus.textContent = `You have logged into your account named ${username}`;
        loginStatus.style.display = "block";
        window.location.href = 'index.html'; // Redirect to main page  
    } else {
        loginError.textContent = "You have entered invalid credentials.";
    }
});

// Check for logged-in user on index.html  
if (window.location.pathname.endsWith("index.html")) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginStatus = document.getElementById("login-status");

    if (loggedInUser) {
        loginStatus.textContent = `Welcome back, ${loggedInUser}!`;
        loginStatus.style.display = "block";
    } else {
        // Redirect to login if not logged in  
        window.location.href = 'login.html';
    }
}

// Cookie consent logic  
document.getElementById("accept-cookies")?.addEventListener("click", function() {
    document.getElementById("cookie-consent").style.display = "none";
    document.cookie = "consent=true";
});

document.getElementById("decline-cookies")?.addEventListener("click", function() {
    document.getElementById("cookie-consent").style.display = "none";
});
