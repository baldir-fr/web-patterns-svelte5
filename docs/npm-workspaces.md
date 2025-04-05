# npm workspaces


Run command in sub workspace from parent :

```shell
npm run dev --workspace=full-demo
```


## Configuration

Find all workspaces in `package` folder.

In `package.json`

```json
{
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}
```

Example of workspaces in `package` folder

```json
.
└── packages
    ├── some-module
    └── full-demo

```