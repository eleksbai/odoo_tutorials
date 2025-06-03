// PieChart.js
import {Component, onWillStart, onMounted} from "@odoo/owl";
import {loadJS} from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChartTemplate"; // 指定模板名称

    setup() {
        // 加载 Chart.js
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));
        onMounted(() => {
            console.log('Component has been mounted');
            // 在这里可以进行 DOM 操作或其他初始化操作
            this.mounted()
        });
    }

    mounted() {
        // 确保 Chart.js 已加载
        console.log("Component mounted.");
        if (window.Chart) {
            this.renderChart();
        } else {
            // 如果 Chart.js 未加载完成，等待加载完成后再渲染
            window.addEventListener('load', this.renderChart.bind(this));
        }
    }

    renderChart() {
        // 获取 canvas 元素
        debugger;
        const el = document.getElementById('pieChart');
        const ctx = el.getContext('2d');

        // 从 props 中获取数据和配置
        const {labels, data} = this.props;
        debugger

        // 创建饼状图
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    // backgroundColor: backgroundColor,
                    data: data
                }]
            },
            options: {
                responsive: true, // 自适应大小
                maintainAspectRatio: false // 不保持宽高比
            }
        });
    }
}