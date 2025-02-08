let plugins = [];
let user = null;
const adminUsername = 'admin'; // Hardcoded admin for simplicity  
const adminPassword = 'password'; // Hardcoded admin password

document.addEventListener('DOMContentLoaded', () => {
    loadPlugins();
    checkCookies();
});

function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
}

function showSection(section) {
    // Logic to show/hide sections based on the button clicked  
    document.body.innerHTML = ''; // Clear content  
    if (section === 'settings') {
        loadSettings();
    } else if (section === 'login') {
        loadLogin();
    } else if (section === 'register') {
        loadRegister();
    } else {
        loadIndex();
    }
}

function loadIndex() {
    // Load the main index page  
    const indexHTML = `
        <div id="navbar">
            <button onclick="showSection('settings')">Settings</button>
            <button onclick="showSection('login')">Login</button>
            <button onclick="showSection('register')">Register</button>
        </div>
        <div id="plugin-list">
            <h2>Available Plugins</h2>
            <div id="plugins">${generatePluginHTML()}</div>
        </div>
        <div id="cookie-banner">
            <p>Do you accept cookies for notifications?</p>
            <button onclick="acceptCookies()">Accept</button>
        </div>
    `;
    document.body.innerHTML = indexHTML;
    checkCookies();
}

function generatePluginHTML() {
    return plugins.map(plugin => `
        <div class="plugin-box">
            <h3>${plugin.name}</h3>
            <p>${plugin.description}</p>
            <p>Discord: <a href="${plugin.discord}" target="_blank">${plugin.discord}</a></p>
            <button onclick="goToPluginPage(${plugin.id})">Go to Page</button>
        </div>
    `).join('');
}

function loadLogin() {
    document.body.innerHTML = `
        <h2>Login</h2>
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button onclick="login()">Login</button>
        <button onclick="showSection('index')">Back</button>
    `;
}

function loadRegister() {
    document.body.innerHTML = `
        <h2>Register</h2>
        <input type="text" id="reg-username" placeholder="Username" required>
        <input type="password" id="reg-password" placeholder="Password" required>
        <button onclick="register()">Register</button>
        <button onclick="showSection('index')">Back</button>
    `;
}

function loadSettings() {
    document.body.innerHTML = `
        <h2>Settings</h2>
        <label for="theme">Select Theme:</label>
        <select id="theme" onchange="changeTheme()">
            <option value="default">Default</option>
            <option value="black-gold">Black & Gold</option>
            <option value="blue-black">Blue & Black</option>
            <option value="white-black">White & Black</option>
        </select>
        <button onclick="logout()">Logout</button>
        <button onclick="showSection('index')">Back</button>
    `;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === adminUsername && password === adminPassword) {
        user = username;
        alert('Logged in as Admin');
        showSection('create-plugin');
    } else {
        alert('Invalid credentials');
    }
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    if (username && password) {
        localStorage.setItem(username, password); // Simple user registration  
        alert('Registered successfully!');
        showSection('index');
    } else {
        alert('Please fill all fields');
    }
}

function createPlugin() {
    const name = document.getElementById('plugin-name').value;
    const description = document.getElementById('plugin-description').value;
    const discord = document.getElementById('plugin-discord').value;
    const newPlugin = {
        name,
        description,
        discord,
        id: plugins.length + 1,
        likes: 0,
        dislikes: 0  
    };

    plugins.push(newPlugin);
    localStorage.setItem('plugins', JSON.stringify(plugins));
    showSection('index');
}

function loadPlugins() {
    const storedPlugins = JSON.parse(localStorage.getItem('plugins'));
    if (storedPlugins) {
        plugins = storedPlugins;
    }
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    document.body.className = theme; // Apply selected theme  
}

function logout() {
    user = null;
    alert('Logged out successfully!');
    showSection('index');
}

function goToPluginPage(pluginId) {
    const plugin = plugins.find(p => p.id === pluginId);
    if (plugin) {
        document.body.innerHTML = `
            <h2>${plugin.name}</h2>
            <p>${plugin.description}</p>
            <p>Discord: <a href="${plugin.discord}" target="_blank">${plugin.discord}</a></p>
            <button onclick="likePlugin(${plugin.id})">Like (${plugin.likes})</button>
            <button onclick="dislikePlugin(${plugin.id})">Dislike (${plugin.dislikes})</button>
            <button onclick="showSection('index')">Back to Plugins</button>
        `;
    }
}

function likePlugin(pluginId) {
    const plugin = plugins.find(p => p.id === pluginId);
    if (user) {
        plugin.likes += 1;
        localStorage.setItem('plugins', JSON.stringify(plugins));
        alert('Liked the plugin!');
    } else {
        alert('You must be logged in to like a plugin.');
    }
}

function dislikePlugin(pluginId) {
    const plugin = plugins.find(p => p.id === pluginId);
    if (user) {
        plugin.dislikes += 1;
        localStorage.setItem('plugins', JSON.stringify(plugins));
        alert('Disliked the plugin!');
    } else {
        alert('You must be logged in to dislike a plugin.');
    }
}
