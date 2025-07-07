<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Alumni-portal

The project aims to realize a web application for Alumni. The web application should serve as a solution to the problem of storing data in inconvenient databases and system overload.

# Laravel + React + Inertia + Vite + PostgreSQL

This is a modern full-stack web application built with:

- **Laravel Breeze** – lightweight starter kit for authentication
- **React** – frontend framework
- **Inertia.js** – bridges Laravel backend and React frontend
- **Vite** – fast frontend build tool
- **Laravel Sanctum** – session-based authentication
- **PostgreSQL** – relational database

## How React + Inertia.js Works with Laravel

This project uses **Inertia.js** to seamlessly connect Laravel and React, enabling the development of single-page applications (SPAs) without needing a separate API.

- Laravel handles all routing (no React Router needed).
- Controllers return `Inertia::render()` responses with React components.
- React pages receive props directly from Laravel – no need for REST or GraphQL.
- Server-side logic like validation, redirects, and middleware stays in Laravel.
- The frontend feels like a SPA, but works like a traditional Laravel app.

Example of an Inertia response in Laravel:

```php
use Inertia\Inertia;

public function index()
{
    return Inertia::render('Dashboard', [
        'user' => auth()->user(),
    ]);
}

