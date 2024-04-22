const http = require("http");
const url = require("url");

// Создаем объект для хранения счетчика просмотров
const pageViews = {
  "/": 0,
  "/about": 0,
};

// Создаем HTTP сервер
const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  // Увеличиваем счетчик просмотров для данного пути
  if (pageViews.hasOwnProperty(path)) {
    pageViews[path]++;
  }

  // Определяем обработчик для каждого пути
  switch (path) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Welcome to the Home Page</h1>");
      res.write(`<p>Page Views: ${pageViews["/"]}</p>`);
      res.write('<a href="/about">About Page</a>');
      break;
    case "/about":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>About</h1>");
      res.write(`<p>Page Views: ${pageViews["/about"]}</p>`);
      res.write('<a href="/">Home Page</a>');
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Not Found");
  }
  res.end();
});

// Запускаем сервер на порте 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
