FROM hayd/ubuntu-deno:1.9.2

EXPOSE 3000

WORKDIR /app

USER deno

COPY . .

RUN deno cache --reload --lock=deno-lock.json src/deps.ts

CMD ["run", "--unstable", "--allow-net", "--allow-env", "--allow-read", "src/index.ts"]
