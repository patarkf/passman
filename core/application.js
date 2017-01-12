'use strict';

/**
 * Node Modules
 */
const argv = require('yargs')
	.command('create', 'Create an account', function (yargs) {
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
	.command('get', 'Get a specific account', function (yargs) {
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
	
const crypto = require('crypto-js');
const storage = require('node-persist');
const debug = require('debug')('Application');

/**
 * Class Application
 * 
 * @author  Patrick Ferreira <paatrickferreira@gmail.com>
 * @package Core
 */
class Application {

	/**
	 * Class Constructor
	 * 
	 * Initializes the 
	 */
	constructor() {
		this.command = argv._[0];

		storage.initSync();
	}

	/**
	 * Returns the submited command by the user.
	 * 
	 * @return {String} Name of the command.
	 */
	getCommand() {
		return this.command;
	}

	/**
 	* Returns the yargs object. 

 	* @return {Object} Yargs object.
 	*/
	getArgv() {
		return argv;
	}

	/**
	 * Fetches all accounts, decrypts them and finally returns the fetched accounts.
	 * 
	 * @param  {String} masterPassword The secret key to decrypt the accounts data.
	 * @return {Array} Array of accounts objects decrypted.
	 */
	getAccounts(masterPassword) {
		let encryptedAccount = storage.getItemSync('accounts');
		let accounts = [];

		if (typeof encryptedAccount !== 'undefined') {
			let bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
			accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
		}

		return accounts;
	}

	/**
	 * Encrypts and stores the array of accounts with the new account.
	 * 
	 * @param  {Array} accounts Array of accounts objects.
	 * @param  {String} masterPassword The secret key to encrypt the accounts data.
	 * @return {Array} Array of accounts objects encrypted.
	 */
	saveAccounts(accounts, masterPassword) {
		let encryptedAccounts = crypto.AES.encrypt(
			JSON.stringify(accounts),
			masterPassword
		);

		storage.setItemSync('accounts', encryptedAccounts.toString());

		return accounts;
	}

	/**
	 * Fetches the accounts object array and push a new one.
	 * 
	 * @param  {Object} account Account object containing name, username and pass.
	 * @param  {String} masterPassword The secret key to encrypt the accounts data.
	 * @return {Object} Account object containing name, username and pass.
	 */
	createAccount(account, masterPassword) {
		let accounts = this.getAccounts(masterPassword);

		accounts.push(account);
		this.saveAccounts(accounts, masterPassword);

		return account;
	}

	/**
	 * Fetches a specific account based on his name.
	 * 
	 * @param  {String} accountName The account name.
	 * @param  {String} masterPassword The secret key to decrypt the accounts data.
	 * @return {Object} Account object containing name, username and pass.
	 */
	getAccount(accountName, masterPassword) {
		let accounts = this.getAccounts(masterPassword);
		let matchedAccount;

		accounts.forEach(function (account) {
			if (account.name === accountName) {
				matchedAccount = account;
			}
		});

		return matchedAccount;
	}
}

module.exports = new Application();