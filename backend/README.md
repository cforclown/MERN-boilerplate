## Quick run

- clone this repo
- open with your favorite editor

```bash
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Comfortable development

- clone this repo
- open with your favorite editor

```bash
cp env-example .env
```

Run additional container:

```bash
docker compose up -d mongo
```

```bash
npm install

npm run seed:run

npm run dev
```
