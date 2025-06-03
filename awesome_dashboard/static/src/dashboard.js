/** @odoo-module **/

import {Component, onWillStart} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout"
import {useService} from "@web/core/utils/hooks";
import {DashboardItem} from "./dashboardItem/dashboardItem";
import {rpc} from "@web/core/network/rpc";
import {PieChart} from "./pie_chart/pieChart";

// import PieChart from "./pie_chart/pieChart";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = {Layout, DashboardItem, PieChart};

    setup() {
        this.action = useService("action");
        this.result = {}
        console.log("setup")
        this.shareStateService = useService("shared_state");
        this.statisticsService = useService("awesome_dashboard.statistics");
        onWillStart(async () => {
            // debugger
            //

            const result = await this.statisticsService.loadStatistics();
            // const result = await rpc("/awesome_dashboard/statistics");
            this.result = result;

            // debugger
        });
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

}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
