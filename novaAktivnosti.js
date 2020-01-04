var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./app.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

function dodavanjeAktivnosti() {
  let tip = document.getElementById('tip_aktivnosti').value;
  let naziv = document.getElementById('naziv').value;
  let opis = document.getElementById('opis').value;
  let vrijeme = document.getElementById('vrijeme').value;
  let user = document.getElementById('user_id').value
  let tim = document.getElementById('tim').value;
  db.serialize(() => { 
    db.run("INSERT INTO activities (ID, activity_type_id, name, description, start_time, user_id, team_id) VALUES(NULL, ?, ?, ?, ?, ? ,?)",
    [tip, naziv, opis, vrijeme, user, tim])
  })
}