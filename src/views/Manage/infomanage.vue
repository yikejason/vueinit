<template>
  <div class="UserBox">
      <div class="top">
        <template>
            <a-form layout="inline" :form="form" @submit="handleSubmit">
                <span style="font-size:20px;margin-top:5px">时间:&nbsp;</span>
                <a-range-picker @change="onChange" style="margin-top:4px">
                    <a-icon slot="suffixIcon" type="calendar" />
                </a-range-picker>
                <a-form-item>
                
                <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())" style="margin-left:10px">
                    搜索
                </a-button>
                <a-button type="primary" @click="() => (modal2Visible = true)" style="margin-left:10px">
                    新增消息
                </a-button>
                                                
                </a-form-item>
            </a-form>
            <a-modal v-model="modal2Visible" title="新增消息" centered  @ok="() => (modal2Visible = false)" :width='600' :height='500' okText='确定' cancelText='取消'>
            <a-row type="flex" justify="start"  class="modalSty">
                <a-col :span="4" push='0'>
                    <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;" /> &nbsp;<strong>标题:</strong>
                </a-col>
                <a-col :span="16" push="0">
                    <a-input allow-clear @change="onChange" />
                </a-col>
            </a-row>
            <a-row type="flex" justify="start" style="margin:10px 0 10px 0"  class="modalSty">
                <a-col :span="4">
                    <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;"  />&nbsp;<strong>消息简讯&nbsp;:</strong>
                </a-col>
                <a-col :span="16">
                    <a-textarea allow-clear @change="onChange" />
                </a-col>
            </a-row>                
            <a-row type="flex" justify="start"  class="modalSty">
                <a-col :span="4" >
                    <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;"  />&nbsp;<strong>消息详情&nbsp;:</strong>
                </a-col>
                <a-col :span="16" style="margin-bottom: 10px;" >
                    <a-textarea allow-clear @change="onChange" />
                </a-col>
            </a-row>
            <a-row  class="modalSty" style="margin:10px 0 10px 0">
                <a-col :span="4">
                    <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;"  />&nbsp;<strong>发送对象&nbsp;:</strong>
                </a-col>
                <a-col :span="12">
                    <a-radio-group name="radioGroup" :default-value="0">
                        <a-radio :value="1">
                        顾客
                        </a-radio>
                        <a-radio :value="2">
                        业务员
                        </a-radio>
                    </a-radio-group>                       
                </a-col>
            </a-row>
            <a-row  class="modalSty">
                <a-col :span="4">
                    <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;" />&nbsp;<strong>发送方式&nbsp;:</strong>
                </a-col>
                <a-col :span="12">
                    <a-radio-group name="radioGroup" :default-value="0">
                        <a-radio :value="1">
                        顾客
                        </a-radio>
                        <a-radio :value="2">
                        业务员
                        </a-radio>
                    </a-radio-group>  
                </a-col>
            </a-row>                
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
      modal1Visible: false,
      modal2Visible: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
    //   this.form.validateFields();
    });
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
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
      })
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
};
</script>

<style>
.top{max-height: 400px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
.content{min-height: 525px;border:1px solid rgb(255, 255, 255);padding: 10px;border-radius: 6px;box-shadow: 0 0px 6px 0px;margin: 10px;}
/* .modalSty{font-size: 13px;} */
</style>