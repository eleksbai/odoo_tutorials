/** @odoo-module **/

import {Component, useState, useRef} from "@odoo/owl";
import {TodoItem} from "./todoitem";

export class Todolist extends Component {
    static components = {TodoItem};
    static template = "awesome_owl.todolist";
    static props = [];

    setup() {
        this.todos = useState([
            {id: 1, description: "learn English", isCompleted: false},
            {id: 2, description: "write tutorial", isCompleted: true},
            {id: 3, description: "buy milk", isCompleted: false},
        ]);

        // this.todos = useState([]);
        // this.newTodoText =useState ("")
        // this. newTodoText = reactive({ a: 1 }, () => console.log("changed"));
        // this. newTodoText = "";
        this.inputRef = useRef('input');


    }

    addTodo() {
        const newTodoInput = this.inputRef.el
        console.log("Add Todo Item start")
        const newTodoText = newTodoInput.value.trim();
        if (newTodoText) {
            this.todos.push({id: this.findMax() + 1, description: newTodoText, isCompleted: false});
            newTodoInput.value = "";
            // this.inputRef.value = ""

        }
        console.log("Add Todo Item")
    }

    onKeyup(event) {
        if (event.key === "Enter") {
            this.addTodo();
        }
    }


    toggleState(todoId, isCompleted) {

        const todo = this.todos.find(todo => todo.id === todoId);
        if (todo) {
            todo.isCompleted = isCompleted
        }
    }

    removeTodo(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index >= 0) {
            // remove the element at index from list
            this.todos.splice(index, 1);
        }
    }

    findMax() {
        var max = 0;
        for (const todo of this.todos) {
            if (todo.id > max) {
                max = todo.id
            }
        }
        return max;
    }


}
