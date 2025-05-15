/** @odoo-module **/

import {Component, useState, useRef} from "@odoo/owl";

export class TodoItem extends Component {
    static template = "awesome_owl.todoitem";
    static props = {
        id: {type: Number},
        description: {type: String},
        isCompleted: {type: Boolean},
        toggleState: {type: Function},
        removeTodo: {type: Function},
    };

    setup() {
        this.checkRef = useRef('check');
        this.changeCompleted = this.changeCompleted.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    changeCompleted(event, todoId) {
        debugger
        this.props.toggleState(this.props.id, this.checkRef.el.checked)

    }

    onDelete(event) {
        this.props.removeTodo(this.props.id)
    }
}
