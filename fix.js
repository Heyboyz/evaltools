const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');
code = code.replace(/'(ASSETS\.[a-zA-Z0-9_]+)'/g, "$1");
fs.writeFileSync('app.js', code);
console.log('Fixed quotes in app.js');
