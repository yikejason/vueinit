<template>
  <!-- -->
  <div class="aboutSty">
      <a-row type="flex" justify="start"  class="modalSty">
        <a-col :span="4" push=2>
            <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;" />&nbsp;<strong>客户服务&nbsp;:</strong>
        </a-col>
        <a-col :span="16">
            <a-input allow-clear />
        </a-col>
    </a-row>
    <a-row type="flex" justify="start" style="margin:10px 0 10px 0"  class="modalSty">
        <a-col :span="4" push=2>
            <a-icon type="star" theme="filled" :style="{color:'red'}" style="font-size:6px;"  />&nbsp;<strong>联系我们&nbsp;:</strong>
        </a-col>
        <a-col :span="16">
           <div ref="editor"></div>
        </a-col>
    </a-row>                
    <a-row type="flex" justify="start"  class="modalSty">
        <a-col :span="4" push="1">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>广告线索图片&nbsp;:</strong>
        </a-col>
        <a-col :span="16" style="margin-bottom: 10px;" >
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
        </a-col>
    </a-row>
    <a-row type="flex" justify="start"  class="modalSty">
        <a-col :span="10" push=4>
           <a-button type="primary">确认</a-button> 
        </a-col>
    </a-row>
       
  </div>

</template>
<script>
import E from 'wangeditor-antd'
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
.aboutSty{margin-top: 5%;}
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