<template>
<div class="layerRtb layerRtb-threecolumn">
    <three-title :title="{name:'【财务_记录查看】详情'}"></three-title>
    <div class="stay-nav spread-top plr10 pb10">
       <ul class="clearfix uiTab3">
            <li class=" layerui-title" :class="{'uiTab3-active':subIndex==1}" @click="subSwitch(1)" data-title="此项目下支款记录"><a href="javascript:">支款记录</a></li>
            <!-- <li class=" layerui-title" :class="{'uiTab3-active':subIndex==2}" @click="subSwitch(2)" data-title="此项目下未付材料"><a href="javascript:">未付材料</a></li>
            <li class=" layerui-title" :class="{'uiTab3-active':subIndex==3}" @click="subSwitch(3)" data-title="此项目下罚款记录"><a href="javascript:">罚款记录</a></li>
            <li class=" layerui-title" :class="{'uiTab3-active':subIndex==4}" @click="subSwitch(4)" data-title="此项目下增减项记录"><a href="javascript:">增减项记录</a></li> -->
        </ul>
    </div>

    <div class="layerRtb-scroll thinScroll" v-scrollHeight = "137">
       <div class="analyItem" v-for="(item, index) in paymentRecordList" :key="index">
            <p class="analyItemTit tx-center">{{item.typeName}}</p>
            <div class="analyItemCon">
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">申请日期</span><span>{{formatDate(item.CreateDate)}}</span>
                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">支款金额</span><span>{{item.DebitAll.toFixed(2)}}</span>
                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8" data-state="3">支款状态</span>
                            <!-- <span style="color:green;"></span> -->
                        {{GrantStatus(item.Status,item.GrantStatus)}}
                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">支付日期</span><span>{{formatDate(item.Time)}}</span>
                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">收款人</span><span class="layerui-title">
                        {{item.Payee.substr(0,5) }}
                    </span>
                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">收款账号</span><span class="layerui-title" :data-title="item.PayeeBankNo">
                        {{item.PayeeBankNo.substr(0,10)}}...
                    </span>
                </p>
                <p class="fl col-md-4 layerui-title"  :data-title="item.Code+'<br>点击查看支出凭证图片'">
                    <span class="cLightGray pr8 fl">凭证号</span>
                    <rx-viewer class="fl">
                        <div class="clearfix">
                            <div class="col-md-12" v-for="(itemImg, Imgindex) in item.ImageURL.split(';')" :key='Imgindex'>
                                <span :class="['enlarge_viewer','cBlue', 'select_look', Imgindex !== 0 ? 'hide' : '']" style="cursor:pointer" :data-src="itemImg">{{item.Code.substr(0,2)}}...{{item.Code.substr(16,item.Code.lenth)}}</span>
                                <img :src="itemImg" style="display:none">
                            </div>
                        </div>
                    </rx-viewer>
                </p>

                <p class="fl col-md-4 layerui-title" :data-title="item.Summary1" >
                    <span class="cLightGray pr8">支款备注</span><span>{{item.Summary1.substr(0,15)}}...</span>

                </p>
                <p class="fl col-md-4">
                    <span class="cLightGray pr8">操作人</span><span class="layerui-title">
                            {{item.SourceBy}}
                    </span>
                </p>
        </div>
    </div>
    </div>
    <div class="layerRtb-footer">
        <div class="analyItem">
            <p class="analyItemTit tx-center">综合</p>
            <div class="analyItemCon">
                <p class=" col-md-4">
                    <span class="cLightGray pr8">支出数目</span>
                     <span class="cLightGray pr8">7</span>
                </p>
                <p class=" col-md-4">
                    <span class="cLightGray pr8">支款金额</span>
                    <span class="cLightGray pr8">189709.10</span>
                </p>
        </div>
        </div>
    </div>
    <!-- 四段渲染容器 -->
    <transition-group class="animated faster" enter-active-class="animated faster slideInRight" leave-active-class="animated faster slideOutRight">
        <pay-four v-if="fourIndex === 0" :key="0"></pay-four>
    </transition-group>
</div>
</template>
<script>
import payFour from './four/payFour'
import { mapGetters } from 'vuex'
import { getPaymentRecord } from '../../Resources/Api'
export default {
    components: {
        payFour
    },
    data () {
        return {
            subIndex: 1,
            fourIndex: undefined,
            paymentRecordList: [] // 支款记录
        }
    },
    computed: {
        ...mapGetters(['leftInfo'])
    },
    created () {
        this.load()
        console.log(this.$route)
    },
    methods: {
        subSwitch (index) {
            this.subIndex = index
        },
        clickFourShow (index) {
            this.fourIndex = index
        },
        // 默认加载
        load () {
            let param = {
                orderNo: this.leftInfo.orderno, // this.leftInfo.orderno
                type: 0
            }
            // 查询材料数据
            getPaymentRecord(param).then(results => {
                this.paymentRecordList = results.data.Body.paymentRecordList
            }).catch(() => {})
        }, // 时间转换
        formatDate (value) {
            let date = new Date(value)
            let y = date.getFullYear()
            let MM = date.getMonth() + 1
            MM = MM < 10 ? ('0' + MM) : MM
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            return y + '-' + MM + '-' + d
        },
        // 支款状态
        GrantStatus (Status, GrantStatus) {
            let str = ''
            if (Status === 1) {
                if (GrantStatus === 3) {
                    str = '出纳已付'
                } else if (GrantStatus === 2) {
                    str = '待出纳上传凭证'
                } else {
                    str = '出纳待办'
                }
            } else if (Status === 3) { // 冻结  需要作废
                str = '已作废'
            } else if (Status === 4) { // 已作废
                str = '出纳作废'
            }
            return str
        }
    },
    watch: {
        leftInfo () {
            this.load()
        }
    }
}
</script>
<style scoped>
.uiTab3 li{
    margin-right:5px
}
</style>
