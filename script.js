document.addEventListener('DOMContentLoaded', function() {
    // Function to navigate to the home page
    function goHome() {
        document.getElementById("myWebview").loadURL("https://www.startpage.com");
    }

    // Event listener for the home button
    document.getElementById('homeButton').addEventListener('click', goHome);

    // Function to navigate back
    function goBack() {
        document.getElementById("myWebview").goBack();
    }

    // Event listener for the back button
    document.getElementById('backButton').addEventListener('click', goBack);

    // Function to navigate forward
    function goForward() {
        document.getElementById("myWebview").goForward();
    }

    // Event listener for the forward button
    document.getElementById('forwardButton').addEventListener('click', goForward);

    // Function to handle URL navigation
    function goToURL() {
        var urlInput = document.querySelector('.url');
        var url = urlInput.value.trim();
    
        // Check if the URL starts with a protocol (e.g., 'http://' or 'https://')
        if (!url.match(/^https?:\/\//i)) {
            // If not, prepend 'https://'
            url = 'https://' + url;
        }
    
        document.getElementById("myWebview").loadURL(url);
    }

    // Auto-focus on the search bar
    var urlInput = document.querySelector('.url');
    urlInput.focus();

    // Event listener for 'Enter' key press in the search bar
    urlInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToURL();
        }
    });

    // Keyboard shortcut for Ctrl+R for refresh
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'r') {
            document.getElementById("myWebview").reload();
            event.preventDefault();
        }
    });

    // Function to refresh the page
    function refreshPage() {
        document.getElementById("myWebview").reload();
    }

    // Event listener for the refresh button
    document.getElementById('refreshButton').addEventListener('click', refreshPage);

    // Context menu for right-clicking (add more options as needed)
    document.getElementById("myWebview").addEventListener('contextmenu', function(event) {
        var linkURL = event.target.href;
        if (linkURL) {
            // Opens context menu with options for the link
            // Add more context menu logic here
            event.preventDefault();
        }
    });
});
