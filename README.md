Jastore CLI
===========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jastore.svg)](https://npmjs.org/package/jastore)
[![Downloads/week](https://img.shields.io/npm/dw/jastore.svg)](https://npmjs.org/package/jastore)
[![License](https://img.shields.io/npm/l/jastore.svg)](https://github.com/projets/jastore/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @jastore/cli
$ jastore COMMAND
running command...
$ jastore (-v|--version|version)
@jastore/cli/0.1.1 linux-x64 node-v14.15.4
$ jastore --help [COMMAND]
USAGE
  $ jastore COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jastore access:create`](#jastore-accesscreate)
* [`jastore access:delete ACCESS`](#jastore-accessdelete-access)
* [`jastore access:list`](#jastore-accesslist)
* [`jastore groups:add-user`](#jastore-groupsadd-user)
* [`jastore groups:create GROUP`](#jastore-groupscreate-group)
* [`jastore groups:list`](#jastore-groupslist)
* [`jastore help [COMMAND]`](#jastore-help-command)
* [`jastore login`](#jastore-login)
* [`jastore namespace:clean`](#jastore-namespaceclean)
* [`jastore namespace:create [ALIAS]`](#jastore-namespacecreate-alias)
* [`jastore namespace:current [NAMESPACE]`](#jastore-namespacecurrent-namespace)
* [`jastore namespace:endpoints`](#jastore-namespaceendpoints)
* [`jastore namespace:get [NAMESPACE]`](#jastore-namespaceget-namespace)
* [`jastore namespace:list`](#jastore-namespacelist)
* [`jastore namespace:set`](#jastore-namespaceset)
* [`jastore pages`](#jastore-pages)
* [`jastore profile`](#jastore-profile)
* [`jastore reset`](#jastore-reset)
* [`jastore resource:create [RESOURCENAME]`](#jastore-resourcecreate-resourcename)
* [`jastore resource:get RESOURCE`](#jastore-resourceget-resource)
* [`jastore resource:list [RESOURCE]`](#jastore-resourcelist-resource)
* [`jastore resource:set RESOURCE`](#jastore-resourceset-resource)
* [`jastore resource:sync [FOLDER]`](#jastore-resourcesync-folder)
* [`jastore signup`](#jastore-signup)
* [`jastore status`](#jastore-status)
* [`jastore user:create EMAIL`](#jastore-usercreate-email)
* [`jastore user:delete EMAIL`](#jastore-userdelete-email)
* [`jastore user:get [EMAIL]`](#jastore-userget-email)
* [`jastore user:groups [EMAIL]`](#jastore-usergroups-email)
* [`jastore user:list`](#jastore-userlist)

## `jastore access:create`

Give a group of user access to a resource.

```
USAGE
  $ jastore access:create

OPTIONS
  -R, --restrictions=restrictions  restriction to apply on the resource for that group (this options can be repeated -
                                   restrictions are additive)

  -a, --allow=allow                (required) rights to give to this user group for that resource. Allowed values: a mix
                                   of the letters C (create), R (read), U (updated), D (delete)

  -g, --group=group                (required) user group name

  -n, --namespace=namespace        namespace code, (default to current namespace)

  -r, --resource=resource          (required) resource name

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

_See code: [src/commands/access/create.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/access/create.ts)_

## `jastore access:delete ACCESS`

Delete an access control record

```
USAGE
  $ jastore access:delete ACCESS

ARGUMENTS
  ACCESS  uuid of the access-control record to delete

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/access/delete.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/access/delete.ts)_

## `jastore access:list`

List the resources accessible for each user group

```
USAGE
  $ jastore access:list

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/access/list.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/access/list.ts)_

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

_See code: [src/commands/groups/add-user.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/groups/add-user.ts)_

## `jastore groups:create GROUP`

Create an empty user group

```
USAGE
  $ jastore groups:create GROUP

ARGUMENTS
  GROUP  name of the group you want to create

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore group:create

EXAMPLE
  jastore groups:create mygroup
```

_See code: [src/commands/groups/create.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/groups/create.ts)_

## `jastore groups:list`

List user groups for a particular namespace

```
USAGE
  $ jastore groups:list

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/groups/list.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/groups/list.ts)_

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

## `jastore login`

Log in to manage the namespaces and resources associated to your user.

```
USAGE
  $ jastore login

OPTIONS
  -e, --email=email        alias for --user
  -h, --help               show CLI help
  -p, --password=password  Password (if empty, we will prompt you for it)
  -u, --user=user          Username (email)
```

_See code: [src/commands/login.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/login.ts)_

## `jastore namespace:clean`

Clean available namespace list

```
USAGE
  $ jastore namespace:clean

OPTIONS
  -f, --force  Remove all unused namespaces, even the current one
  -h, --help   show CLI help

ALIASES
  $ jastore namespaces:clean
  $ jastore clean
```

_See code: [src/commands/namespace/clean.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/clean.ts)_

## `jastore namespace:create [ALIAS]`

Create a new namespace

```
USAGE
  $ jastore namespace:create [ALIAS]

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ jastore namespaces:create
```

_See code: [src/commands/namespace/create.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/create.ts)_

## `jastore namespace:current [NAMESPACE]`

Set current namespace

```
USAGE
  $ jastore namespace:current [NAMESPACE]

ALIASES
  $ jastore namespaces:current
  $ jastore namespace:current
  $ jastore current
  $ jastore use
  $ jastore namespace:use
  $ jastore namespace
  $ jastore ns
  $ jastore ns:current
  $ jastore ns:use
```

_See code: [src/commands/namespace/current.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/current.ts)_

## `jastore namespace:endpoints`

List endpoints for a namespace

```
USAGE
  $ jastore namespace:endpoints

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore namespaces:endpoints
  $ jastore endpoints
```

_See code: [src/commands/namespace/endpoints.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/endpoints.ts)_

## `jastore namespace:get [NAMESPACE]`

Display details about a namespace

```
USAGE
  $ jastore namespace:get [NAMESPACE]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore namespaces:get
  $ jastore ns:get
```

_See code: [src/commands/namespace/get.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/get.ts)_

## `jastore namespace:list`

List the namespaces you have access to.

```
USAGE
  $ jastore namespace:list

ALIASES
  $ jastore namespaces:list
  $ jastore namespaces
```

_See code: [src/commands/namespace/list.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/list.ts)_

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

_See code: [src/commands/namespace/set.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/namespace/set.ts)_

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

_See code: [src/commands/pages.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/pages.ts)_

## `jastore profile`

Print your user profile

```
USAGE
  $ jastore profile
```

_See code: [src/commands/profile.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/profile.ts)_

## `jastore reset`

Reset all local data

```
USAGE
  $ jastore reset

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/reset.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/reset.ts)_

## `jastore resource:create [RESOURCENAME]`

Create a resource in a namespace

```
USAGE
  $ jastore resource:create [RESOURCENAME]

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -s, --schema=schema        inline json or path to json schema file
  -y, --yes                  do not prompt for confirmation before creating the resource

ALIASES
  $ jastore resources:create
  $ jastore rs:create
```

_See code: [src/commands/resource/create.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/resource/create.ts)_

## `jastore resource:get RESOURCE`

Display details about a resource

```
USAGE
  $ jastore resource:get RESOURCE

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:get
  $ jastore rs:get
```

_See code: [src/commands/resource/get.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/resource/get.ts)_

## `jastore resource:list [RESOURCE]`

List all resources in a namespace

```
USAGE
  $ jastore resource:list [RESOURCE]

ARGUMENTS
  RESOURCE  (optional) resource name (if present, this command will print the details about this resource instead of the
            list of all resources)

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore resources:list
  $ jastore rs
  $ jastore rs:list

EXAMPLES
  # List all resources in current namespace:
  npx jastore resource:list
  # Alias:
  npx jastore resources:list
  npx jastore rs:list
  npx jastore rs

  # Print details about a resource (alias for the resource:get command):
  npx jastore rs [resource_name]
```

_See code: [src/commands/resource/list.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/resource/list.ts)_

## `jastore resource:set RESOURCE`

Modify a resource's schema

```
USAGE
  $ jastore resource:set RESOURCE

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -s, --schema=schema        json chema or path of the json schema file to use as the json schema for that resource

ALIASES
  $ jastore resources:set
  $ jastore rs:set

EXAMPLES
  # Update a resource's schema (with an inline schema):
  npx jastore resource:set [resource_name] --schema '{ "properties": { "title" : { "type" : "string" } }}'

  # Update a resource's schema (from a json file):
  npx jastore resource:set [resource_name] --schema ./schemas/my.schema.json

  # Update a resource in another namespace
  npx jastore resource:set [resource_name] --namespace [namespace_code] --schema ./schemas/my.schema.json

  # Short command:
  npx jastore rs:set [resource_name] -n [namespace_code] -s ./schemas/my.schema.json
```

_See code: [src/commands/resource/set.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/resource/set.ts)_

## `jastore resource:sync [FOLDER]`

Sync a folder containing resources and schemas

```
USAGE
  $ jastore resource:sync [FOLDER]

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)
  --dry-run                  output the operation that are going to be performed, without actualy performing them

ALIASES
  $ jastore resources:sync
  $ jastore sync
  $ jastore rs:sync
```

_See code: [src/commands/resource/sync.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/resource/sync.ts)_

## `jastore signup`

Sign up to jastore to create permanent stores and link the resources you create to your user

```
USAGE
  $ jastore signup

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/signup.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/signup.ts)_

## `jastore status`

Print the current status of jastore

```
USAGE
  $ jastore status

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/status.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/status.ts)_

## `jastore user:create EMAIL`

Create a new user in a namespace

```
USAGE
  $ jastore user:create EMAIL

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -p, --password=password    (required) password

ALIASES
  $ jastore users:create

EXAMPLE
  npx jastore user:create user@email.com --password userpassword
```

_See code: [src/commands/user/create.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/user/create.ts)_

## `jastore user:delete EMAIL`

delete a new user from a namespace

```
USAGE
  $ jastore user:delete EMAIL

OPTIONS
  -h, --help                 show CLI help
  -n, --namespace=namespace  namespace code, (default to current namespace)

ALIASES
  $ jastore users:create

EXAMPLE
  npx jastore user:delete user@email.com
```

_See code: [src/commands/user/delete.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/user/delete.ts)_

## `jastore user:get [EMAIL]`

Display informations about a particular user in a namespace

```
USAGE
  $ jastore user:get [EMAIL]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/user/get.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/user/get.ts)_

## `jastore user:groups [EMAIL]`

List the groups a user is part of

```
USAGE
  $ jastore user:groups [EMAIL]

OPTIONS
  -n, --namespace=namespace  namespace code, (default to current namespace)
```

_See code: [src/commands/user/groups.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/user/groups.ts)_

## `jastore user:list`

list users in a namespace

```
USAGE
  $ jastore user:list

OPTIONS
  -h, --help                 show CLI help
  -l, --limit=limit          max number of resuts to return
  -n, --namespace=namespace  namespace code, (default to current namespace)
  -n, --offset=offset        results offset
  -n, --sort=sort            column to sort the results by

ALIASES
  $ jastore users:list

EXAMPLES
  npx jastore user:list
  npx jastore user:list --limit 10 --offset 20
  npx jastore user:list --limit 10 --offset 20 --sort email,desc
```

_See code: [src/commands/user/list.ts](https://github.com/jastore/cli/blob/v0.1.1/src/commands/user/list.ts)_
<!-- commandsstop -->
