/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class Dashboard_item extends Component {
    static template = "awesome_dashboard.dashboarditem";
    static description = "DashboardItem description";
    static props = ["size", "Component", "props"];

    get width() {
        return (this.props.size || 1) * 18;
    }


}
