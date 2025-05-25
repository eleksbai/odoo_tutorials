import {registry} from "@web/core/registry";
import {rpc} from "@web/core/network/rpc";
import {memoize} from "@web/core/utils/functions";

// 写法1
// const statisticsService = {
//     start(env) {
//         debugger
//         const loadStatistics = memoize(async () => {
//             const result = await rpc("/awesome_dashboard/statistics");
//             return result;
//         });
//         debugger
//         return { loadStatistics };
//     },
// };

// 写法2，
async function loadStatistics() {
    return await rpc("/awesome_dashboard/statistics");
}

// function loadStatistics() {
//     const cacheLoad = memoize(async () => {
//         const result = await rpc("/awesome_dashboard/statistics");
//         return result;
//     });
//     return cacheLoad
// }

export const statisticsService = {
    start() {
        return {loadStatistics: memoize(loadStatistics)};
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);