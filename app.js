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
        res.end(JSON.parse(JSON.stringify(result)));
    });
});

/**
 * Gets data book
 */
server.get("/book", function(req, res) {
    conn.query("select * from book",
    function(error, result, fields) {
        console.log(result);
        if (error) throw error;
        console.log("Data book has been results.");
        res.end(JSON.stringify(result));
    });
});

/**
 * Update data book by id
 */
 server.put("/book/:id", function(req, res) {
    conn.query("update book set name=?, author=?, synopsis=?, release_date=?, isbn=? where id=" + req.body.id,
    [
        req.body.name,
        req.body.author,
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
 server.get("/book/:name", function(req, res){
    conn.query(`SELECT * FROM book WHERE name LIKE '%'||$1||'%'`,
     [req.body.name],
    function(error, result, fields) {
        if (error) throw error;
        console.log("Data book has been search.", req.body.name);
        res.end(JSON.stringify(result));
    });
});