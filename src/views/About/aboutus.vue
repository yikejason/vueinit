<template>
  <!-- -->
  <div class="aboutSty">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
    <a-form-item label="客户服务:" >
      <a-input
        v-decorator="['title', { rules: [{ required: true, message: 'Please input your note!' }] }]"
      />
    </a-form-item>
    <a-form-item label="联系我们:">
      <div ref="editor"></div>
    </a-form-item>
    <a-form-item label='广告线索图片:'>
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            更换图片
          </div>
        </div>
      </a-upload>
    </a-form-item>
        <a-row type="flex" justify="start"  class="modalSty">
        <a-col :span="16" push=5>
           <a-button type="primary">确认</a-button> 
        </a-col>

    </a-row>
    </a-form>

       
  </div>

</template>
<script>
import E from '../../../node_modules/wangeditor-antd'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
    data(){
      return{
        loading: false,
        imageUrl: '',
      }
    },
    name: 'editor',
    props:['get-full-text','content'], //回调方法
    mounted() {
        let editor = new E(this.$refs.editor);
        editor.customConfig.onchange = (html) => {
            this.getFullText(html) //内容赋值
        };
        editor.customConfig.uploadImgServer ='你的上传地址';
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.zIndex = 100;
        editor.customConfig.uploadImgParams = {
            from: 'editor'
        };
        editor.create();
        //如果默认传递content值则渲染默认内容
        if(this.content){
            editor.txt.html(this.content)
        }
    },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  },
}
</script>

<style>
.aboutSty{margin-top: 3%;}
/* .editorSty{height: 500px;} */
.avatar-uploader > .ant-upload {
  width: 300px;
  height: 96px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>