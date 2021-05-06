# deno を使ってみる

# 環境構築
基本的に deno では package.json や node_module は必要なく、 golang のように import 時に直接 url を指定することで、実行時にダウンロードを行い、結果はキャッシュされる。

例
``` typescript
import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
```

しかし、 typescript と typescript-deno-plugin だけ開発用にインスコすることで、開発がしやすくなる。

cf. [deno\-init/cmd\.ts at master · uki00a/deno\-init](https://github.com/uki00a/deno-init/blob/master/cmd.ts)

## 直接 インストールしたパッケージを指定する方法

``` shell
$ deno --version
deno 1.9.2 (release, x86_64-apple-darwin)
v8 9.1.269.5
typescript 4.2.2

$ deno types > deno1.9.2.d.ts
```

tsconfig.json

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "deno": [
        "deno1.9.2.d.ts"
      ],
      "https://*": [
        "/Users/joishi/Library/Caches/deno/deps/https/*"
      ],
      "http://*": [
        "/Users/joishi/Library/Caches/deno/deps/http/*"
      ]
    }
  }
}
```

``` typescript
import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

``` shell
deno cache https://deno.land/std@0.95.0/http/server.ts
# or $ deno cache src/index.ts

$ deno run --allow-net src/index.ts
```

- [\[2019年2月版\] deno の使い方 \- Qiita](https://qiita.com/koinori/items/456673d38034af8f09d8)

## typescript-deno-plugin を使う方法

``` typescript
$ yarn add -D typescript-deno-plugin typescript
$ cat gitignore
package.json
node_modules
yarn.lock
package-lock.json
```

### import maps を使う方法
tsconfig.json

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true,
        "importmap": "import_map.json"
      }
    ]
  }
}
```

import_map.json

``` json
{
  "imports": {
    "fmt/": "https://deno.land/std@0.95.0/fmt/",
    "http/": "https://deno.land/std@0.95.0/http/"
  }
}
```

``` typescript
import { serve } from "http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

## import map を使わない方法

tsconfig.json

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true
      }
    ]
  }
}
```

``` typescript
import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

``` shell
deno cache https://deno.land/std@0.95.0/http/server.ts
# or $ deno cache src/index.ts

$ deno run --import-map=import_map.json --allow-net src/index.ts
```

cf. [Manual \| Deno](https://deno.land/manual/linking_to_external_code/import_maps)

## もう少し進んだ使い方(lock file や 依存パッケージのマネジメントについて)
deps.ts

``` typescript
import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
```

index.ts
``` typescript
import { serve } from "./deps.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```


``` shell
# 依存パッケージをローカルにキャッシュ(ダウンロード)する
$ deno cache --lock=deno-lock.json --lock-write src/deps.ts

# 別のマシンでロックファイルを読み込む方法
$ deno cache --reload --lock=deno-lock.json src/deps.ts
```

cf. [マニュアル\| デノ](https://deno.land/manual/examples/manage_dependencies)

## deno 実行ファイル生成

``` shell
$ deno compile --unstable --output=hoge --allow-net src/index.ts
```

cf. [Manual \| Deno](https://deno.land/manual/tools/compiler)

# hot reload

``` shell
$ deno run --watch --unstable --allow-net src/index.ts
```

cf. [Deno の組み込み機能、ソースコードの変更を検知してオートリロードする "File Watcher" の紹介](https://zenn.dev/magurotuna/articles/8f0ed7da6e9ab1)

# 参考

[deno で Elm の live reload を作ってみた \+ 感想 \- ジンジャー研究室](https://jinjor-labo.hatenablog.com/entry/2018/12/23/105534)
