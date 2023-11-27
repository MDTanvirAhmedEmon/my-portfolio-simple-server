const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oj1ojow.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("portfolio");
    const projectsCollection = db.collection("projects");

    app.get("/projects", async (req, res) => {
      const projects = await projectsCollection.find({}).toArray();
      res.send({ status: true, data: projects });
    });
    app.get("/projects/:id", async (req, res) => {
        const id = req.params.id;
      const projects = await projectsCollection.find({ _id: new ObjectId(id)}).toArray();
      res.send({ status: true, data: projects });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
