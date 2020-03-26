//获取所有成员
// access_level
// 10 => Guest access
// 20 => Reporter access
// 30 => Developer access
// 40 => Maintainer access
// 50 => Owner access # Only valid for groups
var child_process = require("child_process");
var app = module.exports = {};
var config = require('./config');
app.addUser = function(userId, groupId, access_level, _cb)
{
    access_level = access_level || 30;
    let url = `curl --request POST  --header "PRIVATE-TOKEN: ${config.privateToken}"  --data "user_id=${userId}&access_level=${access_level}" ${config.gitlaburl}/api/v4/groups/${groupId}/members`
    child_process.exec(url, (err, stdout, stderr) =>
    {
        let jData = JSON.parse(stdout);
        if (!!jData.message)
        {
            console.log(jData.message);
        }
        else
        {
            console.log(`userId=${userId},groupId=${groupId},access_level=${access_level}权限添加成功`);
            if (!!_cb)
            {
                _cb(list);
            }
        }
    });
};