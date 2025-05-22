/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class DashboardItem extends Component {
    static template = "awesome_dashboard.dashboarditem";
    static description = "DashboardItem description";
    static props = {
        size: {type: Number, optional: true},
        slots: {optional: true},
        title: {type: String},
    };

    get width() {
        return (this.props.size || 1) * 18;
    }

}
