<template>
  <div class="UserBox">
      <div class="top">
        <template>
            <a-form layout="inline" :form="form" @submit="handleSubmit">
                <span style="font-size:20px;margin-top:5px">昵称:&nbsp;</span>
                <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                <a-input
                    v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: 'Please input your username!' }] },
                    ]"
                    placeholder="请输入昵称"
                >
                    <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
                </a-input>
                </a-form-item>
               <span style="font-size:20px;margin-top:5px">联系电话:&nbsp;</span>
                <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                    
                <a-input
                    v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] },
                    ]"
                    type="password"
                    placeholder="请输入联系电话"
                >
                    <!-- <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" /> -->
                </a-input>
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
            
        />
      </div>
  </div>
</template>


<script>
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
    dataIndex: 'wechat',
    width: 150,
  },
  {
    title: '钉钉openid',
    dataIndex: 'dingding',
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
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      data,
      columns,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
    //   this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>

<style>
.top{max-height: 400px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
.content{min-height: 525px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
</style>