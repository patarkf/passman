# Passman

Passman is a simple local password manager made with Node.js and the excellent [npm](https://www.npmjs.com/) libraries: [node-persist](https://www.npmjs.com/package/node-persist), [crypto-js](https://www.npmjs.com/package/crypto-js) and [yargs](https://www.npmjs.com/package/yargs). 

This little guy has the intent to offer a minimal and secure alternative to store passwords locally, using only a Linux bash, Node.js and some simple commands. 

## A little explanation

Passman has a simple workflow to save and fetch your accounts. To create an account, it receives the parameters, encrypts the content within the master password and generates a hash, after that, just saves that hash in a file (the only way to read this hash is by having the master password). To get an account, it just receives of the user the name and the master password that the user has created for it, then it decrypts the hash and transform the content in a string to the user can reads it.

For more details see the examples session below.

## Examples

Passman currently works with two major commands: ``create`` and ``get``. The workflow is very simple, as we can see on the explanation below.

### Create method

To store a new password the user has to use the ``create`` command and set some important parameters to help the application to knows exactly what it has to save. 

```
$ nodejs app.js create -n Facebook -u myusername@test.com -p pass123 -m mymasterpass2016
```

To see the list of acceptable parameters that ``create`` supports and requires the user can runs: 

```
$ nodejs app.js create --help
```

A similar list will be displayed:

```
  --name, -n            Your account name goes here          [string] [required]
  --username, -u        Your username goes here              [string] [required]
  --password, -p        Your password goes here              [string] [required]
  --masterPassword, -m  Master password                      [string] [required]
  --help                Show help                                      [boolean]
```

### Get method

To fetch a specific account the user must runs the ``get`` command and set the name of the account and his master password.

```
$ nodejs app.js get -n Facebook -m mymasterpass2016
```

To see the list of acceptable parameters that ``get`` supports the user can runs: 

```
$ nodejs app.js get --help
```

A similar list will be displayed:

```
  --name, -n            Your account name goes here          [string] [required]
  --masterPassword, -m  Master password                      [string] [required]
  --help                Show help                                      [boolean]
```



## License

 See the [LICENSE](https://github.com/patarkf/passman/blob/master/LICENSE). file for license rights and limitations (MIT).
