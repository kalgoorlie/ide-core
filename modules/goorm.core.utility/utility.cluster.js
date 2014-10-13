/**
 * Copyright Sung-tae Ryu, goormDev Team. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * email : contact@goorm.io
 *       : sungtae.ryu@goorm.io
 * project_name : goormIDE
 * version: 2.0.0
 **/
var cluster = require('cluster');
var os = require('os');
var numCPUs = os.cpus().length;

module.exports = {
	method: "",
	ip: "127.0.0.1",

	init: function () {
		var networkInterfaces = os.networkInterfaces();
		var get_ip = false;

		for (var device in networkInterfaces) {
			var cfg = networkInterfaces[device];

			if (cfg && cfg.length > 0) {
				for (var i=0; i<cfg.length; i++) {
					var detail = cfg[i];

					if (detail && detail.family === 'IPv4' && detail.address !== '127.0.0.1') {
						this.ip = detail.address;
						get_ip = true;
						break;
					}
				}
			}

			if (get_ip) {
				break;
			}
		}

		if (global.__redis_mode && this.get_cpu_numbers() !== 1) {
			if (!global.__jx_mode) {
				this.method = "multi-processing";
			}
			else {
				this.method = "multi-threading";
			}
		}
	},

	get_method: function () {
		return this.method;
	},

	get_cpu_numbers: function () {
		return numCPUs;
	},

	get_cluster: function () {
		return cluster;
	},

	get_worker_id: function () {
		var method = this.get_method();

		if (method === "multi-processing" && cluster.worker) {
			return this.ip + ":" + cluster.worker.id;
		}
		else if (method === "multi-threading") {
			return this.ip + ":" + process.threadId;
		}
	},

	is_main: function () {
		var method = this.get_method();

		if (method === "multi-processing") {
			return cluster.isMaster;
		}
		else if (method === "multi-threading") {
			return !process.subThread;
		}
	}
}