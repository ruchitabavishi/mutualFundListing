<template>
  <div id='app'>
  <GChart
    :settings="{packages: ['bar']}"    
    :data="cData"
    :options="chartOptions"
    :createChart="(el, google) => new google.charts.Bar(el)"
    @ready="onChartReady"
  />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  name: 'App',
  components: {
    GChart
  },
  props:{
    chartData: Array,
    colors:{
        type: Array,
        default: ['#FC757E']
    },
    height:{
        type: Number,
        default: 400
    },
    width:{
        type: Number,
        default: null
    },
    title: String,
    subtitle: String
  },
  data () {
    return {
        cData : null,
        chartsLib: null, 
    }
  },
  computed: {
    chartOptions () {
        if (!this.chartsLib) return null
        return this.chartsLib.charts.Bar.convertOptions({
            chart: {
            title: this.title,
            subtitle: this.subtitle
            },
            hAxis: { format: 'decimal' },
            height: this.height,
            width: this.width,
            colors: this.colors
        })
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
      this.chartsLib.charts.setOnLoadCallback(this.drawChart)
  },
    drawChart() {
      this.cData = google.visualization.arrayToDataTable(this.chartData);
    }
}
}
</script>
