//获取所有成员
var child_process = require("child_process");
var app = module.exports = {};
var config = require('./config');
app.getGroups = function(_cb)
{
    let url = `curl --header "PRIVATE-TOKEN: ${config.privateToken}" ${config.gitlaburl}/api/v4/groups?per_page=100`
    child_process.exec(url, function(err, stdout, stderr)
    {

        if (!!err)
        {
            return console.log(JSON.stringify(err));
        }
        let jData = JSON.parse(stdout);
        let list = {};
        if (!!jData.message || !!jData.error)
        {
            console.log(stdout);
        }
        else
        {
            for (let key in jData)
            {
                let info = jData[key]
                list[info.name] = info;
                console.log(`${info.name}:${info.id}`);
            }
            if (!!_cb)
            {
                _cb(list);
            }
        }
    });
};