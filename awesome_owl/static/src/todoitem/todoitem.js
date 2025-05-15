/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class TodoItem extends Component {
    static template = "awesome_owl.todoitem";
    static props = {
        id: {type: Number},
        description: {type: String},
        isCompleted: {type: Boolean},
    };
}
