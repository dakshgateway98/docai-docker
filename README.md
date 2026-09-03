# DocAI (full stack)

Document and imaging assistant: doctors upload X-rays or lab reports, Gemini/OpenAI returns a structured student-radiology style write-up. JWT + Google OAuth, PostgreSQL, Docker Compose.

Frontend lives in `FE_doc_ai/`. Standalone frontend repo: [docai](https://github.com/dakshgateway98/docai).

**Not a medical device.** Model output can be wrong.

## Stack

- Backend: Node.js, Express, TypeScript, TypeORM, PostgreSQL, Passport (Google), Gemini
- Frontend: React, Vite, Redux Toolkit, Tailwind, i18n (en/it)

## Run

```bash
git clone https://github.com/dakshgateway98/docai-docker.git
cd docai-docker
cp .env.example .env
cp FE_doc_ai/.env.example FE_doc_ai/.env
# set JWT_SECRET, SESSION_SECRET, GEMINI_APP_KEY in .env
docker compose up --build
```

| Service | URL |
| --- | --- |
| UI | http://localhost:5173 |
| API health | http://localhost:8080/health |

Without Docker (Postgres must already be running):

```bash
cp .env.example .env
npm install
npm run build
npm run setup   # create DB + migrations + seed
npm start
cd FE_doc_ai && cp .env.example .env && npm install && npm start
```

## API (high level)

- `POST /api/auth/register` · `POST /api/auth/login`
- Google OAuth via Passport
- `POST /api/pub/generate-text` — multimodal generation (auth required in typical flows)

## Layout

```text
src/           Express API
FE_doc_ai/     React client
docker-compose.yaml
```
