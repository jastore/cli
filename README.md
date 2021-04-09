jastore-cli
===========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jastore-cli.svg)](https://npmjs.org/package/jastore-cli)
[![Downloads/week](https://img.shields.io/npm/dw/jastore-cli.svg)](https://npmjs.org/package/jastore-cli)
[![License](https://img.shields.io/npm/l/jastore-cli.svg)](https://github.com/projets/jastore-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jastore-cli
$ jastore COMMAND
running command...
$ jastore (-v|--version|version)
jastore-cli/0.0.0 linux-x64 node-v14.15.4
$ jastore --help [COMMAND]
USAGE
  $ jastore COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jastore hello [FILE]`](#jastore-hello-file)
* [`jastore help [COMMAND]`](#jastore-help-command)
* [`jastore signup [FILE]`](#jastore-signup-file)

## `jastore hello [FILE]`

describe the command here

```
USAGE
  $ jastore hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ jastore hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/hello.ts)_

## `jastore help [COMMAND]`

display help for jastore

```
USAGE
  $ jastore help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `jastore signup [FILE]`

describe the command here

```
USAGE
  $ jastore signup [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/signup.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/signup.ts)_
<!-- commandsstop -->
