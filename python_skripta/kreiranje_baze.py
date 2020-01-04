import sqlite3

conn = sqlite3.connect('app.db')

c = conn.cursor()

c.executescript('''CREATE TABLE roles
            (ID Integer PRIMARY KEY, name Varchar(25));
            CREATE TABLE teams
            (ID Integer PRIMARY KEY, name Varchar(50) UNIQUE, short_name Varchar(10) UNIQUE, active Integer, description Text);
            CREATE TABLE activities_type
            (ID Integer PRIMARY KEY, name Varchar(50));
            CREATE TABLE users 
            (ID Integer PRIMARY KEY, 
            first_name Varchar(25), 
            last_name Varchar(25), 
            email Varchar(75), role_id Integer, 
            team_id Integer, 
            FOREIGN KEY(role_id) REFERENCES roles(ID), 
            FOREIGN KEY(team_id) REFERENCES teams(ID));
            CREATE TABLE activities
            (ID Integer PRIMARY KEY, 
            activity_type_id Integer, 
            name Varchar(50), 
            description Text, 
            start_time Dateandtime, 
            user_id Integer, team_id Integer, 
            FOREIGN KEY(activity_type_id) REFERENCES activities_type(ID), 
            FOREIGN KEY(user_id) REFERENCES users(ID), 
            FOREIGN KEY(team_id) REFERENCES teams(ID))''')


conn.commit()

conn.close()