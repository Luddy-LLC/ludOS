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
            <div class="menu-bar__container" style="max-height: calc(70vh); width: 70vw; min-width:200px;">
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
<div class =" explorer__body" style="background-color: #dfdfdf; drop-shadow 0; height: calc(70vh - 60px); overflow-y: scroll; flex-direction:column;">
                <div class="menu-bar__container" style="padding:5px; font-size:2em; font-weight:bold;">Inbox</div>
                `
        body += ``

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

        return `<div  class="menu-bar__container" style="padding:5px; margin-bottom:2px; font-size:small; background-color:white">` + subject + body + stats + `</div>`
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
