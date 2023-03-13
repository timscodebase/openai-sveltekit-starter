# OpenAI SvelteKit starter

Starter template for teams who want to use SvelteKit and OpenAI for the next Uni Micro hackathon.


## Getting started

**Environment variable**

You'll need to create a file called `.env` in the root of the project. This is where you supply your OpenAI API key.

Prefixing the variable with `SECRET_` will make sure it's only available on the backend. Trying to import the variable in a piece of code that runs on the client will make SvelteKit throw a compilation error.

An example of what this file should contain is available in [.env.example](.env.example).


**Installing dependencies** 

```
npm install
```

**Starting the dev server**

```
npm run dev
```

## Deployment

There are multiple good options for deploying SvelteKit apps, but [Vercel](https://vercel.com/) is probably the easiest.

It's a zero config (except for env variables) deployment option with CI batteries included. 

Set up a free account, give access to your repository, and Vercel will deploy whenever you push to the main branch.

Backend endpoints are deployed as serverless functions.
