---
layout:     post
title:      "Protect your routes on Symfony2 against CSRF attacks"
date:       2015-04-24 12:00:00 +0200
category:   development
tags:       [bundle, csrf, security, symfony2]
slug:       protects-symfony-routes-against-csrf-attacks
---

I currently work on a project which uses a lot of simple links to run important actions like deleting or setting a value for a specified entity. However, it's important to secure all of them against [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery) which could lead on serious vulnerabilities.

If you don't know what is CSRF attacks let me explain it quickly. A website is made of actions which consists of URLs. So you may have an URL to delete a user which could looks like *mydomain.com/user/delete/{id}*. Where *{id}* is the identifier of the user to delete. If the developper done is job correctly, only people with the according rights (eg: administrators) can access this URL correctly. The flaw happens when an administrator runs this URL unintentionally. Indeed, if the administrator open the URL while he is connected to the website, there won't be any protection against this.

Since I'm using Symfony2 for this project there is already this kind of protection for forms: a token which can be unique to this form is added to the posted datas and checked on form submission. You can also specify a different *intentions* for each form which consists on a kind of salt to create different tokens. However, I don't want to create a form for each *sensible* link I have on the website.

The reasons are simply because :
- The website design uses a lot of small actions and integrating forms is too counter-productive ;
- I am lazy and I don't want to create a form and handle it's submission for all actions.

## The solution

My solution was to create a bundle which adds some configuration to Symfony routes to handle the CSRF tokens creation and validation automatically. You can find the bundle on [Github](https://github.com/fantoine/csrf-route-bundle) or [Packagist](https://packagist.org/packages/fantoine/csrf-route-bundle).

When using the bundle, your sensible routes will instead looks like *mydomain.com/user/delete/{id}?_token=oI0JY6bBydIF18n6r-CflJ7hFAxf0P48xSk4SXBfOys*.

As you can see a token is appended to the URLs, which give less possibilities to create a valid URL from a malicious person.

You can configure the token variable name, the intention and the HTTP method(s) which must be validated. When generating the URLs with Symfony2 functions the token will be automatically added. And when accessing an URL, the request will be automatically validated and an exception will be thrown.

You will find all the required documentation on the [Github repository](https://github.com/fantoine/csrf-route-bundle).
