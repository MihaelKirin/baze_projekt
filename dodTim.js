var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
function main() {
    let ime_input = document.getElementById('tim_ime').value;
    let prezime_input = document.getElementById('kratica').value;
    let email_input = document.getElementById('aktiv').value;
    let uloga_input = document.getElementById('opis').value;
    db.serialize(function(){ 
        db.run("INSERT INTO teams (ID, name, short_name, active, description) VALUES(NULL, ?, ?, ?, ?)", 
        [ime_input, prezime_input, email_input, uloga_input])
    })};
