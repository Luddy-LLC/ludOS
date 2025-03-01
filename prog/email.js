class EmailProgram extends Program {

    async createWindow() {
        let winfo = {
            title: 'United Nations Message Center',
            name: 'Message Center',
            icon: 'img/desktop/Email.png',
            resizable: true,
            margin: false,
            app: true
        }

        let body = `
            <div class="menu-bar__container" style="min-width: 400px;min-height: 500px;max-height:90vh;">
                <div class="menu-bar__menu">
                    <div class="menu-bar__handle"></div>
                    <span class="menu-bar__item">
                        File
                    </span>
                    <span class="menu-bar__item">
                        Edit
                    </span>
                    <span class="menu-bar__item">
                        Search
                    </span>
                    <span class="menu-bar__item">
                        Help
                    </span>
                </div>
                <div class="menu-bar__hr"></div>
                
                <div class="menu-bar__container" style="padding:5px;">Last Updated <span id="message-update-time">(Loading...)</span></div>
                
                `
                body += `<div id="email-messages" style="overflow-y: auto; display: flex; flex-direction: column;">
                <p style="margin-left:15px;">Loading email messages...</p></div>`
        return [winfo, body]
    }

    onAttach() {
        // this.generateMailto()
        getAndFormatEmails();
        this.getBodyHandle()
            .querySelectorAll('textarea,input')
            .forEach(el => {
                console.log('attaching to ', el)
                el.addEventListener('keyup', this.generateMailto.bind(this))
            })
    }
}

window.pm.registerPrototype('email', EmailProgram)


var numberOfMessages = 0;
let newMailAudio = new Audio('notify.mp3');

async function getEmails(username, password) {
    const data = {
        "username": user,
        "password": pass
    }
    return fetch("https://prod-180.westus.logic.azure.com:443/workflows/70d5729655b94673818e5526632a9161/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aRslXUaK9uj_tmahZ99M334MdAwACa_aaUCUPkjlrlo", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((httpResponse) => {
            if (httpResponse.ok) {
                return httpResponse.json();
            } else {
                return Promise.reject("Fetch did not succeed");
            }
        })
        .then((json) => {
            return json;
        })
        .catch((e) => { console.log(e) });  
}

function getAndFormatEmails() {
    console.log("Getting new emails...")
    getEmails(user,pass).then((messageCenterEmails) => {
        const oldNumberOfMessages = numberOfMessages;
        numberOfMessages = messageCenterEmails['emails'].length;
        document.getElementById('email-messages').innerHTML = '';
        if (numberOfMessages == 0) {
            document.getElementById('email-messages').innerHTML = '<p style="margin-left:15px;">You have no messages.</p>';
        } else {
            if (oldNumberOfMessages != numberOfMessages) {
                document.querySelector('[data-name="Message Center"]').style.maxWidth = "700px";
            } else {
                console.log("No new emails.");
            }
            for (let x = messageCenterEmails['emails'].length - 1; x >= 0; x--) {
                const wrapper = document.createElement('div');
                const result = formatEmail(messageCenterEmails.emails[x]);
                // Yes I know this is bad code... but it's also 11pm
                if (result != false) {
                    wrapper.innerHTML = result;
                    document.getElementById('email-messages').appendChild(wrapper.firstChild);
                }
            }
            document.querySelector('[data-name="Message Center"]').style.maxWidth = "";
            document.getElementById('message-update-time').innerText = new Date().toLocaleTimeString("en-US");

        }
        
    })
    
}

setInterval(() => {
    console.log("Interval triggered...");
    getAndFormatEmails();
}, 45000);


function formatEmail(json_email) {
    let isCompleteAnnouncement = true;
    var subject_prefix = "Re: ";
    if (json_email.subject.toLowerCase().includes("crisis")) {
        subject_prefix = ""
    }
    if (json_email.subject && json_email.body && json_email.military && json_email.approval && json_email["space-program"] && json_email.buying) {
        let subject = `<div style="padding:5px; padding-bottom:0px; font-size:1.2em; font-weight:bold;">` + subject_prefix + json_email.subject + `</div><hr class="hr--accent" style="height:2px;">`
        let body = `<div style="padding:5px; font-weight:bold">` + json_email.body + `</div>`
        let stats = `<div style="display:flex; justify-content: space-evenly; text-align:center; font-size:small"> <div>` +
        `Military: <span style="` + this.getStyle(json_email.military) + `">` + json_email.military + `</span>/5</div> <div>` +
        `Approval: <span style="` + this.getStyle(json_email.approval) + `">` + json_email.approval + `</span>/5</div> <div>` +
        `Space Program: <span style="` + this.getStyle(json_email["space-program"]) + `">` + json_email["space-program"] + `</span>/5</div> </div>` +
        `<div style="text-align:center; padding: 2px; padding-bottom:10px; margin-top: 5px;">Current Buying Power: <span style="` + this.getStyle(json_email.buying, 100) + `">` + json_email.buying + `</span></div>`
        return `<div  class="menu-bar__container email-message" style="padding:5px; margin-bottom:20px; font-size:small;">` + subject + body + stats + `</div>`;
        
    } else {
        return false;
    }
}

function getStyle(stat, threshold = 3) {
    var basic_stat_class = "font-size: large; "
    if (stat < threshold) {
        return basic_stat_class + "color: red;"
    } else {
        return basic_stat_class
    }
}


