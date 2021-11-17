---
title: "SuperShop"
date: "2021-09-04"
summary: "SuperShop Overview, an Ecommerce Web App with live orders management. Django/React"
---

**Github Links** :

- Django/DRF backend : <https://github.com/StitiFatah/SuperShopAPI>
- React/NextJS frontend with Typecsript : <https://github.com/StitiFatah/SuperShopNext>

**Status** : Alpha, to deploy.

_This blog post is only a quick description of the project, I'll later provide a more inn depth code analysis_

## Introduction :

This webApp was originally made for a friend who had the project to open his own fast food but it unfortunately didn't happen due to the pandemic, I however kept improving the project afterwards.

This is a full featured Ecommerce WebApp that allows users to order food, the project can be divided in 3 distincts parts :

- First it provides a complete Dashboard Interface written in React + Formik to let the owner specify all the details about his business ( like work hours, phone number, address, coupons, sales etc ) and of course create products that will be whown to his clients.

- A live orders feed management made with Webscockets through Django Channels that let the chef, counter person, delivery persons and other persons from the staff manage orders in real time

- The part that is shown to end users which is the product listing, management of personnal informations and so on

This project is a Single page appilication (SPA) that use Django/DRF as an API and Django Channels in the backend and ReactJS in the frontend. Payment is made by Stripe.

## Backend

All the Django code is hosted [here](https://github.com/StitiFatah/SuperShopAPI).

The code is devided in several apps:

- Boards is the app that use Django Channels and is in charge of the live feed
- Business manages things related to the Business like the Shop's phone numbers, addresses and so on
- Orders manages everything related to orders, from the step when products are added to the cart to the finalization
- Payment manages the order finalization which is made using tyhe Stripe Library
- Shop manages everything related to products that can be bought, it manages, products, categories and optional collections and sales and coupons that can affect their prices.

Django Signals are heavily used inside the project, weither it's to generate slugs or more complex things like recalculating prices after Sales are created or sending asynchronous messages to channels that handle the live feed part.
The backend is almost entirely tested via pytest, tests can be found in the "tests" folder of each application.

## Frontend

All the React code can be found [here](https://github.com/StitiFatah/SuperShopAPI)

The Frontend is made using React (with Typescript) via the Next JS framework which add nice oprions like Server Side Rendering and prerendering. The code is devided following the 3 important parts of the project which are the Admin Dashboard, the live feed management that are only accessible to Admin and Staff users and the end user part. The project is focused on reusable components which are largerely shared accros the project and could later be used in other projects.

About external libraries, Formik is heavily used in the Dashboard and even for the Cart section to make forms really interactive. Zustand is also used to handle global states. The fetching is done using axios.

The styling is partly handled by TailwindCSS.

![page_acceuil](/images/ss_home.png)
**Home page ad admin**

![cart](/images/ss_cart.png)
**Checkout Bar Component**

![dashboard](/images/ss_db.png)
**Dashboard with product Listing**
