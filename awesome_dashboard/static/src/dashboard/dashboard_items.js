/** @odoo-module **/
import {NumberCard} from "./number_card";
import {PieChartCard} from "./pie_chart_card";

export const items = [
    {
        id: "average_quantity",
        description: "Average amount of t-shirt",
        Component: NumberCard,
        size: 2,
        props: (data) => ({
            title: "Average amount of t-shirt by order this month",
            body: "...",
            value: data.average_quantity,
        }),
    },
    {
        id: "sales_by_category",
        description: "Sales by category",
        Component: PieChartCard,
        size: 2,
        props: (data) => ({
            label: "Sales by category",
            data: data
        }),
    },
];