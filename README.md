Nean-frontend
=============

Nean stack frontend angularjs application.
An angularjs application including several modules to handle basic configuration and calling of REST API.

Features
----------
  * Authentication: login modal and JWT authentication
  * API: api caller to discover and handle call to API endpoints (REST resource or not)
  * Configuration: global configuration of core module and submodules
  * i18n: internationalization
  * Routing: base routing
  * Logging: logging of client errors to server log
  * Services: helpers to use base64, exceptions ...

Install
-------

  $ npm install https://github.com/angusyg/nean-frontend

Quick Start
-----------

After installation, a folder 'web' is created at root.
For development, to launch a server and watch files changes, use :

  $ gulp
  or
  $ npm run dev
