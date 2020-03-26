var gitProUrl = process.argv[2];
var sumPath = process.argv[3];
var child_process = require("child_process");
var app = module.exports = {};
app.doMain = function()
{
    console.log("命令格式提示:参数1:git项目地址,参数2:子模块路径")
    if (!!gitProUrl && !!sumPath)
    {
        let info = `git submodule add ${gitProUrl} ${sumPath}`;
        child_process.exec(info, (err, stdout, stderr) =>
        {
            if (!!err)
            {
                console.log(err);
                return;
            }

            console.log("stderr=" + stderr);

        });
    }
    else
    {
        console.error("参数错误")
        console.error("正确姿态:node addSubmodule http://ip或者域名:端口/xx.git ./xx")
    }
}
app.doMain();