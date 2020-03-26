//获取所有成员 
var config = require('./config');
var addUserToGroup = require('./addUserToGroup');
var getAllMerber = require('./getAllMerber');
var userName = process.argv[2];
var gameShortName = process.argv[3];
var access_level = process.argv[4];
var app = module.exports = {};
app.add = function(userId, gameShortName, access_level, _cb)
{
    let needAddGroup = [];
    let gameShortNameList = gameShortName.split('#')
    for (let key of gameShortNameList)
    {
        if (!!config[key])
        {
            needAddGroup = needAddGroup.concat(config[key])
        }
        else
        {
            console.error(`游戏短名${key}参数未配置 config.js`);
        }
    }
    needAddGroup = needAddGroup.concat(config["common"])
    for (let groupId of needAddGroup)
    {
        addUserToGroup.addUser(userId, groupId)
    }
};
app.doMain = function()
{
    if (!userName || !gameShortName || !access_level)
    {
        console.error("参数错误：参数1：gitlab账号，参数2：游戏短名，参数3：权限等级");
        return;
    }
    if (!(10 == access_level || 20 == access_level || 30 == access_level || 40 == access_level || 50 == access_level))
    {
        console.error("参数3：权限等级错误");
        console.error(`10 => Guest access
20 => Reporter access
30 => Developer access
40 => Maintainer access
50 => Owner access # Only valid for groups`);
        return;
    }
    getAllMerber.getMerbers((userList) =>
    {
        let userNameList = userName.split('#')
        for (let key of userNameList)
        {
            if (!userList[key])
            {
                console.error("账号不存在请先注册账号");
                return
            }
            app.add(userList[key].id, gameShortName, access_level);
        }
    })
};
app.doMain();