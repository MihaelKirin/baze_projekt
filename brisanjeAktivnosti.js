var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
function main() {
    let naziv_input = document.getElementById('naziv').value;

    db.serialize(function(){ 
        db.run("DELETE FROM activities WHERE name=?", naziv_input)
    })}
