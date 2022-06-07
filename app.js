const config = require("./config"),
restfy = require("restify"),
mysql = require("mysql");

/**
 * Gets mysql connection
 */ 
var conn = config.db.get;

/**
 * Initial Server
 */
const server = restfy.createServer({
    name: config.name,
    version: config.version,
    url: config.hostname,
    env: "Develpment"
});

/**
 * Listen Server API
 */
server.listen(config.port, function() {
    console.log("%s Rest API Tantowi %", server.name, "SERVER",server.url);
});

/**
 * Restify plugin
 */
server.use(restfy.plugins.acceptParser(server.acceptable));
server.use(restfy.plugins.queryParser());
server.use(restfy.plugins.bodyParser());

/**
 * Create data book
 */
server.post("/book", function(req, res) {
    var postData = req.body;
    conn.query("insert into book set ?",
    postData,
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been saved.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Gets data book
 */
server.get("/books", function(req, res) {
    conn.query("select * from book",
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been results.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Update data book by id
 */
 server.put("/book/:id", function(req, res) {
    conn.query("update book set name=?, person_id=?, synopsis=?, release_date=?, isbn=? where id=" + req.body.id,
    [
        req.body.name,
        req.body.person_id,
        req.body.synopsis,
        req.body.release_date,
        req.body.isbn
    ],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been updated.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Delete data book by id
 */
server.del("/book/:id", function(req, res){
    conn.query("delete from book where id=?",
    [req.body.id],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been deleted.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Search data book by name
 */
 server.get("/book/:name", function(req, res) {
    let sql = null;
     if (req.params.name != null) {
        sql = "SELECT * FROM book WHERE name LIKE '%" + req.params.name +"%'";
     }
    conn.query(sql,[req.params.name],
    function(error, result, fields) {
        if (error) throw error;
        res.end(JSON.stringify(result));
    });
});

/**
 * Gets data person
 */
 server.get("/persons", function(req, res) {
    conn.query("select * from person",
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data person has been results.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Create data person
 */
 server.post("/person", function(req, res) {
    var postData = req.body;
    conn.query("insert into person set ?",
    postData,
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data persons has been saved.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Update data person by id
 */
 server.put("/person/:id", function(req, res) {
    conn.query("update person set first_name=?, last_name=?, birt_day=?, gender=?, phone_number=?,  email=? where id=" + req.params.id,
    [
        req.body.first_name,
        req.body.last_name,
        req.body.birt_day,
        req.body.gender,
        req.body.phone_number,
        req.body.email,
        req.body.id
    ],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been updated.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Delete data book by id
 */
 server.del("/person/:id", function(req, res) {
    conn.query("delete from person where id=?",
    [req.body.id],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been deleted.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Create data person details by id
 */
 server.get("/person/:id", function(req, res) {
    conn.query("select * from person where id=?",
    [req.params.id],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data persons has been saved.");
        res.end(JSON.stringify(result));
    });
});