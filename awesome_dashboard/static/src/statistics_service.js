import {registry} from "@web/core/registry";
import {rpc} from "@web/core/network/rpc";
import {Component, onWillStart, useState} from "@odoo/owl";
import {memoize} from "@web/core/utils/functions";
import {reactive} from "@odoo/owl";
// 写法1
const statisticsService = {
    start(env) {
        const data = reactive({
                average_quantity: 0,
                average_time: 0,
                nb_cancelled_orders: 0,
                nb_new_orders: 0,
                orders_by_size: {},
                total_amount: 0,
            },
        );
        const loadStatistics = async () => {
            const result = await rpc("/awesome_dashboard/statistics");
            data.average_quantity = result.average_quantity;
            data.average_time = result.average_time;
            data.nb_cancelled_orders = result.nb_cancelled_orders;
            data.nb_new_orders = result.nb_new_orders;
            data.orders_by_size = result.orders_by_size;
            data.total_amount = result.total_amount;
            // console.log("Statistics loaded");
            // console.log(data);
            // debugger;


        };
        loadStatistics();
        setInterval(loadStatistics, 10000);
        // debugger
        return {data};
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);