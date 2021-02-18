class Command {
    constructor(help, format, run){
        this.help = help
        this.format = format
        this.run = run
    }

    getVarText() {
        return `${((text.length)? ' ' : '')}${this.format}`
    }

    static pv(v) {
        return `<${v}>`
    }

    static ov(v) {
        return `[${v}]`
    }
}

module.exports = Command