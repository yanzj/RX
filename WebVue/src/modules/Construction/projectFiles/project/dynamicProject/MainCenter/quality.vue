<template>
<div class="">
    <div class="pr10">
        <div class="analyItem">
            <p class="analyItemTit tx-center">状态</p>
            <div class="analyItemCon">
                <div class="col-md-12">
                    <div class="col-md-3">
                        <span class="cGreen pr8" title="当前阶段">{{leftInfo.AfterMarketState | stage}}</span>
                    </div>
                    <div class="col-md-3">
                        <span class="cGreen pr8" title="进入该阶段的日期">{{leftInfo.AfterMarketStateTime}}</span>
                    </div>
                    <div class="col-md-3">
                        <span class="cGreen pr8">未开启</span>
                    </div>
                    <span class="circlemark circlemark-lightGreen">正</span>
                </div>
            </div>
        </div>
    </div>
    <div class="thinScroll pr10" v-scrollHeight="84">
        <router-link tag="div" :to="{path:routerPath('quality'), query:{qualityList: item}}" class="analyItem anItemBor" exact active-class="anItemBor-active"
            v-for="(item, index) in  qualityList" :key='index'
            >
            <p class="analyItemTit tx-center">{{item.ProcesName | slice(0,4)}}</p>
            <div class="analyItemCon">
                <div class="col-md-12">
                    <p class="col-md-6">
                        <span class="cLightGray pr8">编号：</span>
                        <span class="cGreen">{{item.OrderNumber}}</span>
                    </p>
                </div>
                <span :class="['circlemark', item.FinishedState ? 'circlemark-lightGreen' : 'circlemark-lightRed']">{{item.FinishedState ? '完' : '未'}}</span>
            </div>
        </router-link>
    </div>
    <div class="pr10">
        <router-link tag="div" :to="routerPath('default')" class="analyItem anItemBor" active-class="anItemBor-active">
            <p class="analyItemTit tx-center">处理</p>
            <div class="analyItemCon">
                <div class="col-md-12">
                </div>
            </div>
        </router-link>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GetProcessListDetailByOrderno } from '../Resources/Api/index'
export default {
    data () {
        return {
            qualityList: [] // 质量订单
        }
    },
    computed: {
        ...mapGetters(['leftInfo', 'userInfo'])
    },
    created () {
        this.GetProcessListDetailByOrderno()
    },
    methods: {
        GetProcessListDetailByOrderno () {
            let _this = this
            // 参数
            let parm = {
                orderno: this.leftInfo.orderno,
                ptype: 1
            }
            GetProcessListDetailByOrderno(parm).then((result) => {
                _this.qualityList = result.data.Body
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
            this.GetProcessListDetailByOrderno()
        }
    },
    filters: {
        stage (parone) {
            let value = ''
            switch (parone) {
            case 0:
            case 10:
                value = '审计'
                break
            case 20:
                value = '准备'
                break
            case 30:
                value = '在施'
                break
            case 31:
                value = '施前'
                break
            case 32:
                value = '施中'
                break
            case 33:
                value = '施尾'
                break
            case 40:
                value = '竣工'
                break
            case 50:
                value = '完工'
                break
            case 60:
                value = '历史'
                break
            case 70:
                value = '坏账'
                break
            case 80:
                value = '退单'
                break
            }
            return value
        }
    }
}
</script>
