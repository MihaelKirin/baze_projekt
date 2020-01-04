var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
function main() {
    let naziv_input = document.getElementById('number').value;

    db.serialize(function(){ 
        db.run("DELETE FROM users WHERE ID=?", naziv_input)
    })}
