/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Counter} from "./counter/counter"; // 假设 Counter 组件在 counter.js 文件中
import {Card} from "./card/card"; //

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = {Counter, Card}; // 注册 Counter 子组件

}

