var core = require('./core');

if (core.getCommand() === 'create') {
	try {
		var createdAccount = core.createAccount({
			name: core.getArgv().name,
			username: core.getArgv().username,
			password: core.getArgv().password
		}, core.getArgv().masterPassword);

		console.log('Account created!');
		console.log(createdAccount);
	} catch(e) {
		console.log('Unable to create account');
	}
}

if (core.getCommand() === 'get') {
	try {
		var fetchedAccount = core.getAccount(
			core.getArgv().name, 
			core.getArgv().masterPassword
		);
	
		if (typeof fetchedAccount === 'undefined') {
			console.log('Account not found');
		} else {
			console.log('Account found');
			console.log(fetchedAccount);
		}
	} catch(e) {
		console.log('Unable to fetch account');
	}
}