## About

Offers various utility scripts for frequently used develop-build-deploy(dbd) tasks.

### ✅ Polyglot 🥳🥳👏👏👏

<br>

## Scripts

[//]: # (-----------------------------------------------------------------------)

<h3 style="color:orange">scripts-build</h3>

Builds on local.
<br>

#### cli options:

`--idp` : ✅ NodeJS. Install dependency packages if any to the buildDir.
<br>

[//]: # (-----------------------------------------------------------------------)

<h3 style="color:orange">scripts-clean-build</h3>

Delete(clean) build directory.

<h3 style="color:orange">scripts-clean</h3>
Delete(clean) any specified directory.

#### cli options:

`--dirPath=<dir-path>` : (**required**) directory to clean
<br>
`--ignore` : ignore patterns to delete in dirPath
<br>

[//]: # (-----------------------------------------------------------------------)

<h3 style="color:orange">scripts-buildoh</h3>

Build for current codebase on another machine. (Host machine should be running deployment service)

#### cli options:

`--downloadTo` : specify download path for the artifact zip
<br>
`--noDownload` : don't download save the artifact zip
<br>
`--deploy` : deploy the artifact zip to configured deployment server (does'nt save artifact zip)
<br>
`--idp` : Include dependency packages in the download zip. (If `--deploy` flag is set, this will add dependencyPackages
pattern to ignoreDelete in deploy API)

[//]: # (-----------------------------------------------------------------------)

<h3 style="color:orange">scripts-deploy</h3>

Deploy build to the configured deployment host

#### cli options:

`--env` : Pass the deployment environment host. (default is **dev**)
<br>
`--idp` : Pass to include dependency packages in the build zip.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
ℹ️This will remove dependencyPackages pattern to ignoreDelete in deploy API

## Configuration JSON (.scripts.config.json)

````json5
{
  // log total script time
  "profileTime": true,
  // set you deployment-service registerd app name
  "appName": "my-app",
  "deployment": {
    // ignoreDelete for deployment API
    "deploymentIgnoreDelete": [],
    // env name
    "dev": {
      "api": {
        // deployment API base URL
        "baseUrl": "http://localhost:8011"
      }
    }
  },
  "build": {
    "buildInfo": {
      /*
       This must be set to true if you use this package provided builder(ex: esbuild) to build. If not then unset it.
       (Else the build-script command will freeze)  
       ✅Currently offers builder for NodeJs esbuild bundables
      */
      "usesDbdBuilder": false,
      /*
       override build commands
       If not set to null then this commands will be used to build on `scripts-build` command
       */
      "commands": [
        "npm i"
        // ... more of ur commands
      ],
      // ✅ For NodeJs esbuild bundables only
      "bundle": {
        // non-bundable dependencies (must be listed in dependencies in package.json)
        "bundledDependencies": "*",
        // esbuild options
        "esbuildConfig": {
          "entryPoints": [
            "test/index.js"
          ],
          "minify": true,
          "bundle": true,
          "metafile": false
        }
      }
    },
    "buildoh": {
      // additional file patterns to not send for build
      "codeBaseZipIgnore": [
        "node_modules/**"
      ],
      // file patterns to not delete when cleaning the codebase before unzipping new codebase
      "cleanCodeBaseIgnoreDelete": [
        "node_modules/**",
        "dist/bundle/node_modules/**"
      ],
      "api": {
        "baseUrl": "http://localhost:8011"
        // build API base URL
      }
    },
    "buildPath": "./dist/lib",
    "dependencyPackagesFilePatterns": [
      "node_modules/**"
    ],
    // Files to not delete on clean-build command
    "cleanBuildIgnoreDelete": [
      "utils"
    ],
    // File patterns to copy to buildPath post build
    "copyFiles": [
      {
        "cwd": ".",
        "pattern": [
          "test/**/*"
        ]
      }
    ]
  }
}
````
