class Commands {
    constructor(json) {
        this.json = json || require('./commands.json');
    }

    get() {
        let commands = [];
        for (let key in this.json) {
            let command = key + ' ';
            for (let argument in this.json[key].arguments) {
                if (this.json[key].arguments[argument].optional) {
                    // optional
                    command = command + '[' + this.json[key].arguments[argument].name + '] ';
                }
                else {
                    // required
                    command = command + this.json[key].arguments[argument].name + ' ';                
                }
            }
            commands.push({"name":command.trim(), summary: this.json[key].summary, complexity: this.json[key].complexity});
        }
        return commands;        
    }
}

module.exports = Commands;