class ShutdownProgram extends Program {

    getDialogIcon() {
        return 'img/startmenu/ShutDown.png'
    }

    createWindow() {
        let winfo = {
            title: 'Log Off Windows'
        }

        let body = `
            <div class="window__dialog">
                <div class="window__dialog-info">
                    <img src="${this.getDialogIcon()}" style="width:32px;height:32px;"/>
                    <p>
                       Are you sure you want to log off?
                    </p>
                </div>
                <div class="window__dialog-action">
                    <button autofocus>Yes</button>
                    <button>No</button>
                </div>
            </div>
        `

        return [winfo, body]
    }

    onAttach() {
        this.getBodyHandle()
            .querySelector('button')
            .addEventListener('click', this.closeWindow.bind(this))
    }
}
class LogOffProgram extends ShutdownProgram {
    getDialogIcon() {
        return 'img/startmenu/LogOff.png'
    }
}

window.pm.registerPrototype('logoff', LogOffProgram)
window.pm.registerPrototype('shutdown', ShutdownProgram)
