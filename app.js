const express = require("express");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");
const app = express();

// serve static files from React app
app.use(express.static(path.join(__dirname, "client/build")));

// put all API endpoints under '/api'
app.get("/api/configs", (req, res) => {
  res.json("hey!");
});

// catchall handler: for any request that doesn't match one, send back this index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://gracewingo:newuser09@cluster0.rajok.mongodb.net/concertads-configs?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect((err) => {
  const db = client.db("concertads-configs").collection("configs2");
  importYAMLConfigs(db);
  console.log("connected to mongodb!");
});

function importYAMLConfigs(db){
  let workingDirectory = "../concertads-configs/configs"; 
  let platforms = fs.readdirSync(workingDirectory);

  platforms.forEach(platform => {
    // For each platform get the folders and files
    let platformContents = fs.readdirSync(`${workingDirectory}/${platform}`);

    // Loop through platform contents of each platform to determine what is 
    // a directory and what is a file

    for (let i = 0; i < platformContents.length; i++){
      let path = `../concertads-configs/configs/${platform}/${platformContents[i]}`;

      let doc = {};

      if (isDirectory(path)){
        let directoryContents = fs.readdirSync(path);

        doc.name = platformContents[i];

        // loop through directory contents to see if they are directories or files
        for (let i = 0; i < directoryContents.length; i++){
          // console.log('directory contents is', directoryContents)
          // console.log(directoryContents[i]);
          let newPath =`${path}/${directoryContents[i]}`;
          let fileName1 = directoryContents[i];

          if (isDirectory(newPath)){
            let subDirContents = fs.readdirSync(newPath);

            // This is where the single slots.yml files live except for the a directory
              doc.community = []; 
              /* 
              TO DO: 
              - come back to why this is only outputting 'amazinavenue' from 'sbn'
              - it's how this for loop is set up, i'm only inserting the directoryContents[i] in this next for loop
              */
              for (let i = 0; i < subDirContents.length; i++){
                let fileName = subDirContents[i];
  
                try {
                  doc.community.push({ name: directoryContents[i], [fileName.replace(".yml", "")]: yaml.safeLoad(
                    fs.readFileSync(`${newPath}/${fileName}`, "utf8")
                  )}) 
                } catch (e){
                  console.log(e);
                }        
              } 
          } else {
            // Not a directory - safe load
            try {
              doc[fileName1.replace(".yml", "")].push(yaml.safeLoad(
                fs.readFileSync(`${path}/${fileName1}`, "utf8")
              ));
            } catch (e) {
              // console.log(e)
            }
          }

        }
        // db.insert(doc, {
        //   ordered: false,
        // })
      } else {
        // Not a directory - safe load - i.e files at the platformContents level
      }
    }
  })
}

// Helper function to determine if an object is a directory of a file
function isDirectory(path){
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
