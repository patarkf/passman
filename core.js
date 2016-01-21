console.log('Starting Password Manager');

var argv = require('yargs')
	.command('create', 'Create an account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your account name goes here',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: 'Your username goes here',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Your password goes here',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		}).help('help')
	})
	.command('get', 'Get a specific account', function(yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your account name goes here'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				description: 'Master password',
				type: 'string'
			}
		})
	})
	.help('help')
	.argv;

var crypto  = require('crypto-js');
var storage = require('node-persist');
var command = argv._[0];
storage.initSync();


/**
 * Return the command that was submited by the user.
 * @return {string} The name of the command.
 */
exports.getCommand = function() {
	return command;
}

/**
 * Return the yargs object.
 * @return {object} The yargs object.
 */
exports.getArgv = function() {
	return argv;
}

/**
 * Fetches all accounts, decrypts them and finally returns the fetched accounts.
 * @param  {string} masterPassword The secret key to decrypt the accounts data.
 * @return {object array} Array of accounts objects decrypted.
 */
exports.getAccounts = function(masterPassword) {
	var encryptedAccount = storage.getItemSync('accounts');
	var accounts = [];

	if (typeof encryptedAccount !== 'undefined') {
		var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
		accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	return accounts;
}

/**
 * Encrypts and stores the array of accounts with the new account.
 * @param  {object array} accounts Array of accounts objects.
 * @param  {string} masterPassword The secret key to encrypt the accounts data.
 * @return {object array} Array of accounts objects encrypted.
 */
exports.saveAccounts = function(accounts, masterPassword) {
	var encryptedAccounts = crypto.AES.encrypt(
		JSON.stringify(accounts), 
		masterPassword
	);
	storage.setItemSync('accounts', encryptedAccounts.toString());

	return accounts;
}

/**
 * Fetches the accounts object array and push a new one.
 * @param  {object} account Account object containing name, username and pass.
 * @param  {string} masterPassword The secret key to encrypt the accounts data.
 * @return {object} Account object containing name, username and pass.
 */
exports.createAccount = function(account, masterPassword) {
	var accounts = this.getAccounts(masterPassword);

	accounts.push(account);
	this.saveAccounts(accounts, masterPassword);

	return account;
}

/**
 * Fetches a specific account based on his name.
 * @param  {string} accountName The account name.
 * @param  {string} masterPassword The secret key to decrypt the accounts data.
 * @return {object} Account object containing name, username and pass.
 */
exports.getAccount = function(accountName, masterPassword) {
	var accounts = this.getAccounts(masterPassword);
	var matchedAccount;

	accounts.forEach(function(account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});
	return matchedAccount;
}