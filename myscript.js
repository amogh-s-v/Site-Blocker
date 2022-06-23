function startTimer(duration, display1, display2) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);
        if (diff > 0) {

            hours   = (diff/(60*60))| 0;
            minutes = ((diff / 60)%60) | 0;
            seconds = (diff % 60) | 0;

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display2.textContent = "Time until block is lifted"
            display1.textContent = hours + ":" + minutes + ":" + seconds;

            if (diff <= 0) {
                start = Date.now() + 1000;
            }
        }
        else{
            display1.textContent = "Blocking Period over!";
            window.location.reload()
        }
    };
    timer();
    setInterval(timer, 1000);
}

function string_match(str, pat) {
    for (i = 0; i <= str.length - pat.length; i++) {
        let m = 0
        for (j = 0; j < pat.length; j++) {
            if (str[i + j] === pat[j]) {
                m++;
            }
        }
        if (m === pat.length) {
            return true
        }
    }
    return false
}

function modify_page(){
    document.querySelector('html').style = "";
    document.querySelector('head').innerHTML = "";
    document.querySelector('body').style = "";
    document.querySelector('body').innerHTML = "";
    document.querySelector('body').className = "cssbody";
                
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        dateInMillisecs = new Date().getTime();
        curr_sec = Math.round(dateInMillisecs / 1000);


        const expsec = curr_sec + (request.duration_*60)

        chrome.storage.sync.set({ url: request.url_ }, function () {
            console.log('Value is set to ' + request.url_);
        });
        chrome.storage.sync.set({ url_exp: expsec }, function () {
            console.log('Value is set to ' + expsec);
        });

        if (window.location.href.includes(request.url_)) {
            modify_page();

            const template = document.createElement('div');
            template.className = "boxx";
            document.body.appendChild(template);
            display1 = document.querySelector('div');

            const template2 = document.createElement('p');
            template2.className = "boxx1";
            document.body.appendChild(template2);
            display2 = document.querySelector('p');

            
            startTimer(request.duration_ * 60, display1, display2);

        }
    }
);

chrome.storage.sync.get(['url'], function (result) {
    console.log("enter")
    if (result.url !== "undefined") {
        console.log(result.url)
        console.log("Enter 2")
        current_url = window.location.hostname;
        if (string_match(result.url, current_url)) {

            chrome.storage.sync.get(['url_exp'], function (result) {

                dateInMillisecs = new Date().getTime();
                curr_sec = Math.round(dateInMillisecs / 1000);

                const exp = parseInt(result.url_exp) - curr_sec;

                if (exp <= 0) {
                    chrome.storage.sync.clear();
                }
                else {
                    modify_page();
                    const template = document.createElement('div');
                    template.className = "boxx";
                    document.body.appendChild(template);
                    display1 = document.querySelector('div');

                    const template2 = document.createElement('p');
                    template2.className = "boxx1";
                    document.body.appendChild(template2);
                    display2 = document.querySelector('p');

                    
                    
                    startTimer(exp, display1, display2);


                }
            });
        }
    }
});




