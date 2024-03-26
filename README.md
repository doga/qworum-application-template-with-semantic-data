![Qworum logo and name](https://raw.githubusercontent.com/doga/qworum-website/master/build/assets/images/logos/Qworum-logo-and-name.svg "Qworum logo and name")

# Basic template for Qworum-based web applications

This is a template for a multi-language website that uses [Qworum](https://qworum.net)'s advanced web browser capabilities.

This template is:

- _Multi-language_, with language-independent API endpoint paths.
- _Versioned_. Indeed, Qworum applications are structured as Qworum APIs, and versioned APIs ensure that other applications that depend on this one will not break after an update.

## The "Hello World" Qworum application

This website implements a Qworum API that has 2 endpoints:

- the `home` endpoint, which is an application, and
- the `view-product` endpoint, called by `home`.

Here is the directory structure:

- Directories with 2-letter names such as `en` contain language-specific versions of the API endpoints.
- `assets` contains resources used by the web pages.
- All other directories (`home`, `view-product`) are the official endpoint paths; they are only used for redirecting API calls to language-specific endpoint versions.

Note that the API endpoint names mustn't be:

- 2 letters long,
- equal to `assets`.

## License

This software is released under the terms of the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0).

∎
