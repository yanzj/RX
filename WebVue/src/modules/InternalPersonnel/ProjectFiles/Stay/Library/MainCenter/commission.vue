<template>
<div class="">
    <div class="pr10">
        <div class="analyItem">
            <p class="analyItemTit tx-center">状态</p>
            <div class="analyItemCon">

            </div>
        </div>
    </div>
    <div class="thinScroll pr10" v-scrollHeight="10">
        <router-link tag="div" :to="routerPath('commissionFine')" class="analyItem anItemBor" active-class="anItemBor-active">
            <p class="analyItemTit tx-center">罚款</p>
            <div class="analyItemCon">
                <p class="col-md-4 ">
                    <span class="cLightGray pr8">提成</span>
                    <span>{{userLevel.fineRatio}}%</span>
                </p>
            </div>
        </router-link>
        <router-link tag="div" :to="routerPath('commissionNegotiation')" class="analyItem anItemBor" active-class="anItemBor-active">
            <p class="analyItemTit tx-center">洽商</p>
            <div class="analyItemCon">
                <p class="col-md-4 ">
                    <span class="cLightGray pr8">提成</span>
                    <span>{{userLevel.incrementRatio}}%</span>
                </p>
            </div>
        </router-link>
        <router-link tag="div" :to="routerPath('commissionCompletion')" class="analyItem anItemBor" active-class="anItemBor-active">
            <p class="analyItemTit tx-center">竣工</p>
            <div class="analyItemCon">
                 <p class="col-md-4 ">
                    <span class="cLightGray pr8">提成</span>
                    <span>{{userLevel.completeRatio}}%</span>
                </p>
            </div>
        </router-link>
    </div>
</div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import {
    GetUserLevelStandardByAbilityLevel
} from '../Resources/Api'
export default {
    data () {
        return {
            userLevel: {}
        }
    },
    created () {
        this.GetUserLevelStandardByAbilityLevelFn()
    },
    methods: {
        // 路由跳转路径拼接
        routerPath (path) {
            return this.$route.matched[1].path + '/' + path
        },
        // 直接进行路由跳转路径
        routerPush (path) {
            this.$router.push(this.$route.matched[1].path + '/' + path)
        },
        // 查询登记对应的分项设置信息
        GetUserLevelStandardByAbilityLevelFn () {
            let _this = this
            _this.userLevel = {}
            GetUserLevelStandardByAbilityLevel({
                level: _this.leftInfo.grade
            }).then(results => {
                _this.userLevel = results.data.Body
            }).catch(error => {
                console.log(error)
            })
        }
    },
    computed: {
        ...mapGetters(['leftInfo'])
    },
    watch: {
        leftInfo () {
            this.GetUserLevelStandardByAbilityLevelFn()
        }
    }
}
</script>
