var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
function main() {
    let ime_input = document.getElementById('ime').value;
    let prezime_input = document.getElementById('prezime').value;
    let email_input = document.getElementById('email').value;
    let uloga_input = document.getElementById('role_id').value;
    let tim_input = document.getElementById('tim').value;
    db.serialize(function(){ 
        db.run("INSERT INTO users (ID, first_name, last_name, email, role_id, team_id) VALUES(NULL, ?, ?, ?, ?, ?)", 
        [ime_input, prezime_input, email_input, uloga_input, tim_input])
    })};
