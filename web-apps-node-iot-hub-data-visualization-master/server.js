require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const EventHubReader = require("../web-apps-node-iot-hub-data-visualization-master/scripts/event-hub-reader");

const eventHubConnectionString = process.env.IotHubConnectionString;
const eventHubConsumerGroup = process.env.EventHubConsumerGroup || "$Default";

if (!eventHubConnectionString) {
  console.error("Event Hub connection string must be specified.");
  process.exit(1);
}

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res) => {
  res.redirect("/");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

const eventHubReader = new EventHubReader(
  eventHubConnectionString,
  eventHubConsumerGroup
);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    const payload = {
      IotData: message,
      MessageDate: date || new Date().toISOString(),
      DeviceId: deviceId,
    };
    wss.broadcast(JSON.stringify(payload));
  });
})().catch((err) => {
  console.error("Error starting event hub reader:", err);
});
