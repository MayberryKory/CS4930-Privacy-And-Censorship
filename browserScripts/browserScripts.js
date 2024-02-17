//It’s particularly important for any DOM manipulations or
// event listeners that depend on elements being available in the page.
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');

    const webview = document.getElementById('myWebview');
    let historyStack = [];

    // View history
    document.getElementById('viewHistoryButton').addEventListener('click', function() {
        console.log('Browsing History:', historyStack);
    });

    // Add dev tools
    document.addEventListener('keydown', function (e) {
        if (e.key === 'F12') {
            webview.openDevTools();
        }
    });

    // Load a URL and push it to the history stack
    function loadURL(url) {
        webview.loadURL(url);
        historyStack.push(url); // Add URL to history
    }

    // View cookies
    function viewCookies() {
        const { session } = require('electron');
        session.defaultSession.cookies.get({})
            .then((cookies) => {
                console.log('Cookies:', cookies);
                // You can create a custom dialog or UI element to display cookies
            })
            .catch((error) => {
                console.error('Error fetching cookies', error);
            });
    }

    // Auto-focus on the search bar --> clicks search bar for you
    var urlInput = document.querySelector('.url');
    urlInput.focus();

    // Event listener for 'Enter' key press in the search bar
    urlInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            event.preventDefault();
            loadURL(urlInput.value);
        }
    });

    // Context menu for right-clicking (add more options as needed)
    // Haven't tested this so might not work
    document.getElementById("myWebview").addEventListener('contextmenu', function (event) {
        var linkURL = event.target.href;
        if (linkURL) {
            // Opens context menu with options for the link
            // Add more context menu logic here
            event.preventDefault();
        }
    });

});
