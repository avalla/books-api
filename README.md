# Books API

[![Test and build](https://github.com/avalla/books-api/actions/workflows/build.yml/badge.svg)](https://github.com/avalla/books-api/actions/workflows/build.yml)

Just a coding challenge :)

## Prerequisites

- NodeJs >= 14.x
- Yarn

## Project structure

This project is a monorepo, using yarn workspaces.

    .
    ├── .github                          # Github Actions
    ├── packages                         # Packages (applications, modules, etc)
    │    ├── module-logger               # Logger
    │    └── web-backend                 # Backend application
    ├── CHANGELOG.md
    ├── index.js                         # Fake entry point, displays only a message
    └── README.md                        # This readme

## Getting keys from APIs

### NY Times API

1) Open `https://developer.nytimes.com/` and register a new user.
2) Go to `https://developer.nytimes.com/my-apps`, create a new application using button `New App`
3) Fill data and enable Books API, save
4) Save Key and Secret in a safe place, you will use them soon ;)

## Setting up dev

Execute from root project:

```shell
$ yarn install
```

Configuration is customizable via environment variables or .env files.

```dotenv
API_PORT=
NYTIMES_KEY=<fill with key from ny times developers portal>
```

.env file is automatically loaded with yarn using `yarn-plugin-dotenv`.

## Start development environment

Execute from root project:

```shell
$ yarn start
```

## Execute commands in packages

To execute scripts you should launch:

```shell
$ yarn workspace <my-package> <command>
```

For example to add a library inside a package you should execute:

```shell
$ yarn workspace <my-package> add <awesome-library>
```

To interact with backend application you can also use the shortcut saved inside scripts section in root project.

```shell
$ yarn backend <command>
```

## Endpoints exposed

`GET /api/v1/books/categories`

Retrieve list of categories from NY Times API.

Example response

```json
{
  "results": [
    {
      "list_name": "Combined Print and E-Book Fiction",
      "display_name": "Combined Print & E-Book Fiction",
      "list_name_encoded": "combined-print-and-e-book-fiction",
      "oldest_published_date": "2011-02-13",
      "newest_published_date": "2021-12-19",
      "updated": "WEEKLY"
    }
  ]
}
```

`GET /api/v1/books/books/<list_name_encoded>`

Retrieve books from NY Times API and preview link from Google Books API fill category using `list_name_encoded` field from previous result.

Example response


```json
{
  "results": [
    {
      "list_name": "Hardcover Fiction",
      "display_name": "Hardcover Fiction",
      "bestsellers_date": "2021-12-04",
      "published_date": "2021-12-19",
      "rank": 1,
      "rank_last_week": 1,
      "weeks_on_list": 2,
      "asterisk": 0,
      "dagger": 0,
      "amazon_product_url": "https://www.amazon.com/dp/1101885688?tag=NYTBSREV-20",
      "isbns": [
        {
          "isbn10": "1101885688",
          "isbn13": "9781101885680"
        },
        {
          "isbn10": "1101885696",
          "isbn13": "9781101885697"
        }
      ],
      "book_details": [
        {
          "title": "GO TELL THE BEES THAT I AM GONE",
          "description": "The ninth book in the Outlander series. As the Revolutionary War moves closer to Fraser’s Ridge, Claire and Jamie reunite with their daughter and her family.",
          "contributor": "by Diana Gabaldon",
          "author": "Diana Gabaldon",
          "contributor_note": "",
          "price": "0.00",
          "age_group": "",
          "publisher": "Delacorte",
          "primary_isbn13": "9781101885680",
          "primary_isbn10": "1101885688"
        }
      ],
      "reviews": [
        {
          "book_review_link": "",
          "first_chapter_link": "",
          "sunday_review_link": "",
          "article_chapter_link": ""
        }
      ],
      "previewLink": "http://books.google.it/books?id=Ks1lzgEACAAJ&dq=isbn:9781101885680&hl=&cd=1&source=gbs_api"
    }
  ]
}
```
