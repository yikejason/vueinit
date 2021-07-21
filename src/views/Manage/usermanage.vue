<template>
  <div class="UserBox">
      <div class="top">
        <template>
            <a-form layout="inline" :form="form" @submit="handleSubmit">
                <!-- <span style="font-size:20px;margin-top:5px">昵称:&nbsp;</span> -->
                <a-form-item label="昵称：" style="margin-left:15px">
                <a-form-item :validate-status="NickName() ? 'error' : ''" :help="NickName() || ''">
                <a-input
                    v-decorator="[
                    'nickname',
                    { rules: [{ required: true, message: 'Please input your nickname!' }] },
                    ]"
                    placeholder="请输入昵称"
                >
                    <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
                </a-input>
                </a-form-item>
                </a-form-item>
               <!-- <span style="font-size:20px;margin-top:5px">联系电话:&nbsp;</span> -->
               <a-form-item label="联系电话：">
                <a-form-item :validate-status="ContactPhone() ? 'error' : ''" :help="ContactPhone() || ''">
                <a-input
                    v-decorator="[
                    'contactphone',
                    { rules: [{ required: true, message: 'Please input your Contactphone!' }] },
                    ]"
                    type="contactphone"
                    placeholder="请输入联系电话"
                >
                    <!-- <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" /> -->
                </a-input>
                </a-form-item>
                 </a-form-item>
                <a-form-item>
                <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
                    搜索
                </a-button>
                </a-form-item>
            </a-form>
        </template>
      </div>
      <div class="content">
          <a-table
            :columns="columns"
            :data-source="data"
            :pagination="{ pageSize: 50 }"
            :scroll="{ y: 380 }"
            key="data.title"
        />
      </div>
  </div>
</template>


<script>
import axios from 'axios';
import baseUrl from '../../request'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
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

export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      data:[],
      columns,
      id:'',
      searchList:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
    //   this.form.validateFields();
    });
    this.getUserList()
  },
  methods: {
    // Only show error after a field is touched.
    NickName() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('nickname') && getFieldError('nickname');
    },
    // Only show error after a field is touched.
    ContactPhone() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('contactphone') && getFieldError('contactphone');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.searchList = values;
          this.getSearchInfo(this.searchList);
        }
        // this.getUserList()
      });
    },
    getUserList(){
      axios.get(`${baseUrl.url}/api/v1/userlist`)
      .then(res=>{
        // console.log(res.data.data.list);
        this.data = res.data.data.list
      })
    },
    getSearchInfo(e){
      axios.post(`${baseUrl.url}/api/v1/search/user`,{name:e.name,phone:e.phone})
      .then(res=>{
        console.log(res);
        if(res.data.success){
          alert('搜索成功')
        }
      })
    }
  },
}
</script>

<style>
.top{max-height: 400px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
.content{min-height: 525px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
</style>