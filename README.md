# IMDb movies crawler and search engine

![node 12](https://img.shields.io/badge/node-%20v12-brightgreen)

## Get started

### 🐋 Quick start (Docker)

```
# Get everything up!
docker-compose up -d
```

### 👨‍💻 Bootstrap (Local development)

1. Install node 12, recomended to install via [nvm](https://github.com/nvm-sh/nvm).
2. Install dependencies with `npm install`.
3. Run the project with `npm run dev`.

## Endpoints

### URLs

You find the endpoints' method, url, and description in the table bellow.

| Method | Endpoint url            | Description                                                         |
| ------ | ----------------------- | ------------------------------------------------------------------- |
| `POST` | `/crawl-imdb`           | [Crawl IMDb listing pages and save movies data](#/crawl-imdb)       |
| `GET`  | `/search/{search_term}` | [Search for different aspects of the movie](#/search/{search_term}) |

### Payloads

You find the endpoints' payload examples in the subsequent sections.

---

#### <a name="/crawl-imdb"></a> Crawl IMDb listing pages and save movies data

Endpoint

```
POST http://localhost:8080/crawl-imdb
```

Example request:

```bash
curl \
  --header 'Content-Type: application/json' \
  --request POST 'http://localhost:8080/crawl-imdb'
```

Example payload response:

```json
{
    "success": true
}
```

---

#### <a name="/search/{search_term}"></a> Search for different aspects of the movie

Endpoint

```
GET http://localhost:8080/search/{search_term}
```

Example request:

```bash
curl \
  --header 'Content-Type: application/json' \
  --request GET 'http://localhost:8080/search/robert%20pacino'
```

Example payload response:

```json
[
  "The Godfather: Part II",
  "Heat",
  "The Irishman"
]
```
