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
            <router-link tag="div" :to="{name:'processOrder',params:{datainfo: datainfo}}" class="analyItem anItemBor" active-class="anItemBor-active">
                <p class="analyItemTit tx-center">订单</p>
                <div class="analyItemCon">
                    <!-- <div class="col-md-3"><span class="cLightGray pr8">标准</span><span>{{userLevelStandardDetail.orderCompletionRate}}%/周</span></div> -->
                    <div class="col-md-3"><span class="cLightGray pr8">标准</span><span>{{userLevelStandardDetail.greatMore}}%/月</span></div>
                </div>
            </router-link>
            <!-- <router-link tag="div" :to="{name:'cameras',params:{datainfo: datainfo}}" class="analyItem anItemBor" active-class="anItemBor-active">
                <p class="analyItemTit tx-center">摄像头</p>
                <div class="analyItemCon"> -->
            <!-- <div class="col-md-3"><span class="cLightGray pr8">标准</span><span>{{datainfo.orderCompletionRate}}%/周</span></div> -->
            <!-- <div class="col-md-3"><span class="cLightGray pr8">标准</span><span>100%/月</span></div>
                </div>
            </router-link> -->
        </div>
    </div>
</template>
<script>
import { getWarehouseResultDetail } from '../Resources/Api/index'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            userLevelStandardDetail: {},
            datainfo: []
        }
    },
    computed: {
        ...mapGetters(['leftInfo', 'userInfo'])
    },
    created () {
        this.load()
    },
    methods: {
        load () {
            getWarehouseResultDetail({ abilityLevel: this.leftInfo.grade, abilityType: 22 }).then((result) => {
                if (result.data.Body.userLevelStandardDetail !== null) {
                    this.userLevelStandardDetail = result.data.Body.userLevelStandardDetail
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 路由跳转路径拼接
        routerPath (path) {
            return this.$route.matched[1].path + '/' + path
        },
        // 直接进行路由跳转路径
        routerPush (path) {
            this.$router.push(this.$route.matched[1].path + '/' + path)
        }
    },
    watch: {
        leftInfo () {
            this.load()
        }
    }
}
</script>
