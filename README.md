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
* [`jastore access`](#jastore-access)
* [`jastore access:create`](#jastore-accesscreate)
* [`jastore access:delete ACCESS`](#jastore-accessdelete-access)
* [`jastore access:list`](#jastore-accesslist)
* [`jastore groups`](#jastore-groups)
* [`jastore groups:add-user`](#jastore-groupsadd-user)
* [`jastore groups:create GROUP`](#jastore-groupscreate-group)
* [`jastore groups:list`](#jastore-groupslist)
* [`jastore help [COMMAND]`](#jastore-help-command)
* [`jastore login [FILE]`](#jastore-login-file)
* [`jastore namespace`](#jastore-namespace)
* [`jastore namespace:clean [FILE]`](#jastore-namespaceclean-file)
* [`jastore namespace:create [FILE]`](#jastore-namespacecreate-file)
* [`jastore namespace:current [NAMESPACE]`](#jastore-namespacecurrent-namespace)
* [`jastore namespace:endpoints [FILE]`](#jastore-namespaceendpoints-file)
* [`jastore namespace:get [FILE]`](#jastore-namespaceget-file)
* [`jastore namespace:list`](#jastore-namespacelist)
* [`jastore namespace:set`](#jastore-namespaceset)
* [`jastore pages`](#jastore-pages)
* [`jastore profile [FILE]`](#jastore-profile-file)
* [`jastore reset [FILE]`](#jastore-reset-file)
* [`jastore resource`](#jastore-resource)
* [`jastore resource:create [RESOURCENAME]`](#jastore-resourcecreate-resourcename)
* [`jastore resource:get RESOURCE`](#jastore-resourceget-resource)
* [`jastore resource:list`](#jastore-resourcelist)
* [`jastore resource:set RESOURCE`](#jastore-resourceset-resource)
* [`jastore resource:sync [FOLDER]`](#jastore-resourcesync-folder)
* [`jastore signup [FILE]`](#jastore-signup-file)
* [`jastore status [FILE]`](#jastore-status-file)
* [`jastore user`](#jastore-user)
* [`jastore user:get [USER]`](#jastore-userget-user)
* [`jastore user:groups [USER]`](#jastore-usergroups-user)

## `jastore access`

Manage access control

```
USAGE
  $ jastore access
```

_See code: [src/commands/access.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/access.ts)_

## `jastore access:create`

Give a group of user access to a resource.

```
USAGE
  $ jastore access:create

OPTIONS
  -a, --allow=allow          (required) rights to give to this user group for that resource. Allowed values: a mix of
                             the letters C (create), R (read), U (updated), D (delete)

  -g, --group=group          (required) user group name

  -n, --namespace=namespace  namespace code, (default to current namespace)

  -r, --resource=resource    (required) resource name

DESCRIPTION
  Before you using this command, you must have configured some user groups for this namespace.
  To list available user groups and create new ones, try this command:
       jastore groups:list

EXAMPLES
  # Allow everybody to read access on the "books" resource:
  jastore access:create -r books -g public -a C

  # Allow everybody the group named "admin" all access (Create, Read, Update, Delete) to the resource named "books"
  jastore access:create -g admin -r books -a CRUD
```

_See code: [src/commands/access/create.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/access/create.ts)_

## `jastore access:delete ACCESS`

Delete an access control record

```
USAGE
  $ jastore access:delete ACCESS

ARGUMENTS
  ACCESS  uuid of the access-control record to delete

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -r, --resource=resource    (required) resource name
```

_See code: [src/commands/access/delete.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/access/delete.ts)_

## `jastore access:list`

List the resources accessible for each user group

```
USAGE
  $ jastore access:list

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/access/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/access/list.ts)_

## `jastore groups`

Manage user groups

```
USAGE
  $ jastore groups

ALIASES
  $ jastore group
```

_See code: [src/commands/groups.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/groups.ts)_

## `jastore groups:add-user`

Add a user to a group

```
USAGE
  $ jastore groups:add-user

OPTIONS
  -g, --group=group          name of the group
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -u, --user=user            email of the user
```

_See code: [src/commands/groups/add-user.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/groups/add-user.ts)_

## `jastore groups:create GROUP`

Create an empty user group

```
USAGE
  $ jastore groups:create GROUP

ARGUMENTS
  GROUP  name of the group you want to create

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

EXAMPLE
  jastore groups:create mygroup
```

_See code: [src/commands/groups/create.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/groups/create.ts)_

## `jastore groups:list`

List user groups for a particular namespace

```
USAGE
  $ jastore groups:list

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/groups/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/groups/list.ts)_

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

## `jastore namespace`

Manage namespaces

```
USAGE
  $ jastore namespace

ALIASES
  $ jastore namespaces
```

_See code: [src/commands/namespace.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace.ts)_

## `jastore namespace:clean [FILE]`

describe the command here

```
USAGE
  $ jastore namespace:clean [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/namespace/clean.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/clean.ts)_

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

Set current namespace

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

## `jastore namespace:get [FILE]`

Display informations about a namespace

```
USAGE
  $ jastore namespace:get [FILE]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/namespace/get.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/get.ts)_

## `jastore namespace:list`

List the namespaces you have access to.

```
USAGE
  $ jastore namespace:list

ALIASES
  $ jastore namespaces:list
  $ jastore namespaces
```

_See code: [src/commands/namespace/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/list.ts)_

## `jastore namespace:set`

Set options of a namespace

```
USAGE
  $ jastore namespace:set

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -o, --option=option        set an option for this namespace
  -t, --name=name            set namespace name (alias)

EXAMPLES
  $ jastore namespace:set -o key:value
  $ jastore namespace:set -n newname
  $ jastore namespace:set -n newname -o key1:value1 -o key2:value2
```

_See code: [src/commands/namespace/set.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/namespace/set.ts)_

## `jastore pages`

List available auto-generated pages for a namespace

```
USAGE
  $ jastore pages

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore page
```

_See code: [src/commands/pages.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/pages.ts)_

## `jastore profile [FILE]`

Print your user profile

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

## `jastore resource`

Manage resources

```
USAGE
  $ jastore resource

ALIASES
  $ jastore resources
```

_See code: [src/commands/resource.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource.ts)_

## `jastore resource:create [RESOURCENAME]`

create a resource in a namespace

```
USAGE
  $ jastore resource:create [RESOURCENAME]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -s, --schema=schema        path to json schema file
```

_See code: [src/commands/resource/create.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/create.ts)_

## `jastore resource:get RESOURCE`

Display details about a resource

```
USAGE
  $ jastore resource:get RESOURCE

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:get
```

_See code: [src/commands/resource/get.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/get.ts)_

## `jastore resource:list`

list all resources in a namespace

```
USAGE
  $ jastore resource:list

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:list
  $ jastore resources
  $ jastore resource
```

_See code: [src/commands/resource/list.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/list.ts)_

## `jastore resource:set RESOURCE`

modify a resource

```
USAGE
  $ jastore resource:set RESOURCE

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -s, --schema=schema        path of the json schema file to use as the json schema for that resource
```

_See code: [src/commands/resource/set.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/resource/set.ts)_

## `jastore resource:sync [FOLDER]`

Sync a folder containing resources and schemas

```
USAGE
  $ jastore resource:sync [FOLDER]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
  --dry-run                  output the operation that are going to be performed, without actualy performing them

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

## `jastore user`

Manage namespace users

```
USAGE
  $ jastore user
```

_See code: [src/commands/user.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/user.ts)_

## `jastore user:get [USER]`

Display informations about a user in a namespace

```
USAGE
  $ jastore user:get [USER]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/user/get.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/user/get.ts)_

## `jastore user:groups [USER]`

List the groups a user is part of

```
USAGE
  $ jastore user:groups [USER]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/user/groups.ts](https://github.com/projets/jastore-cli/blob/v0.0.0/src/commands/user/groups.ts)_
<!-- commandsstop -->
