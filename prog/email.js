const email_dummys = {
    "emails": [
        {
            "subject": "Welcome",
            "body": "HELLO!!!",
            "buying": 1000,
            "approval": 4,
            "military": 4,
            "space program": 2,
        },
        {
            "subject": "Space program specifics",
            "body": "Your request to enhance your space program has been taken well, but we have questions of exactly how you would like it to be done. Should we invest in more staff? Do we need better facilities?  ",
            "buying": 1000,
            "approval": 4,
            "military": 4,
            "space program": 2,
        },
        {
            "subject": "Facility Upgrade Request",
            "body": "Your request to inprove facilities for our space program researchers has been approved, but now our overall funds are severely lacking. In order to do so we will need to increase taxes, and public outrage around it is stirring. ",
            "buying": 90,
            "approval": 3,
            "military": 4,
            "space program": 3,
        },
        {
            "subject": "CRISIS",
            "body": "A famine has hit! Food prices are skyrocketing, and approval is tanking.",
            "buying": 90,
            "approval": 3,
            "military": 4,
            "space program": 3,
        },
        {
            "subject": "Tax Cut",
            "body": "Your request for a tax cut would certainly improve public approval, but we do not have the money to sustain it. Where should the money be shifted from? ",
            "buying": 90,
            "approval": 2,
            "military": 4,
            "space program": 3,
        },
        {
            "subject": "Tax cut",
            "body": "Your tax cut recommendation has been followed through on by redirecting funds from our military budget. The decrease in approval has been stalled, but if the famine worsens it may resurge.",
            "buying": 90,
            "approval": 2,
            "military": 3,
            "space program": 3,
        },
        {
            "subject": "CRISIS CONCLUDED",
            "body": "The famine seems to have subsided for the most part and general public moral has improved.",
            "buying": 90,
            "approval": 3,
            "military": 3,
            "space program": 3,
        },
    ]
}


class EmailProgram extends Program {

    createWindow() {
        let winfo = {
            title: 'Email Portal',
            name: 'Email',
            icon: '../img/desktop/Email.png',
            resizable: true,
            margin: false,
            app: true
        }

        let body = `
            <div class="menu-bar__container" style="max-height: calc(70vh); width: 60vw; min-width:400px;">
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

                <div class="menu-bar__container" style="padding:5px; font-size:2em; font-weight:bold;">Inbox</div>
                `
        body += `<div style="height: calc(70vh - 60px); overflow-y: auto;">`

        for (let x = email_dummys.emails.length-1; x >=0; x-- ) {

            body += this.format_email(email_dummys.emails[x])

        }
        body += `</div>`

        return [winfo, body]
    }


    get_style(stat, threshold = 3) {
        var basic_stat_class = "font-size: large; "
        if (stat < threshold) {
            return basic_stat_class +  "color: red;"
        } else {
            return basic_stat_class
        }

    }



    format_email(json_email){
        `
        Takes a json in the form of 
        {
            "subject": "Follow up",
            "body": "SESCOND MESSAGE!!!",
            "buying": 90,
            "approval": 4,
            "military": 4,
            "space program": 3,
        }
        `

        var subject_prefix = "Re: ";
        if (json_email.subject.toLowerCase().includes("crisis")) {
            subject_prefix = ""
        }

        console.log(json_email)
        let subject = `<div style="padding:5px; padding-bottom:0px; font-size:1.3em; font-weight:bold;"> ` + subject_prefix +  json_email.subject + `</div><hr class="hr--accent" style="height:2px;">`
        let body = `<div style="padding:5px; font-size:1.2em; font-weight:bold">` +  json_email.body + `</div>`

        let stats = `<div style="display:flex; justify-content: space-evenly; text-align:center; font-size:small"> <div>` + 
            `Military: <span style="` + this.get_style(json_email.military) + `">` + json_email.military + `</span>/5</div> <div>` + 
            `Approval: <span style="` + this.get_style(json_email.approval)  + `">` + json_email.approval + `</span>/5</div> <div>` + 
            `Space Program: <span style="` + this.get_style(json_email["space program"]) + `">` + json_email["space program"] + `</span>/5</div> </div>` + 
            `<div style="text-align:center; padding: 2px; padding-bottom:10px;">Current Buying Power: <span style="` + this.get_style(json_email.buying, 100)  + `">` + json_email.buying + `</span></div>`

        return `<div  class="menu-bar__container" style="padding:5px; margin-bottom:20px; font-size:small;">` + subject + body + stats + `</div>`
    }



    generateMailto() {
        let subject = this.getBodyHandle()
            .querySelector('input[name="subject"]')
            .value

        let cc = this.getBodyHandle()
            .querySelector('input[name="cc"]')
            .value

        let body = this.getBodyHandle()
            .querySelector('textarea.email__body')
            .value

        // need to replace %0A with %0D%0A
        body = window.encodeURIComponent(body)
        body = body.replace(/%0A/g, '%0D%0A')

        // subject & cc are less important
        subject = encodeURIComponent(subject)
        cc      = encodeURIComponent(cc)

        let href = `mailto:patrick@ka.ge?subject=${subject}&cc=${cc}&body=${body}`

        this.getBodyHandle()
            .querySelector('.email__send')
            .setAttribute('href', href)
    }

    onAttach() {
        this.generateMailto()

        this.getBodyHandle()
            .querySelectorAll('textarea,input')
            .forEach(el => {
                console.log('attaching to ', el)
                el.addEventListener('keyup', this.generateMailto.bind(this))
            })
    }
}

window.pm.registerPrototype('email', EmailProgram)
