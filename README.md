# grunt-superjoin

Grunt plugin for superjoin the module loader for the web

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-superjoin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-superjoin');
```

## The "superjoin" task

### Overview
In your project's Gruntfile, add a section named `superjoin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  superjoin: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.dev
Type: `String`
Default value: `false`

Enables develop mode. Superjoin loads local modules automatically by using XHR if it isn't within the bundle. Use this flag in develop mode only.

#### option.root
Type: `String`
Default value: Same folder where the Gruntfile.js file is. 

Changes the default web root folder. For example if you store all public files under public, then set this flag to `public/`

#### option.banner
Type: `String`
Default value: ''

Adds a banner at the beginning of the bundle.

Example:
```js
grunt.initConfig({
  pkg: grunt.readJSON('package.json'),
  superjoin: {
    dist: {
      options: {
        banner: '/*!\n * My Superbundle v<%= pkg.version %>\n */'
      }
    }
  }
});
```

Produces:

```js
/*!
 * My Superbundle v0.1.0
 */

 <bundle code goes here ...>
```


### Params

#### src
Type: `Array|String`

Configures all required modules. If this property is not present, then Superjoin tries to read the files configuration from a superjoin.json or package.json file

#### dest
Type: `String`
Default: `<%= pkg.name %>.js`

Defines the filename for the output file

### Usage Examples

This example loads `jquery` from node_modules folder and and `module1.js` and `module2.js` from public/src/ folder
The project root is set per default to the folder where your Gruntfile.js file is. To change the public root folder, set the `root` option.
Superjoin creates a bundle of all these modules and writes it to `public/mybundle.js`

Local modules must start with `./` otherwise superjoin looks in node_modules folder for that module.


```js
grunt.initConfig({
  superjoin: {
    dist: {
      options: {
        root: 'public/'
      },
      src: ['jquery', './src/module1.js', './src/module2.js'],
      dest: 'mybundle.js'
    }
  }
});
```

### superjoin.json

Superjoin looks for a superjoin.json file in your project dir. If no file was found it looks into the package.json file for a superjoin property. You can use one of this methods to define your module paths. 

More about [superjoin.json](https://superjoinjs.com/docs.html)

Superjoin looks for a file in this order

```
<project root>/<web root>/superjoin.json
<project root>/superjoin.json
<project root>/package.json (using the superjoin property)
```

A Gruntfile configuration overrides a Superjoin config property. For example, if a Superjoin `files` option was found and the `src` property in the Gruntfile was set, then the Gruntfile property will be used.
