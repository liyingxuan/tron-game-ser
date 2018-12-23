const fs = require('fs');
const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

module.exports = app => {
	app.beforeStart(async () => {
		// 加载文件
		app.myData = JSON.parse(fs.readFileSync('app/public/LoadFiles/my-pk.json'))[0];

		// 设置web3
		app.fullNode = new HttpProvider(app.myData.serverUrl);
		app.solidityNode = new HttpProvider(app.myData.serverUrl);
		app.eventServer = app.myData.serverUrl;

		app.tronWeb = new TronWeb(
			app.fullNode,
			app.solidityNode,
			app.eventServer,
			app.myData.signAccountPK
		)

		// 应用会等待这个函数执行完成才启动
		await app.runSchedule('sc-event');
	});
};