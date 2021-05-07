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
* [`jastore help [COMMAND]`](#jastore-help-command)
* [`jastore login [FILE]`](#jastore-login-file)
* [`jastore namespace [FILE]`](#jastore-namespace-file)
* [`jastore namespace:create [FILE]`](#jastore-namespacecreate-file)
* [`jastore namespace:current [NAMESPACE]`](#jastore-namespacecurrent-namespace)
* [`jastore namespace:endpoints [FILE]`](#jastore-namespaceendpoints-file)
* [`jastore namespace:list [FILE]`](#jastore-namespacelist-file)
* [`jastore profile [FILE]`](#jastore-profile-file)
* [`jastore reset [FILE]`](#jastore-reset-file)
* [`jastore resource:create [RESOURCENAME]`](#jastore-resourcecreate-resourcename)
* [`jastore resource:get RESOURCE`](#jastore-resourceget-resource)
* [`jastore resource:list [FILE]`](#jastore-resourcelist-file)
* [`jastore resource:sync [FOLDER]`](#jastore-resourcesync-folder)
* [`jastore signup [FILE]`](#jastore-signup-file)
* [`jastore status [FILE]`](#jastore-status-file)

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

## `jastore login [FILE]`

Log in to manage the namespaces and resources associated to your user.

```
USAGE
  $ jastore login [FILE]
```

_See code: [src/commands/login.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/login.ts)_

## `jastore namespace [FILE]`

describe the command here

```
USAGE
  $ jastore namespace [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/namespace.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace.ts)_

## `jastore namespace:create [FILE]`

Create a new namespace

```
USAGE
  $ jastore namespace:create [FILE]

ALIASES
  $ jastore namespaces:create
```

_See code: [src/commands/namespace/create.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/create.ts)_

## `jastore namespace:current [NAMESPACE]`

Prints the currently selected namespace

```
USAGE
  $ jastore namespace:current [NAMESPACE]

ALIASES
  $ jastore namespaces:current
```

_See code: [src/commands/namespace/current.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/current.ts)_

## `jastore namespace:endpoints [FILE]`

List endpoints for a namespace

```
USAGE
  $ jastore namespace:endpoints [FILE]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore namespaces:endpoints
  $ jastore endpoints
```

_See code: [src/commands/namespace/endpoints.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/endpoints.ts)_

## `jastore namespace:list [FILE]`

List the namespaces you have access to.

```
USAGE
  $ jastore namespace:list [FILE]

ALIASES
  $ jastore namespaces:list
  $ jastore namespaces
```

_See code: [src/commands/namespace/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/list.ts)_

## `jastore profile [FILE]`

Print the current user profile

```
USAGE
  $ jastore profile [FILE]
```

_See code: [src/commands/profile.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/profile.ts)_

## `jastore reset [FILE]`

Reset all local data

```
USAGE
  $ jastore reset [FILE]
```

_See code: [src/commands/reset.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/reset.ts)_

## `jastore resource:create [RESOURCENAME]`

describe the command here

```
USAGE
  $ jastore resource:create [RESOURCENAME]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -s, --schema=schema        path to json schema file
```

_See code: [src/commands/resource/create.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/create.ts)_

## `jastore resource:get RESOURCE`

print details about a resource

```
USAGE
  $ jastore resource:get RESOURCE

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:get
  $ jastore resource
  $ jastore resources
```

_See code: [src/commands/resource/get.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/get.ts)_

## `jastore resource:list [FILE]`

list all resources in a namespace

```
USAGE
  $ jastore resource:list [FILE]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:list
  $ jastore resources
  $ jastore resource
```

_See code: [src/commands/resource/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/list.ts)_

## `jastore resource:sync [FOLDER]`

Sync a folder containing resources and schemas

```
USAGE
  $ jastore resource:sync [FOLDER]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:sync
  $ jastore sync
```

_See code: [src/commands/resource/sync.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/sync.ts)_

## `jastore signup [FILE]`

Sign up to jastore to create permanent stores and link the resources you create to your user

```
USAGE
  $ jastore signup [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/signup.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/signup.ts)_

## `jastore status [FILE]`

Print the current status of jastore

```
USAGE
  $ jastore status [FILE]
```

_See code: [src/commands/status.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/status.ts)_
<!-- commandsstop -->
