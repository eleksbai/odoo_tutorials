// PieChart.js
import {Component, useEffect, useState, onWillStart, onMounted, onWillUpdateProps} from "@odoo/owl";
import {loadJS} from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChartTemplate"; // 指定模板名称
    static description = "PieChart";
    // static props = {statistics,}
    static props = ['statistics'];


    setup() {
        this.myCount = 1;
        this.state = useState({data: {s: 1, m: 2, l: 5}, count: 0});
        this.handleCountChange = this.handleCountChange.bind(this);
        // 使用 useEffect 监听 state.data 的变化
        // useEffect(() => {
        //     // console.log("State data changed:", this.props.statistics.orders_by_size);
        //     // this.state.data = this.props.statistics.orders_by_size
        //     // this.renderChart()
        //     console.log('useEffect', this.props.statistics.orders_by_size)
        // }, [this.state]); // 依赖数组中包含 state.data

        // 加载 Chart.js
        onWillStart(() => loadJS(["/web/static/lib/Chart/Chart.js"]));
        // onMounted(() => {
        //
        // });
        // onWillUpdateProps((nextProps) => {
        //     // // 比较新旧props中的响应式对象
        //     // if (nextProps.state.value !== this.props.state.value) {
        //     //     console.log("Value changed:", nextProps.state.value);
        //     //     this.handleStateChange(nextProps.state);
        //     // }
        //     console.log('pie chart updated');
        //     console.log(nextProps.data);
        //     console.log(this.props);
        //     this.renderChart();
        // })

        useEffect(() => {
            console.log("Count changed:", this.state.count);
            // this.handleCountChange();
            this.state.data = this.props.statistics.orders_by_size
            this.renderChart()
        }); // 依赖数组中包含 state.count

        // setInterval(this.debugPieChart.bind(this), 5000);


    }

    handleCountChange() {
        this.state.count++;
        console.log("Count changed:", this.state.count);
    }

    mounted() {
        console.log('Component has been mounted');
        // 在这里可以进行 DOM 操作或其他初始化操作
        this.mounted()
    }

    debugPieChart() {
        console.log(this.props);
        // debugger;
        this.myCount++
        // debugger;
        // this.state.data.m += this.myCount
        this.state.data = this.props.statistics.orders_by_size
        this.renderChart()

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
        const el = document.getElementById('pieChart');
        const ctx = el.getContext('2d');
        debugger;
        // 从 props 中获取数据和配置
        const {statistics,} = this.props;
        debugger;

        console.log("statistics: info");
        console.log(statistics);
        if (this.chartInstance) {
            this.chartInstance.data.labels = Object.keys(this.state.data);
            this.chartInstance.data.datasets[0].data = Object.values(this.state.data);
            this.chartInstance.update();
        } else {
            // 创建饼状图
            this.chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    // labels: ,
                    labels: Object.keys(this.state.data),
                    datasets: [{
                        // backgroundColor: backgroundColor,
                        data: Object.values(this.state.data)
                        // data: [1, 2, 5]
                    }]
                },
                options: {
                    responsive: true, // 自适应大小
                    maintainAspectRatio: false // 不保持宽高比
                }
            });
        }
    }


}