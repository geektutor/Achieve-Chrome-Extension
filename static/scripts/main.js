window.onload = function () {
    init();
}

//Global variables
var imageURL;
var link;

function init() {
    getTime();
    inputFocusText();
    setFocusText();
    showGreetingMessage(new Date().getHours());
    getQuotes();
    fetchImage();
}


$("#change-btn").on('click', function () {
    unsplashGetPhotos();
    alert("Reload page");
});

function fetchImage() {
    if (localStorage.getItem("url") === null) {
        var path = "/static/images/background.jpg";
        $("body").css("background-image", "url(" + path + ")");
    } else {
        $("body").css("background-image", "url(" + localStorage.getItem("url") + ")");
    }
}

function removeOldImage() {
    localStorage.removeItem("url");
}

function unsplashGetPhotos() {
    $.getJSON("https://api.unsplash.com/photos/random?client_id=3ebe01369e49bd4796bdd7a4dc9d184e33817224260491c3ba8cd2066a75a5fe", function (data) {
        //console.log(data.urls);
        $.each(data.urls, function (index, value) {
            imageURL = data.urls.full;
            localStorage.setItem("url", imageURL);
        });
    });
}

function setFocusText() {
    inputFocusText();
    var getFocusText = localStorage.getItem("focusToday");
    var p = document.createElement('p');
    var textNode = document.createTextNode(getFocusText);
    p.appendChild(textNode);
    var todoContainer = document.getElementById('todo-container');
    todoContainer.appendChild(p);
    var inputFocus = document.getElementById('input-focus');
    if (checkLocalStorageForFocus) {
        inputFocus.style.display = "none";
    } else {
        inputFocus.style.display = "block";
    }

}

function checkLocalStorageForFocus() {

    var isLocalStorageAvailable = false;

    if (localStorage.getItem("focusText") === null) {
        isLocalStorageAvailable = true;
    } else {
        isLocalStorageAvailable = false;
    }
    Boolean(isLocalStorageAvailable);
}

function getTime() {
    var ampm;
    var systemDate = new Date();
    var hours = systemDate.getHours();
    var minutes = systemDate.getMinutes();
    ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }
    _hours = checkTimeAddZero(hours);
    _minutes = checkTimeAddZero(minutes);
    document.getElementById('current-time').innerHTML = _hours + ":" + _minutes;
    setInterval(getTime, 1000);
}

//Function add zero
function checkTimeAddZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}

function showGreetingMessage(hours, ampm) {

    var textNode = document.getElementById('greeting-message');

    if (hours >= 4 && hours <= 9) {
        textNode.innerText = "Good morning";
    }

    if (hours >= 12 && hours <= 16) {
        textNode.innerText = "Good aftenoon";
    }

    if (hours >= 17 && hours <= 21) {
        textNode.textContent = "Good evening";
    }

    if (hours >= 22 && hours <= 00) {
        textNode.textContent = "You can do it.";
    }
}

function inputFocusText() {
    var inputFocusText = document.getElementById('input-focus');
    inputFocusText.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            localStorage.setItem("focusToday", inputFocusText.value);
            document.getElementsByTagName("p").innerHTML = localStorage.getItem("focusToday");
            window.location.reload(true);
        }
    })
}

function editFocusText() {
    $('p').click(function () {
        document.getElementById("input-focus").style.display = "block";
        inputFocusText();
    })
}


function getQuotes() {
    $.getJSON("https://api.quotable.io/random", function (a) {
        $("#quotes").append(a.content + "<p>" + a.author + "</p>")
        //localStorage.setItem("quote", a.content + "\n" + a.author);
    });
}


$("#download-btn").on('click', function () {
    //downloadImage();  
    var link = $("#download-btn");
    link.href = downloadImage();
});
