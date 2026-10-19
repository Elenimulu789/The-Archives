# Architecture analysis and verification

## Target: Discourse

I classify Discourse as a **monolithic Rails backend with a separate browser frontend and supporting infrastructure**. It also has presentation, application, and data layers. This is an architectural interpretation of the documented arrangement; independent cache/database/worker processes do not establish independently deployable business microservices.

| Component | Role | Evidence |
|---|---|---|
| Ember.js | Browser frontend communicating with the API | README, Built With |
| Ruby on Rails | Backend API returning JSON | README, Built With |
| PostgreSQL | Main persistent data store | README, Built With |
| Redis | Cache and transient data | README, Built With |
| Sidekiq | Background job processing | INSTALL identifies worker processes; individual job paths not traced |
| Nginx | Web server / reverse proxy in deployment stack | INSTALL identifies Nginx configuration; detailed proxy configuration not inspected |

## Communication boundaries

The browser calls the Rails API over HTTP and receives JSON. Server-side components access PostgreSQL/Redis. Background work runs outside the web request process. A simplified create-discussion model is browser input → server validation/authorization → persistent write → response. Exact discussion routes, transactions, and jobs are not claimed as verified by this documentation-only analysis.

## Prototype: The Archives

React event handlers validate form input and serialize topic/reply objects to localStorage, then update React state. Reload restores validated stored objects. The storage key is `the-archives-discussions-v1`. Topics contain an ID, title, category, body, and reply array; replies have an ID and body. Browser-generated UUIDs identify new records.

The browser serves as both UI execution environment and local persistence boundary. There is no server authorization, shared database, cache service, reverse-proxy configuration, or worker queue implemented by the prototype. Static hosting delivers HTML, CSS, and JavaScript only.

## Trade-offs

The smaller design makes a single subsystem easy to demonstrate and deploy without credentials. It cannot represent a real multi-user community. Data is not synchronized between devices or browser profiles, simultaneous tabs may overwrite one another, and clearing site data removes discussions. A future version needs authenticated users, server-side validation, a shared database, and appropriate abuse controls. Background workers become useful if slow tasks such as email notifications are added.

## Sources and verification status

My AI-assisted architecture research uses the official sources below. This is a documentation-based analysis; the links track `main`, so they do not identify a fixed source-code snapshot.

1. https://github.com/discourse/discourse/blob/main/README.md — Built With: Ember, Rails JSON API, PostgreSQL, Redis.
2. https://github.com/discourse/discourse/blob/main/docs/INSTALL.md — Rails/Sidekiq processes and Nginx configuration.

A concrete documentation discrepancy was observed: README lists Ruby 3.4+, whereas INSTALL lists Ruby 3.2+. Therefore this project does not assert one universal current Ruby minimum or install Discourse using those conflicting version numbers. A real installation should follow the current supported deployment path and pinned configuration.
