<template>
    <div class="sip-calculator">
        <div class="sip-block">
            <div class="flex">
            <div v-for="obj in category" :key="obj.name">
                <div class="category-block mr16 cursor-pointer"
                    :class="{'category-block-active' : obj.isActive}"
                    @click="categoryClick(obj)">{{obj.name}}</div>
            </div>
            </div>
            <div class="mt40">
                <span class="title"> Invest per Month </span>
                <span class="float-right color-20 bold">{{sliderValue}}</span>
            </div>
            <range-slider
                class="slider mt40"
                :min="fundDetail.sip_min"
                max="50000"
                step="10"
                v-model="sliderValue">
            </range-slider>
            <div class="title mt40"> For how many years? </div>
                <div class="flex mt40">
                    <div v-for="obj in years" :key="obj.name">
                <div class="year-Block mr16 cursor-pointer"  :class="{'year-active-block' : obj.isActive}"
                @click="yearClicked(obj)">{{obj.DisplayYear}}</div>
                    </div>
            </div>
            <div class="mt40">
                <span class="title"> Estimated Value </span>
                <span class="float-right color-20 bold">{{estimatedValue}}</span>
            </div>
            <div class="my8">
                <span class="title"> As Per Historical Returns</span>
                <span class="float-right color-10">with {{returnsValue}}% Annual Returns</span>
            </div>
        </div> 
    </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
    data () {
        return {
            category:[
                {
                    name:'SIP',
                    isActive: true,
                },
                {
                    name:'Lumpsum',
                    isActive: false
                }
            ],
            years:[
                {
                    year: 1,
                    DisplayYear: '1 Year',
                    isActive: true
                },
                {
                    year: 3,
                    DisplayYear:'3 Year',
                    isActive: false
                },
                {
                    year: 5,
                    DisplayYear:'5 Year',
                    isActive: false
                }
            ],
            activeCategory: 'sip',
            activeYear: 1,
            sliderValue: 0,
            estimatedValue: 0,
            returnsValue: 0
        }
    },
    mounted(){
        this.sliderValue = this.fundDetail.sip_min,
        this.returnsValue = this.fundDetail.returns.year_1.toFixed(2)
        this.estimatedValue = (this.sliderValue * 12 * 1 * this.cal).toFixed(2)
    },
    components: {
        RangeSlider
    },
    props:{
        fundDetail: Object
    },
    computed:{
        cal(){
            let flefiCal = this.activeCategory == 'sip' ?  12 * this.activeYear : 1
            return flefiCal * (this.fundDetail.returns[`year_${this.activeYear}`].toFixed(2)/100 +1)
        }
    },
    methods:{
        categoryClick(obj){
            let activeCategory = this.category.filter(el => el.isActive)
            activeCategory[0].isActive = false
            obj.isActive = true
            this.activeCategory = obj.name.toLowerCase()
            this.estimatedValue = (this.sliderValue  * this.cal).toFixed(2)
        },
        yearClicked(obj){
            let activeYear = this.years.filter(el => el.isActive)
            activeYear[0].isActive = false
            obj.isActive = true
            this.activeYear = obj.year
            this.returnsValue = this.fundDetail.returns[`year_${obj.year}`].toFixed(2)
            this.estimatedValue = (this.sliderValue * this.cal).toFixed(2)
        }
    },
    watch:{
        sliderValue(val){
            this.estimatedValue = (this.sliderValue  * this.cal).toFixed(2)
        }
    }
}
</script>

<style scoped>
.slider {
  width: 100%;
}
.sip-calculator >>> .range-slider-knob {
    height: 40px;
    border-radius: 25%;
    background-color: #00c0ff;
    border: none;
    box-shadow: none;
    -webkit-box-shadow: none
}
.sip-calculator >>> .range-slider-fill {
    background-color: #00c0ff;
}
.sip-block{
    padding: 30px;
    border: 1px solid #e4e4e4
}
.category-block{
    max-width: 100px;
    padding-bottom: 10px;
    text-align: center;
}
.category-block-active{
    border-bottom: 3px solid #00c0ff;

}
.year-Block{
    max-width: 100px;
    padding: 12px;
    border: 1px solid;
    color: #00c0ff;
    border-radius: 8px;
    text-align: center;
}
.year-active-block{
    background: #00c0ff;
    color: white
}
</style>