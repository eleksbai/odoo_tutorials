import {Component} from "@odoo/owl";
import {LazyComponent} from "@web/core/assets";
import {xml} from "@odoo/owl";

export class DashboardComponentLoader extends Component {
    static components = {LazyComponent};
    static template = xml`
        <LazyComponent bundle="'awesome_dashboard.dashboard_assets'" Component="'awesome_dashboard.dashboard'" />
    `;
}

// 注册到actions
import {registry} from "@web/core/registry";

registry.category("actions").add("awesome_dashboard.dashboard", DashboardComponentLoader);