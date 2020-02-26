var marked = require('marked');
var fs = require('fs');

var readMe = fs.readFileSync('tlgotd-content.md', 'utf-8');
var markdownContent = marked(readMe);

fs.writeFileSync('./tlgotd-content.html', markdownContent);
