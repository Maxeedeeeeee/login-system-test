<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="default">
    <h2>Settings</h2>
    <label for="theme">Select Theme:</label>
    <select id="theme" onchange="changeTheme()">
        <option value="default">Default</option>
        <option value="black-gold">Black & Gold</option>
        <option value="blue-black">Blue & Black</option>
        <option value="white-black">White & Black</option>
    </select>
    <button onclick="logout()">Logout</button>

    <script src="script.js"></script>
</body>
</html>
