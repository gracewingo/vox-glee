const express = require("express");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const connectDB = require("./config/db");
const app = express();

// serve static files from React app
app.use(express.static(path.join(__dirname, "client/build")));

// Get configs - make this dynamic based on site i.e grubstreet - use parameters 
app.get("/api/configs", (req, res) => {

  const configs = await loadConfigData();

  // return requested configs
  res.send(await configs.find({}));
});

// Add/update to configs
app.post("/api/configs", (req, res) => {
  const data = req.body;
  console.log(data);
});

// catchall handler: for any request that doesn't match one, send back this index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "build" + "index.html"));
});

async function loadConfigData() {
  const uri =
    "mongodb+srv://gracewingo:newuser09@cluster0.rajok.mongodb.net/concertads-configs?retryWrites=true&w=majority";
  const client = await new MongoClient(uri, { useUnifiedTopology: true });

  return client.db("concertads-configs").collection("test");
}



// Connect to DB and get config data into MongoDB
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://gracewingo:newuser09@cluster0.rajok.mongodb.net/concertads-configs?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("concertads-configs").collection("test");
  importYAMLConfigs(db);
  console.log("connected to mongodb!");
});

function importYAMLConfigs(db) {
  let workingDirectory = "./concertads-configs/configs";
  let platforms = fs.readdirSync(workingDirectory);

  platforms.forEach((platform) => {
    let platformContents = fs.readdirSync(`${workingDirectory}/${platform}`);

    for (let i = 0; i < platformContents.length; i++) {
      let path = `${workingDirectory}/${platform}/${platformContents[i]}`;

      let doc = {};

      if (isDirectory(path)) {
        let directoryContents = fs.readdirSync(path);

        doc.name = platformContents[i];

        for (let i = 0; i < directoryContents.length; i++) {
          let newPath = `${path}/${directoryContents[i]}`;
          let fileName1 = directoryContents[i];

          if (isDirectory(newPath)) {
            let subDirContents = fs.readdirSync(newPath);

            for (let i = 0; i < subDirContents.length; i++) {
              // investigage why we're only getting one community per site 'sbn'
              doc.community = [];
              let fileName = subDirContents[i];

              try {
                doc.community.push({
                  name: directoryContents[i],
                  [fileName.replace(".yml", "")]: yaml.safeLoad(
                    fs.readFileSync(`${newPath}/${fileName}`, "utf8")
                  ),
                });
              } catch (e) {
                console.log(e);
              }
            }
          } else {
            try {
              doc[fileName1.replace(".yml", "")] = yaml.safeLoad(
                fs.readFileSync(`${path}/${fileName1}`, "utf8")
              );
            } catch (e) {
              // console.log(e)
            }
          }
        }
        db.insert(doc, {
          ordered: false,
        });
      }
    }
  });
}

// Helper function to determine if an object is a directory of a file
function isDirectory(path) {
  let dirExists = fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  return dirExists;
}

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App serving on ${port}! 🎉`);

/**
 * To do:
 * import real data instead of dummuy data through mongodb via an api call, use fetch
 * from, 'choose a site' - flow to the contents of each site
 * at this step, the left panel shows the site & contents (yml files)
 * the right panel shows the preview, depending on which yaml file you click - an api call for each onclick?
 *
 */
