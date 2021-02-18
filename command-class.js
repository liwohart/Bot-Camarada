class Command {
    constructor(help, notOptionals, optionals, format, run){
        this.help = help;
        this.notOptionals = notOptionals
            .reduce((dict,variable) => {
                dict[variable] = `<${variable}>`;
                return dict;
            }, {});
        this.optionals = optionals
            .reduce((dict,variable) => {
                dict[variable] = `[${variable}]`;
                return dict;
            }, {});
        this.format = format;
        this.run = run;
    }

    getVarText() {
        const text = this.format(this.notOptionals,this.optionals);
        return `${((text.length)? ' ' : '')}${text}`;
    }
}

module.exports = Command;