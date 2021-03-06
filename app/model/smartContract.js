'use strict';

module.exports = app => {
	const { INTEGER, DATE, STRING, TEXT, FLOAT } = app.Sequelize;

	return app.model.define('smart-contract', {
		id: { type: INTEGER, primaryKey: true, autoIncrement: true },
		address: STRING(42),
		blockNum: INTEGER, // 获得的实时块高
		usedNum: STRING(64), // 增加了64的实际使用的未来块高数据
		random: STRING(34),
		commit: STRING(66),
		sign: TEXT,
		placeTxHash: STRING(66), // event commit获得的place tx Hash
		commitBlockHash: STRING(66), // event commit获得的blockHash
		value: STRING(64), // event获得的游戏下注额度
		mask: STRING(64), // event获得的用户下注数据
		modulo: STRING(64), // event获得的游戏类型
		blockNumber: STRING(64), // event获得的块高
		sendSignTxData: TEXT, // 发送的sign数据
		settleBetRet: TEXT, // settleBet的返回数据
		txHash: STRING(66), // Transaction Hash
		paymentRet: TEXT, // event Payment返回的returnValues
		res: STRING(64), // event Payment返回的returnValues中的res
		amount: STRING(64), // event Payment返回的returnValues中的amount
		status: STRING(64), // starting：开始游戏； sent：已发送settleBet； completed：已完成。
		created_at: DATE,
		updated_at: DATE,
	});
};