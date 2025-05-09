/** @odoo-module **/

import {Component, useState} from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.card";
    static description = "Card component";
    // static props = ['title', 'content', 'note?'];
    static props = {
        'title': {type: String, validate: s => s.length > 5 && s.length < 10},
        'size': {
            type: Number, validate: n => n > 10
        },
        'content': {type: String},
        'note': {type: 'string', optional: true}
    };

}

