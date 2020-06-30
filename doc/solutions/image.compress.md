<!-- 
  上传图片时压缩优化的方案
 -->
 ## 上传图片的方式
 <!-- https://segmentfault.com/a/1190000017781605 -->
 1. FileReader读取文件
 ```javascript
  FileReader.readAsDataURL(); // 将读取的文件转换为 base64 编码的字符串
 ```
 2. FormData 对象
 3. 使用 axios 上传

## 压缩方案
<!-- 
  https://juejin.im/post/5c5568c8518825622243a3a5

  https://hongxuwei.github.io/2019/03/08/%E5%89%8D%E7%AB%AF/%E5%89%8D%E7%AB%AF%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9%E4%B8%8A%E4%BC%A0/index.html
 -->
用canvas等比压缩

## 好的开源的compress项目
[html5ImgCompress](https://github.com/mhbseal/html5ImgCompress)

## 推荐阅读
1. [nginx + fastDFS - 单机图片服务器解决方案](https://cloud.tencent.com/developer/article/1085098)

## 了解一下
- 图片服务器 FastDFS