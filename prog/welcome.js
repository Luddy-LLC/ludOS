class WelcomeProgram extends Program {
    createWindow() {
        let body = `
        <img src="unlogo.png" width="20%" style="filter: invert();margin: 0 40%;padding: 10px 0px;">
        <p>Welcome, <strong>Representative of ${name}</strong>!<br><br>
        Your Windows 98 account has been provisioned, so you now have secure access to view communications from your home government or council. To view these messages, visit the <strong>Message Center</strong>. You are also welcome to take notes in <strong>Notepad</strong>, which will securely delete your notes when closed.<br><br>
        Please let us know you have any questions, and enjoy your new account.<br></p>
        <hr class="hr--accent">
        <p>Sincerely,<br>United Nations Information Technology Services</p>`
        let wminfo = {
            title: 'Welcome to your Windows 98 Account!',
            name:  'Welcome!',
            icon:  'img/desktop/MyDocuments.png',
        }

        return [wminfo, body]
    }

    onAttach() {
        this.getBodyHandle().classList.add('typography')

        // this.getBodyHandle()
        //     .querySelector('[data-upgrade="intro-launchresume"]')
        //     .addEventListener('click', e => {
        //         e.preventDefault()
        //         window.pm.createInstance('resume')
        //     })

        // this.getBodyHandle()
        //     .querySelector('[data-upgrade="intro-launchportfolio"]')
        //     .addEventListener('click', e => {
        //         e.preventDefault()
        //         window.pm.createInstance('portfolio')
        //     })

        // this.getBodyHandle()
        //     .querySelector('[data-upgrade="intro-launchemail"]')
        //     .addEventListener('click', e => {
        //         e.preventDefault()
        //         window.pm.createInstance('email')
        //     })
    }
}

window.pm.registerPrototype('welcome', WelcomeProgram)
