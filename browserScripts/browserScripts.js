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

    // Listen for 'did-navigate' event to capture navigations
    webview.addEventListener('did-navigate', function (event) {
        console.log('Navigated to:', event.url);
        historyStack.push(event.url); // Add URL to history
    });

    // Add dev tools this functions not working right. 
    // document.addEventListener('keydown', function (e) {
    //     if (e.key === 'F12') {
    //         webview.toggleDevTools();
    //     }
    // });

    // Load a URL and push it to the history stack
    function loadURL(url) {
        webview.loadURL(url);
        historyStack.push(url); // Add URL to history
    }

    // this functions not working right either.
    // View cookies
    document.getElementById('viewCookiesButton').addEventListener('click', viewCookies);
    function viewCookies() {
        console.log('i told you this aint working');
        // const { session } = require('electron');
        // session.defaultSession.cookies.get({})
        //     .then((cookies) => {
        //         console.log('Cookies:', cookies);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching cookies', error);
        //     });
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
