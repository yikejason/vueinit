<template>
  <div class="box">
      <div class="item">
        <img src="../assets/logo2.svg" alt="">
        <!-- <a-icon type="ant-design" class="img"/> -->
        <h5>Ant Design</h5>
    
      </div>
      <div style="margin-top:20px;color:rgba(0,0,0,.45);margin-bottom:40px;text-align:center">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
      <div class="content">
          <router-view></router-view>
      </div>
      <div class="footer">
          <span><a href="">Ant Design Pro</a></span>
          <a-icon type="github" />
          <span><a href="">Ant Design</a></span>
          
      </div>  
      <div style="text-align:center;margin-top:150px">2020蚂蚁集团体验技术部出版社</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box{display: flex;justify-content: flex-start;flex-direction: column;min-height: 500px;background: url(../assets/background.svg);}
.item{height: 44px;display: flex;justify-content: center;line-height: 44px;margin-top: 60px;}
.item img{
    /* font-size: 40px; */
    /* color: rgb(105, 143, 201);     */
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
    border-style: none;}
.item h5{font-size: 33px;
    color: rgba(0,0,0,.85);
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;}
.footer{position: relative;bottom: 0;display: flex;justify-content: space-between;width: 300px;margin: 0 auto;height: 30px;line-height: 15px;top: 150px;}
.footer a{color: gray;}
</style>