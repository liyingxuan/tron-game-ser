# Egg.js调用Tron做游戏

### 目录结构
```
egg-project
├── package.json
├── app
|   ├── router.js（入口）
│   ├── controller
│   |   └── users.js
│   ├── helper（自己的一些函数）
|   |   ├── MathExtend.js
|   |   ├── MyTools.js
│   |   └── ScAction.js
│   ├── middleware
│   |   └── error_handler.js
│   ├── model（数据库ORM相关）
│   |   └── users.js
│   ├── public（放JS/CSS等静态资源）
│   |   └── LoadFiles（合约相关的）
│   ├── schedule（app启动时的定时任务）
│   |   └── xxx.css
│   └── service
│       └── users.js
├── config
|   ├── config.default.js
|   ├── config.local.js
│   ├── config.prod.js
|   └── plugin.js
├── database（数据库）
└── logs（日志）
```

### 本地开发
```bash
$ npm install

$ cp ./config/config.prod.js ./config/config.local.js
# 配置需要的local项目

# 安装MySQL，并完成相关配置
# 然后完成数据库结构迁移：
$ npx sequelize db:migrate

$ npm run dev
$ open http://localhost:7001/api/sc/
```

### ./app/public/LoadFiles/my-pk.json 文件结构
> 因为需要提供私钥，所以将文件设置在一个其他位置，线上部署可以更换成线上无法访问的绝对地址。
```json
[
  {
    "serverUrl": "https://xxx.infura.io/xxx",
    "contractAddress": "0x",
    "signAccountPK": "0x",
    "croupierAccountPK": "0x"
  }
]
```

##### 标准打印
```javascript
this.ctx.logger.info('my request data: ', data);
```

### 数据库迁移
```bash
$ npx sequelize migration:generate --name=init-users
修改migrations新生成的变成符合自己需要的
# 升级数据库
$ npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
```

### 线上部署
```bash
Centos7.x为例：
$ yum install git gcc-c++ unzip
# git获取项目或者scp推上去

# 安装node8.0+：
$ curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
$ yum install nodejs
$ npm i -g egg-scripts

# cd 项目目录下
$ npm i

# 安装MySQL，并完成相关配置
# 然后完成数据库结构迁移：
$ npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo

# 启动！然后就可以外网使用服务了
$ npm run ser-start

# 停止服务：
$ npm run ser-stop
```