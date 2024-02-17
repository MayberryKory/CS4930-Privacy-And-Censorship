document.addEventListener('DOMContentLoaded', function () {

    //function to navigate to the home page
    document.getElementById('homeButton').addEventListener('click', goHome);
    function goHome() {
        document.getElementById("myWebview").loadURL("https://www.startpage.com");
    }


    //function to navigate back
    document.getElementById('backButton').addEventListener('click', goBack);
    function goBack() {
        document.getElementById("myWebview").goBack();
    }


    //function to navigate forward
    document.getElementById('forwardButton').addEventListener('click', goForward);
    function goForward() {
        document.getElementById("myWebview").goForward();
    }


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

    //keyboard shortcut for Ctrl+R for refresh
    document.addEventListener('keydown', function (event) {
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
