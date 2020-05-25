<template>
    <div class="title ">
        <p class="color-10">{{fundDetail.investment_objective}}</p>
        <div class="mt40 "> 
            <span class="color-10 bold">Details For Mutual Fund: </span>
           <a :href="fundDetail.detail_info" class="color-20"> {{fundDetail.short_name}}</a>
        </div>
        <div class="flex mt40">
            <div class="w-half my16">
                <div style="padding-right:140px">
                    <div class="detailTable py16">
                        <span class="bold"> Crisil Rating </span>
                        <span class="float-right"> {{fundDetail.crisil_rating}} </span>
                    </div>
                    <div class="detailTable py16">
                        <span class="bold"> Min SIP Amount </span>
                        <span class="float-right"> {{fundDetail.sip_min}} </span>
                    </div>
                    <div class="detailTable py16">
                        <span class="bold"> Maturity Type </span>
                        <span class="float-right"> {{fundDetail.maturity_type}} </span>
                    </div>
                </div>
            </div>
              <div class="w-half my16">
                    <div style="padding-left:140px">

                        <div class="detailTable py16">
                            <span class="bold"> NAV </span>
                            <span class="float-right"> Rs.{{fundDetail.nav.nav}} ({{fundDetail.nav.date}}) </span>
                        </div>
                        <div class="detailTable py16">
                            <span class="bold"> Last Nav </span>
                            <span class="float-right"> Rs.{{fundDetail.last_nav.nav}} ({{fundDetail.nav.date}})</span>
                        </div>
                        <div class="detailTable py16">
                            <span class="bold"> Portfolio Turnover </span>
                            <span class="float-right"> {{fundDetail.portfolio_turnover}} </span>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        fundDetail: Object
    }
}
</script>

<style scoped>
    .detailTable{
        border-bottom:1px solid #e4e4e4
    }
</style>