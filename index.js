'use strict';

/**
 * Node Modules
 */
const debug = require('debug')('Index');

/**
 * Local Modules
 */
const Application = require('./core/application.js');

if (Application.getCommand() === 'create') {
	try {
		let createdAccount = Application.createAccount({
			name: Application.getArgv().name,
			username: Application.getArgv().username,
			password: Application.getArgv().password
		}, Application.getArgv().masterPassword);

		debug('Account created!');
		debug(createdAccount);
	} catch(e) {
		debug('Unable to create account');
		debug(e);
	}
}

if (Application.getCommand() === 'get') {
	try {
		let fetchedAccount = Application.getAccount(
			Application.getArgv().name, 
			Application.getArgv().masterPassword
		);
	
		if (typeof fetchedAccount === 'undefined') {
			debug('Account not found');
		} else {
			debug('Account found');
			debug(fetchedAccount);
		}
	} catch(e) {
		debug('Unable to fetch account');
		debug(e);
	}
}