const { session } = require("electron");
const fs = require("fs");
// const blockListPath = "./easyprivacy.json";
const blockListPath = __dirname + "/easyprivacy.json";

let blockList = [];

function shouldBlockUrl(url) {
  // loadBlockList();
  return blockList.some((substring) => url.includes(substring));
}

function printBlocklist() {
  // loadBlockList();
  console.log("Blocklist:");
  console.log(blockList);
}

function setupBlocking() {
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ["*://*/*"] },
    (details, callback) => {
      if (shouldBlockUrl(details.url)) {
        console.log(`Blocking tracking request: ${details.url}`);
        callback({ cancel: true });
      } else {
        callback({ cancel: false });
      }
    }
  );
}

// function loadBlockList() {
//   fs.readFile(blockListPath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading blocklist file:", err);
//       return;
//     }
//     try {
//       blockList = JSON.parse(data);
//       console.log("Blocklist loaded successfully.");
//     } catch (parseError) {
//       console.error("Error parsing blocklist file:", parseError);
//     }
//   });
// }

function loadBlockList() {
  try {
    // Use readFileSync to read the file synchronously
    const data = fs.readFileSync(blockListPath, "utf8");
    blockList = JSON.parse(data);
    console.log("Blocklist loaded successfully.");
  } catch (err) {
    console.error("Error loading blocklist:", err);
  }
}

// Load the blocklist when the script starts
loadBlockList();

module.exports = { setupBlocking, printBlocklist, loadBlockList, blockList };
