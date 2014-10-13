/**
 * Copyright Sung-tae Ryu, goormDev Team. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * email : contact@goorm.io
 *       : sungtae.ryu@goorm.io
 * project_name : goormIDE
 * version: 2.0.0
 **/

goorm.core.edit.find_and_replace.dialog = {
	dialog: null,

	init: function (option) {
		this.dialog = new goorm.core.dialog();
		this.dialog.init(option);

		return this;
	}
};
