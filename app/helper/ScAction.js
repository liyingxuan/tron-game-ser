const EthCrypto = require('eth-crypto');
const web3 = require('web3');
const MyTools = require('./MyTools');

let ScAction = {
	getSign: async function (ctx) {
		let block = await ctx.app.tronWeb.trx.getCurrentBlock();
		let num = block.block_header.raw_data.number - 5;
		let bNumber = web3.utils.padLeft(num, 10);
		let commit = MyTools.to66LengthFor0x(web3.utils.randomHex(32));
		let hash = web3.utils.soliditySha3(bNumber, commit);
		let signHash = EthCrypto.sign(ctx.app.myData.signAccountPK, hash);
		let sign = {
			r: signHash.slice(0, 66),
			s: '0x' + signHash.slice(66, 130),
			v: web3.utils.toDecimal('0x' + signHash.slice(130, 132))
		};

		return {
			blockNum: num,
			usedNum: bNumber,
			random: commit,
			commit: commit,
			sign: sign
		}
	},

	/**
	 * 定时任务：获取Events的commit类型
	 */
	getEvents: async function (ctx) {
		let fromTime = 0;
		let timestamp = (new Date()).valueOf();
		// fromTime = await ctx.service.smartContract.getFromTime('starting');
		try {
			let ev = await ctx.app.tronWeb.getEventResult(ctx.app.myData.contractAddress, fromTime, 'Commit');

			for (let i in ev) {
				let commit = MyTools.to66Length(ev[i].result.commit);

				let updates = {
					blockNumber: ev[i].block,
					txHash: ev[i].transaction,
					paymentRet: JSON.stringify(ev[i].result),
					res: ev[i].result.res,
					amount: ev[i].result.amount,
					status: 'completed'
				};

				this.updateSC(ctx, commit, updates)
			}
		} catch (e) {
			console.error(e)
		}
	},

	updateSC: async function (ctx, commit, updates) {
		const params = {
			commit: commit,
			updates: updates
		};

		return await ctx.service.smartContract.update(params, 'starting').then(res => {
			return res;
		});
	},
};

module.exports = ScAction;
