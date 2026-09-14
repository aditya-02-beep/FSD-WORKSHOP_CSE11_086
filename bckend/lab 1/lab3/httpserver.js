import http from "http";
const array = [
    {
        id: 1,
        name: "A",
        age: 20
    },
    {
        id: 2,
        name: "Ak",
        age: 21
    },
    {
        id: 3,
        name: "o",
        age: 22
    }
];
const PORT = 8080;

const app = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/msg" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Welcome to backend");
    }
    else if (url === "/user" && method === "GET") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(array));
    }
else if (url === "/user" && method === "POST") {

    let body = "";

    req.on("data", (content ) => {
        body += content;
    });

    req.on("end", () => {

        const user = JSON.parse(body);

        array.push(user);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(user));
    });
}
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("Route not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});