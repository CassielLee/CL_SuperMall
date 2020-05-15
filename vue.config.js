const path = require('path');//引入path模块
// function resolve(dir){
//     return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
// }
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        // .set('@',path.join(__dirname,'./src'))
        .set('components',path.join(__dirname,'src/components'))
        .set('views',path.join(__dirname,'src/views'))
        .set('assets',path.join(__dirname,'src/assets'))
        .set('common',path.join(__dirname,'src/common'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
　　　　
    }
}