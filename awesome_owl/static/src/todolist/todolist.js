/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {TodoItem} from "../todoitem/todoitem";

export class Todolist extends Component {
    static components = {TodoItem};
    static template = "awesome_owl.todolist";
    static props = [];

    setup() {
        this.todos = useState([
            {id: 1, description: "learn English", isCompleted: false},
            {id: 2, description: "write tutorial", isCompleted: false},
            {id: 3, description: "buy milk", isCompleted: false},
        ]);
    }
}
