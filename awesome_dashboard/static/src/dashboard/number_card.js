/** @odoo-module **/
import {Component} from "@odoo/owl";
import {xml} from "@odoo/owl";

export class NumberCard extends Component {
    static props = ["title", "body", "value"];
    static description = "NumberCard"
    static template = xml` 
           <div class="card-body number-card">
               <h5 class="card-title ">
                  <t t-esc="props.title"/>
               </h5>
              <p ><t t-esc="props.body"/>:</p>
              <p class="text-success fs-1">  <t t-esc="props.value"/> </p>
           </div>
        
    `;
}