const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

/// express library
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.send("Successfully connected");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    console.log(error);
  }

  app.post("/users/login", async (req, res) => {
    const user = users.find((user) => (user.name = req.body.name));
    if (user == null) {
      return res.send(400).send("user not find");
    }

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.send("success");
      } else {
        res.send("NAN");
      }
    } catch {
      res.status(500).send();
    }
  });
});

app.listen(3000, () => {
  console.log(`app listening at port 3000`);
});
