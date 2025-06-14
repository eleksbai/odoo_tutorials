/** @odoo-module **/

import {Component, onWillStart, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout"
import {useService} from "@web/core/utils/hooks";
// import {DashboardItem} from "../dashboardItem/dashboardItem";
import {Dashboard_item} from "../dashboard_item/dashboard_item";
import {rpc} from "@web/core/network/rpc";
// import {PieChart} from "../pie_chart/pieChart";
import {items} from "./dashboard_items";


// import PieChart from "./pie_chart/pieChart";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = {Layout, DashboardItem: Dashboard_item};

    setup() {
        this.items = items;
        this.action = useService("action");

        console.log("setup")
        this.statisticsService = useService("awesome_dashboard.statistics");

        this.statistics = useState(this.statisticsService.data);


        // onWillStart(async () => {
        //     this.statistics = useState(await this.statisticsService.data);
        // })
    }

    // onWillStart() {
    //     debugger
    //     console.log("Started onWillStart");
    // }

    // async load() {
    //     debugger
    //     const result = await rpc("/awesome_dashboard/statistics");
    //     debugger
    // }


    openCustomers() {
        this.action.doAction("base.action_partner_form");
    }

    openLead() {
        this.action.doAction("crm.crm_lead_all_leads");
        // this.action.doAction("crm.crm_lead_action_my_activities_view_tree");
    }

    printLog() {
        console.log("openDebug")
        console.log(this.statistics)
        // debugger
    }

}

// registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
registry.category("lazy_components").add("awesome_dashboard.dashboard", AwesomeDashboard);