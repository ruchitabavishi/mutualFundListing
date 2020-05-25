<template>
    <div class="wrapper-class" v-if="fundDetail">
        <h2 class="title"> {{fundDetail.short_name}} </h2>
        <span class="my8 subtitle-color bold"> {{fundDetail.fund_type}} | {{fundDetail.category}} | {{fundDetail.fund_category}} </span>
        <span class="color-10"> | AUM {{fundDetail.aum}} Cr  </span>
        <div class="title bold float-right inline cursor-pointer" @click="displayAllFunds()"> {{allFunds}}</div>
        <div class="my8 title relative font14">NAV on {{fundDetail.nav.date}}: Rs. {{fundDetail.nav.nav}} 
            <span  v-if="isProfitable" class="arrow arrow-up inline absolute"></span><span v-if="isProfitable" class="color-green ml32">{{netNav}}%</span>
            <span v-if="!isProfitable" class="arrow arrow-down inline absolute"></span><span v-if="!isProfitable" class="color-red ml32">{{netNav}}%</span>
        </div>
        <div class="flex mt40">
            <div class=" w-half mr16"> <BarChart :chartData="chartData" :title="title" :subtitle="subtitle"></BarChart></div>
            <div class=" w-half"><SIPCalculator :fundDetail="fundDetail" /></div>
        </div>
        <vue-good-table
            class="mt40"
            :columns="columns"
            :rows="rows"
            styleClass="vgt-table"
             :sort-options="{
                enabled: false,
            }">
        </vue-good-table>
        <h3 class="title mt40"> FUND DETAILS </h3>
        <FundDetailTable :fundDetail="fundDetail" class="mb80"/>
    </div>
    <div v-else />
</template>

<script>
import BarChart from '../components/barChart.vue'
import FundDetailTable from '../components/fundDetailTable.vue'
import SIPCalculator from '../components/sipCalculator.vue'
export default {
    data(){
        return{
            allFunds: 'All Mutual Funds',
            isProfitable: true,
            title: 'Mutual Funds Returns',
            rows: [],
			columns: [
				{
					label: '1Y',
					field: this.year1Returns,
				},
				{
					label: '3Y',
					field: this.year3Returns,
				},
				{
					label: '5Y',
					field: this.year5Returns,
				},
				{
					label: 'Inception',
					field: this.inception,
                },
                {
					label: 'EXP',
					field: 'expense_ratio',
                },
                {
					label: 'VOILATILITY',
					field: 'volatility',
                },
			],
        }
    },
    methods:{
        year1Returns(rowObj) {
 			return rowObj.returns.year_1;
		},
		year3Returns(rowObj) {
 			return rowObj.returns.year_3;
        },
        year5Returns(rowObj) {
 			return rowObj.returns.year_5;
        },
        inception(rowObj){
            return rowObj.returns.inception;
        },
        displayAllFunds(){
            this.$router.push({ name: 'home',  })
        }
    },
    components:{
        BarChart,
        FundDetailTable,
        SIPCalculator
    },
    computed: {
        netNav(){
            let val = (((this.fundDetail.nav.nav - this.fundDetail.last_nav.nav) / this.fundDetail.last_nav.nav) * 100).toFixed(2)
            if(val < 0) this.isProfitable = false
            else this.isProfitable = true
           return Math.abs(val)
        },
        fundDetail(){
            this.rows = this.$store.state.fundDetails
            return this.$store.state.fundDetails[0]
        },
        chartData(){
            let returns = this.fundDetail.returns

            return [
                ['Year', 'Returns'],
                ['1Y', returns.year_1 ],
                ['3Y', returns.year_3 ],
                ['5Y', returns.year_5 ],
                ['Inception', returns.inception ]
            ]
        },
        subtitle(){
            return `Performance of Mutual Funds till date ${this.fundDetail.returns.date}`
        }
    },
	created() {
        this.$store.dispatch('getFundDetail', this.$route.params.fundCode)
	},
}
</script>

<style scoped>
.title{
    color: #3f5166;
}
.arrow{
    margin-left:8px;
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: 3px;
}
.color-red{
    color: red
}
.color-greeen{
    color: green
}
.arrow-up {
    border-bottom: 10px solid green;
}
.arrow-down {
    transform: rotate(180deg);
    border-bottom: 10px solid red;
}

</style>