const express   = require("express");
const app       = express();
const cors      = require("cors");
const path      = require("path");
const router    = express.Router();
const Sequelize = require("sequelize");
const seq = new Sequelize("sqlite:test.db");

const Notes = seq.define("notes", {
    title: Sequelize.STRING,
    tags: Sequelize.STRING,
    content: Sequelize.TEXT
});

Promise.resolve(Notes.sync());

const asyncHelper = func => (req, res, nex) => {
    Promise.resolve(func(req, res, nex)).catch(nex);
};

router.get("/", (req, res) => res.sendFile(path.resolve("build/index.html")));

router.get(
    "/notes",
    asyncHelper(async (req, res, nex) => {
        const data = await Notes.findAll();
        res.json(data);
    }
));

router.post(
    "/notes",
    asyncHelper(async (req, res, nex) => {
        const data = req.body;
        await Notes.create(data);
        res.json({"msg": "yay"});
    }
));

app.use(express.json());
app.use(cors());
app.set("build", "./build");
app.use("/static", express.static(path.resolve("build/static")));

app.use(router);

app.all("*", (req, res) => res.status(404).send("404 page not found"));

app.listen(1337, () => console.log("listening on port 1337"));