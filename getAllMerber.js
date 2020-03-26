//获取所有成员
var child_process = require("child_process");
var app = module.exports = {};
var config = require('./config');
app.getMerbers = function(_cb)
{
    let url = `curl  --header "PRIVATE-TOKEN: ${config.privateToken}"  ${config.gitlaburl}/api/v4/users?per_page=100`
    child_process.exec(url, function(err, stdout, stderr)
    {
        if (!!err)
        {
            return console.log(JSON.stringify(err));
        }
        let jData = JSON.parse(stdout);
        let nameList = {};
        if (!!jData.message || !!jData.error)
        {
            console.log(stdout);
        }
        else
        {
            for (let key in jData)
            {
                let user = jData[key]
                nameList[user.name] = user;
            }
            if (!!_cb)
            {
                _cb(nameList);
            }
        }
    });
};
// app.getMerbers();