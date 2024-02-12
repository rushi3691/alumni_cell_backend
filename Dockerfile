FROM oven/bun

WORKDIR /src

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]