## About

Offers various utility scripts for frequently used develop-build-deploy(dbd) tasks.

### Supported code base types

- NodeJs
- ReactJs

## Scripts

<h3 style="color:orange">scripts-bundle</h3>
Bundles nodeJs app. Install non-bundle-able packages to the bundleDir using `--ibd` flag.
<br>

<h3 style="color:orange">scripts-clean-dist</h3>
Delete(clean) dist/bundle directory.

<h3 style="color:orange">scripts-clean</h3>
Delete(clean) any specified directory.  
Pass `--dirPath=<dir-path>` as the directory to clean.

<h3 style="color:orange">scripts-buildoh</h3>

Build for current codebase on another machine. (Host machine should be running deployment service)

#### cli options:

`--downloadTo` : specify download path for the artifact zip
<br>
`--noDownload` : don't download save the artifact zip
<br>
`--deploy` : deploy the artifact zip to configured deployment server (does'nt save artifact zip)

<h3 style="color:orange">scripts-deploy</h3>

Deploy bundle to the configured deployment host

#### cli options:

`--env` : Pass the deployment environment host. (default is **dev**)
<br>
`--ibd` : ✅<span style="color:orange">NodeJs.</span> Pass to include *node_modules* in the bundle zip.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
ℹ️This will add node_modules in the deleteIgnore in the deploy API body

## Configuration JSON (.scripts.config.json)

````json
{
  "profileTime": true, //log total script time
  "appName": "my-app", //set you deployment-service registerd app name
  "bundle": {
    "bundlePath": "./dist/bundle",
    "bundledDependencies": "*", //non-bundable dependencies (must be listed in dependencies in package.json)
    "esbuildConfig": { //esbuild options
      "entryPoints": [
        "test/index.js"
      ],
      "minify": true,
      "bundle": true,
      "metafile": false
    },
    "cleanBundleIgnoreDelete": [],
    "copyFiles": [ //File patterns to copy to bundlePath post bundle
      {
        "cwd": "config",
        "pattern": [
          "**/*"
        ]
      },
      {
        "cwd": "src",
        "ignore": [
          "**/*.test.js",
          "**/*.test.ts"
        ]
      }
    ]
  },
  "deploy": {
    "deploymentIgnoreDelete": [], //ignoreDelete for deployment API
    "dev": { //env name
      "api": {
        "baseUrl": "http://localhost:8011" //deployment API base URL
      }
    }
  }
  "buildoh": {
    "codeBaseZipIgnore": [] //additional file patterns to not send for build
    "api": {
      "baseUrl": "http://localhost:8011" //build API base URL
    },
    "buildInfo": {
      "commands" : [ //override build commands
            "npm i --include=dev --legacy-peer-deps",
            "npm run test",
            "npm run build"
      ]
    }
  }
}
