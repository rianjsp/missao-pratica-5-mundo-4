const { EventHubConsumerClient } = require("@azure/event-hubs");

class EventHubReader {
  constructor(eventHubConnectionString, consumerGroup) {
    this.eventHubConnectionString = eventHubConnectionString;
    this.consumerGroup = consumerGroup;
    this.consumerClient = null;
  }

  async startReadMessage(startReadMessageCallback) {
    try {
      this.consumerClient = new EventHubConsumerClient(
        this.consumerGroup,
        this.eventHubConnectionString
      );
      console.log("Successfully created the EventHubConsumerClient.");

      const partitionIds = await this.consumerClient.getPartitionIds();
      console.log("The partition ids are: ", partitionIds);

      this.subscription = this.consumerClient.subscribe({
        processEvents: (events, context) => {
          for (let event of events) {
            startReadMessageCallback(
              event.body,
              event.enqueuedTimeUtc,
              event.systemProperties &&
                event.systemProperties["iothub-connection-device-id"]
            );
          }
        },
        processError: (err, context) => {
          console.error("Error in subscription: ", err.message || err);
        },
      });
    } catch (ex) {
      console.error("Error starting EventHubReader: ", ex.message || ex);
    }
  }

  async stopReadMessage() {
    try {
      if (this.subscription) {
        await this.subscription.close();
      }
      if (this.consumerClient) {
        await this.consumerClient.close();
      }
      console.log("EventHubReader stopped.");
    } catch (ex) {
      console.error("Error stopping EventHubReader: ", ex.message || ex);
    }
  }
}

module.exports = EventHubReader;
