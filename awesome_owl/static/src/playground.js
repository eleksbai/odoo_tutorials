/** @odoo-module **/

import {Component, markup, useState} from "@odoo/owl";
import {Counter} from "./counter/counter"; // 假设 Counter 组件在 counter.js 文件中
import {Card} from "./card/card"; //
import {Todolist} from "./todolist/todolist"; //

export class Playground extends Component {
    static template = "awesome_owl.playground";
    // sum = useState({total: 0});
    static props = [];
    static components = {Counter, Card, Todolist}; // 注册 Counter 子组件
    html3 = "<div class='text-primary'>some content3</div>"
    html4 = markup("<div class='text-primary'>some content4</div>");

    setup() {
        this.sum = useState({total: 0});
        // 不使用bind语法，就要在这里做个绑定
        // this.incrementSum = this.incrementSum.bind(this);
    }

    incrementSum(value) {
        this.sum.total += value;
    }
}

