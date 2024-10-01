import http from "http";
import url from "url";
import fs from "fs";

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const fileName = "." + q.path + ".html";
    fs.readFile(fileName, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        fs.readFile("./404.html", function (err404, errorData) {
          if (err404) {
            res.write("404 Not found");
            return res.end();
          }
          res.write(errorData);
          return res.end();
        });
        return;
      }
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
