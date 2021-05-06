# docker compose sandbox
`docker-compose` コマンドは基本的に `docker-compose.yaml` ファイルがあるディレクトリで行う


# docker-compose up build start...
![](README.md_imgs/20210506_011737.png)


cf.
- [docker\-compose \`up\` とか \`build\` とか \`start\` とかの違いを理解できていなかったのでまとめてみた \- Qiita](https://qiita.com/tegnike/items/bcdcee0320e11a928d46)

# build and up

``` shell
docker-compose build

docker-compose up -d

docker-compose ps

docker-compose exec db mysql -V
```

# clean

``` shell
docker-compose down --rmi all --volumes --remove-orphans
```

> docker-compose で
>
> - コンテナ止める
> - ネットワーク削除する
> - ボリューム削除する
> - イメージ削除する
>
> って
>
> docker-compose down --rmi all --volumes
>
> で一括してできたのね。
>
> こんな便利な「滅びの呪文」があるなんて知らなかった。
>
> いちいち stop, rm などしてた
[《滅びの呪文》Docker Composeで作ったコンテナ、イメージ、ボリューム、ネットワークを一括完全消去する便利コマンド \- Qiita](https://qiita.com/suin/items/19d65e191b96a0079417)

# docker-compose で別ディレクトリにあるやつをどうにかして操作したい

``` shell
docker-compose -f ~/src/github.com/refcome/stores/docker-compose.yml down --rmi all --volumes --remove-orphans
```

- [Docker \- docker\-composeでどのディレクトリでupしたか調べる方法｜teratail](https://teratail.com/questions/93339)
- [他のフォルダのdocker\-compose\.ymlを実行する方法 \- Qiita](https://qiita.com/sakapun/items/4249b814def5abbeb02c)

# docker empty reply from server

cf.
- [Dockerで、ホストからcurlでアクセスするとEmpty reply from serverがでてしまう \| mokelab tech sheets](https://tech.mokelab.com/infra/docker/tips/empty_reply_from_server.html)
