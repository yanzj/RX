<template>
<div class="layerRtb layerRtb-threecolumn">
    <three-title :title="{name:params.workerType.workerTypeName}"></three-title>
    <div class="layerRtb-scroll thinScroll" v-scrollHeight = "137">
        <div class="analyItem" v-for="index in params.workerType.workerNumber" :key="index">
            <p class="analyItemTit tx-center" >{{params.workerType.workerTypeName+index}}</p>
            <div class="analyItemCon">
                <div class="col-md-12 flex" v-if="personList[index-1]!==null&&personList[index-1]!==undefined">
                    <div class="mt5" style="text-align:center;width: 80px">
                        <img :src="personList[index-1].personImg" alt="" style="height:40px;width:40px;"/>
                        <div><span>{{personList[index-1].workerName}}</span></div>
                    </div>
                    <div class="col-md-8" style="height:62ox;line-height:30px">
                        <div class="col-md-6"><span class="cLigthGray pr8">级别</span><span>{{personList[index-1].workerLevel}}</span></div>
                        <div class="col-md-6"><span class="cLigthGray pr8">在施</span><span>{{personList[index-1].buildCount}}</span></div>
                        <div class="col-md-6"><span class="cLigthGray pr8">星级</span><span>{{personList[index-1].starLevel}}</span></div>
                        <div class="col-md-6"><span class="cLigthGray pr8">电话</span><span>{{personList[index-1].mobile}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="layerRtb-footer">
            <div class="analyItem">
                <p class="analyItemTit tx-center">综合</p>
                <div class="analyItemCon">
                    <div class="col-md-3"><span class="cLightGray pr8">应选</span><span>{{params.workerType.workerNumber}}</span></div>
                    <div class="col-md-3"><span class="cLightGray pr8">已选</span><span>{{params.workerType.workerActiveNumber}}</span></div>
                    <div class="col-md-3"><span class="cLightGray pr8">未选</span><span>{{params.workerType.diffWorkerNumber}}</span></div>
                    <div class="col-md-3"><span class="cLightGray pr8">待审</span><span>{{params.workerType.auditCount}}</span></div>
                </div>
            </div>
            <!-- <div class="tx-center">
            <input type="button" class="uiBtn-normal uiBtn-blue" value="确定">
        </div> -->
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getWorkersInfo } from '../Resources/Api/order'
export default {
    data () {
        return {
            params: [], // 二段传参 工种名称，工种编号
            personList: [] // 人工信息
        }
    },
    computed: {
        ...mapGetters(['leftInfo'])
    },
    created () {
        this.params = this.$route.params
        this.load()
    },
    methods: {
        load () {
            // 用_this 代替this
            let _this = this
            _this.loading = true
            // 接口请求项目信息
            let proparm = {
                orderno: _this.leftInfo.orderno,
                workerTypeId: _this.params.workerType.workerTypeId
            }
            getWorkersInfo(proparm).then((result) => {
                if (result.data.statusCode === 1) {
                    _this.personList = result.data.body
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    watch: {
        $route () {
            this.params = this.$route.params
            this.load()
        }
    }

}
</script>
<style lang="scss" scoped>
    .flex {
        display: flex;
        justify-content: start
    }
</style>
