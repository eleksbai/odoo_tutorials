/** @odoo-module **/

import {Component, useState, reactive } from "@odoo/owl";
import {TodoItem} from "./todoitem";

export class Todolist extends Component {
    static components = {TodoItem};
    static template = "awesome_owl.todolist";
    static props = [];

    setup() {
        // this.todos = useState([
        //     {id: 1, description: "learn English", isCompleted: false},
        //     {id: 2, description: "write tutorial", isCompleted: true},
        //     {id: 3, description: "buy milk", isCompleted: false},
        // ]);

        this.todos = useState([]);
        // this.newTodoText =useState ("")
        // this. newTodoText = reactive({ a: 1 }, () => console.log("changed"));
        // this. newTodoText = "";


    }

    addTodo() {
        const newTodoInput = document.getElementById('newTodoInput')
        const newTodoText =  newTodoInput.value.trim();
        if (newTodoText) {
            this.todos.push({id: this.todos.length + 1, description: newTodoText, isCompleted: false});
            // this.newTodoInput = "";
            newTodoInput.value = ""

        }
        console.log("Add Todo Item")
    }

    onKeyup(event) {
        if (event.key === "Enter") {
            this.addTodo();
        }
    }


}
