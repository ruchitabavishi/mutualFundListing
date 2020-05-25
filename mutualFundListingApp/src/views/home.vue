<template>
  <div class="app">
		<vue-good-table
		:columns="columns"
		:rows="fundsList"
		:line-numbers="true"
		:pagination-options="{
			enabled: true,
			mode: 'pages',
			perPage: 100,
			position: 'bottom',
			perPageDropdown: [25, 50, 75],
			rowsPerPageLabel: 'records per page',
  		}"
		:search-options="{
			enabled: true,
			skipDiacritics: true,
			placeholder: 'Global Search in the table',
  		}"
        @on-cell-click="onCellClick"
		>
        <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'name'">
            <span style="font-weight: bold; color: #337ab7; cursor:pointer">{{props.row.name}}</span> 
            </span>
            <span v-else>
            {{props.formattedRow[props.column.field]}}
            </span>
        </template>
		</vue-good-table>
  </div>
</template>


<script>

export default {
	name: "app",

	data() {
		return {
            rows:[],
			columns: [
				{
					label: 'Fund Name',
					field: 'name',
					filterOptions: {
						enabled: true, 
						placeholder: 'Fund Category',
					}
				},
				{
					label: 'Fund Category',
					field: 'fund_category',
					filterOptions: {
						enabled: true, 
						placeholder: 'Fund Category',
						filterDropdownItems: [],
    				}
				},
				{
					label: 'Fund Type',
					field: 'fund_type',
					filterOptions: {
						enabled: true, 
						placeholder: 'Fund Type',
						filterDropdownItems: [],
    				}
				},
				{
					label: 'Plan',
					field: 'plan',
					filterOptions: {
						enabled: true, 
						placeholder: 'Plan',
						filterDropdownItems: [],
    				}
				},
				{
					label: '1 Year Return',
					field: this.year1Returns,
					filterable: true
				},
				{
					label: '3 Year Return',
					field: this.year3Returns,
					sortable: true,
				},
			],
		};
	},
	methods: {
		year1Returns(rowObj) {
 			return rowObj.returns.year_1;
		},
		year3Returns(rowObj) {
 			return rowObj.returns.year_3;
        },
        onCellClick(params){
            if(params.column.field== 'name'){
                this.$router.push({ name: 'fundsDetail', params: { fundCode: params.row.code } })
            }
        }
	},
	computed:{
		fundsList(){
			let fundsList = this.$store.state.fundsList
			this.columns[1].filterOptions.filterDropdownItems = [...new Set(fundsList.map(item => item.fund_category))].filter(el => el != null);
			this.columns[2].filterOptions.filterDropdownItems = [...new Set(fundsList.map(item => item.fund_type))].filter(el => el != null);
			this.columns[3].filterOptions.filterDropdownItems = [...new Set(fundsList.map(item => item.plan))].filter(el => el != null);
			return fundsList
		}
	},
	created() {
		if(this.fundsList)
        	this.$store.dispatch('getFunds')
	},
};
</script>

<style scoped>
.app >>> table.vgt-table td {
	font-family: sans-serif;
	font-size: 15px
}
</style>

