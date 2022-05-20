const express = require('express');
const crypto = require('crypto')
const fs = require('fs');

const service = express();

service.use(express.json())

const USERS_FILE = "./tmp/data.json";

service.get("/users", (req, res) => {

    try {
        const data = JSON.parse(fs.readFileSync(USERS_FILE));
        
        res.status(200).send(data);

    } catch (error) {
        res.status(500).send(error);
    }

});

service.get("/users/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).send([{
        id: id,
        name: "Italo Rayone",
        email: "rayoneitalo@gmail.com"
    }]);

});

service.post("/users", (req, res) => {

    try {

        const data = JSON.parse(fs.readFileSync(USERS_FILE));

        req.body.map((user) => {

            data.push({
                id: crypto.randomUUID(),
                name: user.Name,
                email: user.Email,
                phone: user.Phone,
                password: crypto.randomUUID(),
                createdAt: Date.now()
            })

            return data;
        })

        fs.writeFileSync(USERS_FILE, JSON.stringify(data));

        res.status(201).send();

    } catch (error) {
        res.status(500).send(error)
    }

    console.log("POST /users accessed!")

});

service.put("/users", (req, res) => {
    res.send("Updating a ticket.")
});

service.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    res.send(`Deleting a ticket: ${id}.`)
});

service.listen(3000, () => console.log("The Service is listening to port 3000!"));