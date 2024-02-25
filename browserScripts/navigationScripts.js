document.addEventListener('DOMContentLoaded', function() {
    //function to navigate to the home page
    function goHome() {
        document.getElementById("myWebview").loadURL("https://www.startpage.com");
    }

    //event listener for the home button
    document.getElementById('homeButton').addEventListener('click', goHome);

    //function to navigate back
    function goBack() {
        document.getElementById("myWebview").goBack();
    }

    //event listener for the back button
    document.getElementById('backButton').addEventListener('click', goBack);

    //function to navigate forward
    function goForward() {
        document.getElementById("myWebview").goForward();
    }

    //event listener for the forward button
    document.getElementById('forwardButton').addEventListener('click', goForward);

    //function to handle URL navigation
    function goToURL() {
        var urlInput = document.querySelector('.url');
        var url = urlInput.value.trim();
    
        //check if the URL starts with a protocol (e.g., 'http://' or 'https://')
        if (!url.match(/^https?:\/\//i)) {
            //if not, pretend it does
            url = 'https://' + url;
        }
    
        document.getElementById("myWebview").loadURL(url);
    }

    //auto-focus on the search bar --> clicks search bar for you
    var urlInput = document.querySelector('.url');
    urlInput.focus();

    //event listener for 'Enter' key press in the search bar
    urlInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToURL();
        }
    });

    //keyboard shortcut for Ctrl+R for refresh
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'r') {
            document.getElementById("myWebview").reload();
            event.preventDefault();
        }
    });

    //function to refresh the page
    function refreshPage() {
        document.getElementById("myWebview").reload();
    }

    //event listener for the refresh button
    document.getElementById('refreshButton').addEventListener('click', refreshPage);
    
});