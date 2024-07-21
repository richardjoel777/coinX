import cron from "node-cron";

import coinPoller from "./coinPoller";
import marketPoller from "./marketPoller";

const initializeCronJobs = async () => {
    // Initialize the cron jobs here
    // Run the coin poller every 3 seconds
    cron.schedule("*/3 * * * *", coinPoller);

    // Run the market poller every 3 minutes
    cron.schedule("*/30 * * * * *", marketPoller);

}

export default initializeCronJobs;