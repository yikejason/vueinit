<template>
  <a-tabs default-active-key="1" class="aTabs" >
    <a-tab-pane key="1">
      <span slot="tab">
        <!-- <a-icon type="apple" /> -->
        账户密码登录
      </span>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"  
        @submit="handleSubmit"
      >
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: 'Please input your username!' }] },
          ]"
          placeholder="用户名"
          name='username'
        >
          <a-icon slot="prefix" type="user" style="color: rgba(134,199,255)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          placeholder="密码"  class="iptBox" name='password'
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(134,199,255)" />
        </a-input>
      </a-form-item>
      <a-form-item>

        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          自动登录
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button" @click="handleSubmit">
          登录
        </a-button>
        其他登录方式
        <span class="iconSpan">
          <a-icon type="alipay-circle" class="icon"/>
          <a-icon type="wechat"  style="margin:0 20px 0 20px" class="icon"/>
          <a-icon type="taobao-circle" class="icon"/>
        </span>
      </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <!-- <a-icon type="android" /> -->
        手机号登录
      </span>
      Tab 2
    </a-tab-pane>
  </a-tabs>

</template>

<script>
import axios from 'axios';
import baseUrl from '../../request'
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.username = values.userName;
          this.password = values.password;
          this.getUseInfo();
          
        }
        
      });
    },
    getUseInfo(){
      axios.post(`${baseUrl.url}/api/v1/login`,{username:this.username,password:this.password})
      .then(res=>{
        if(res.data.data.userInfo!==null){
          console.log(res);
          this.$router.push({path:'/admin'})
        }else{
          alert('输入正确的账号和密码')
        }
      }).catch(err=>{
        console.log(err);
      })
    },
  },
}
</script>

<style>
/* .ant-tabs-nav{text-align: center;margin: 0 auto;} */
.aTabs{width: 350px;margin: 5px auto;}
/* #components-form-demo-normal-login{} */
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.iconSpan{font-size: 24px;margin-left: 20px;margin-top: 5px;cursor: pointer;color: rgb(180, 173, 173);}
.icon:hover{color: rgb(72, 174, 241);transition: 0.5s;}
</style>