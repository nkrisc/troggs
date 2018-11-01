const Logger = {}
Logger.line = 1;
Logger.log = [];
Logger.parse = function(string, messages) {
    //Subject (actor), object(target, aggressor), data
    string = string.replace('%ACTOR%', messages[0]);
    if (messages.length > 1) string = string.replace('%OTHER%', messages[1]);
    //regex to find other data slots %1%, %2%, etc and replace with remaining data in order.
    return string;
}
Logger.write = function(string,...messages) {
    let message = this.parse(string, messages);
    let range = document.createRange();
    let log = document.getElementById('log');
    range.selectNode(log);
    let fragment = range.createContextualFragment(`<p><span class="line-prefix">${this.line < 10 ? '0' : ''}${this.line} :: </span>${message}</p>`);
    //this.log.push(`<p class="warn"><span class="line-prefix">${this.line < 10 ? '0' : ''}${this.line} :: </span>${message}</p>`);
    log.insertBefore(fragment, log.children[0])
    this.line++;
}
Logger.warn = function(string,...messages) {
    let message = this.parse(string, messages);
    this.log.push(`<p class="warn"><span class="line-prefix">${this.line < 10 ? '0' : ''}${this.line} :: </span>${message}</p>`);
    document.getElementById('log').innerHTML += `<p class="warn"><span class="line-prefix">${this.line < 10 ? '0' : ''}${this.line} :: </span>${message}</p>`;
    //document.write(`<p class="warn"><span class="line-prefix">${this.line < 10 ? '0' : ''}${this.line} :: </span>${message}</p>`);
    //console.log(message);
    this.line++;
}/**
 * Created by Nathan on 2/4/2018.
 */
