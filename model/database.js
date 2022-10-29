require("dotenv").config();
const mysql = require("mysql");

  module.exports = async function populateDb() {
    const results = {
      data: [],
      error: null
    };
    let promise = await new Promise((resolve, reject) => {
      const DB_HOST = process.env.DB_HOST;
      const DB_USER = process.env.DB_USER;
      const DB_PASS = process.env.DB_PASS;
      const DB_NAME = process.env.DB_NAME;
  
      const con = mysql.createConnection({
        host: DB_HOST || "127.0.0.1",
        user: DB_USER || "root",
        password: DB_PASS,
        database: DB_NAME || "database",
        multipleStatements: true
      });
  
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      
        let sql = "DROP TABLE if exists bins; CREATE TABLE bins (id INT NOT NULL AUTO_INCREMENT, id_council varchar(10) NOT NULL, gps_north varchar(25) NOT NULL, gps_west varchar(25) NOT NULL, isFull BOOLEAN NOT NULL, last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";
    
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table creation 'bins' was successful!");
          console.log("Closing...");
        });
    
        sql = `insert into bins (id_council, gps_north, gps_west, isFull) values ('f9d0c4e2', '53°21''16.712888"N', '6°25''14.374028"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('95199f5a', '53°17''17.813247"N', '6°24''17.343278"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('45939cf1', '53°19''21.802871"N', '6°23''44.063747"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('ee786fd7', '53°19''15.129405"N', '6°23''35.871881"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('c8a03854', '53°21''1.565115"N', '6°22''33.743399"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('4270ed2f', '53°17''36.672825"N', '6°22''9.525372"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('16bffc1f', '53°17''17.131598"N', '6°21''32.775739"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('10df2f96', '53°16''31.837955"N', '6°20''32.613444"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('3182a616', '53°16''30.388055"N', '6°19''47.767894"W', 0); \
        insert into bins (id_council, gps_north, gps_west, isFull) values ('6aee6851', '53°17''18.978900"N', '6°17''56.27518"W', 0); `
        
    
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Items added to table successfully!");
          console.log("Closing connection...");
        });
      
        con.end();
        resolve(results);

      });
    });
  
    return promise;
  };