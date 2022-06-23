
function ping(url, duration) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { url_: url, duration_: duration }, function (response) {
            if (chrome.runtime.lastError) {
                setTimeout(ping, 1000, url, duration);
            }
        });
    });
}


function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i <tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activetab = tabs[0];

    let domain = (new URL(activetab.url));
    domain = domain.hostname;
    console.log(domain);
    document.getElementById('site').innerHTML = domain;

    document.getElementById('hours').onclick = () => {
        openCity(event, 'Hours');
    }

    document.getElementById('minutes').onclick = () => {
        openCity(event, 'Minutes');
    }
    document.getElementById('block1').onclick = () => {
        duration = document.getElementById('duration1').value;
        ping(domain, duration * 60);

        setTimeout(() => {
        }, 1500)

        window.close();
    }

    document.getElementById('block2').onclick = () => {
        duration = document.getElementById('duration2').value;
        ping(domain, duration);

        setTimeout(() => {
        }, 1500)

        window.close();
    }
});

