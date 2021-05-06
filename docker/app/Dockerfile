FROM hayd/ubuntu-deno:1.0.0

EXPOSE 3000

WORKDIR /app

USER deno

COPY . .

RUN deno cache src/index.ts

CMD ["run", "--allow-net", "src/index.ts"]
