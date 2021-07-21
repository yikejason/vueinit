<template>
  <div class="UserBox">
      <div class="top">
        <template>
            <a-form layout="inline" :form="form" @submit="handleSubmit">
                <!-- <span style="font-size:20px;margin-top:5px">时间:&nbsp;</span> -->
                <a-form-item label="时间：" style="margin-left:5px;">

               
                <a-range-picker @change="onChange" style="margin-top:4px">
                    <a-icon slot="suffixIcon" type="calendar" />
                </a-range-picker> 
                </a-form-item>
                <a-form-item>
                
                <a-button type="primary"   style="margin-left:10px">
                    搜索
                </a-button>
                <a-button type="primary" @click="() => (modal2Visible = true)" style="margin-left:10px">
                    新增消息
                </a-button>
                                                
                </a-form-item>
            </a-form>
            <a-modal v-model="modal2Visible" title="新增消息" centered  @ok='handleSubmit' :width='600'  okText='确定' cancelText='取消'>
               <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                <a-form-item label="标题:" >
                  <a-input
                    v-decorator="['title', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="消息简讯:">
                  <a-textarea allow-clear  v-decorator="['message', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="消息详情:">
                  <a-textarea allow-clear  v-decorator="['messageDetail', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="发送详情:" >
                  <a-radio-group name="radioGroup" :default-value="0" v-decorator="['radioDetail', { rules: [{ required: true }] }]">
                      <a-radio :value="1" >
                      顾客
                      </a-radio>
                      <a-radio :value="2">
                      业务员
                      </a-radio>
                  </a-radio-group>   
                </a-form-item>
                <a-form-item label="发送方式:">
                  <a-radio-group name="radioGroup"  v-decorator="['radioWay', { rules: [{ required: true }]}]">
                    <a-radio :value="1" >
                    顾客
                    </a-radio>
                    <a-radio :value="2">
                    业务员
                    </a-radio>
                  </a-radio-group>   
                </a-form-item>
               </a-form>
            </a-modal>
        </template>
      </div>
      <div class="content">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="{ pageSize: 50 }"
            :scroll="{ y: 380 }"
            
        />
      </div>
  </div>
</template>


<script>
import axios from 'axios';
import baseUrl from '../../request'
// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 150,
  },
  {
    title: '昵称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
  },
    {
    title: '微信openid',
    dataIndex: 'wexinId',
    width: 150,
  },
  {
    title: '钉钉openid',
    dataIndex: 'dingdingId',
    width: 150,
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '操作',
    dataIndex: 'operator',
  }
];

const data = [];

export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      data,
      columns,
      modal1Visible: false,
      modal2Visible: false,
      addlist:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
    //   this.form.validateFields();
    });
    this.getMsgInfo()
  },
  methods: {
    addMsg(){
      axios.post(`${baseUrl.url}/api/v1/addMessage`,{title:this.addlist.title,message:this.addlist.message,
        messageDetail:this.addlist.messageDetail,sendObj:this.addlist.sendObj,sendWay:this.addlist.sendWay})
        .then(res=>{
          // console.log(res);
          if(res.data.success == true){
            alert('新增消息成功');
          }
        })
    }
    ,
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.addlist = values
          this.addMsg()
          this.modal2Visible = false;
        }else{
          alert('请填写相应的空白项')

        }
      })
    },
    onChange(date, dateString) {
      console.log("change",date, dateString);
    },
    getMsgInfo(){
      axios.post(`${baseUrl.url}/api/v1/manualMessageList`)
      .then(res=>{
        // console.log(res.data.data.list);
        this.data = res.data.data.list
      })
    }
  },
};
</script>

<style scoped>
.top{max-height: 400px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
.content{min-height: 525px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
/* .modalSty{font-size: 13px;} */
</style>