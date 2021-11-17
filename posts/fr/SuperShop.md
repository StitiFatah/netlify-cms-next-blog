---
title: "SuperShop"
date: "2021-09-04"
summary: "Presentation de SuperShop, une WebApp Ecommerce avec gestion de commandes interactives en direct. Django/React"
---

**Liens Github**:

- Django/DRF backend : <https://github.com/StitiFatah/SuperShopAPI>
- React/NextJS avec Typescript frontend : <https://github.com/StitiFatah/SuperShopNext>

**Status** : Alpha, à déployer

_Cet Article de Blog constitue une déscription rapide du projet, une analyse en profondeur du code sera prochainement publiée_

## Introduction

Cette webApp était originellement destinée un un ami désireux d'ouvrir un restaurant, le projet n'ayant pas aboutit à cause de la situation sanitaire, j'ai cependant continué à améliorer le logiciel.

C'est un site web Ecommerce pouvant être divisé en trois parties:

- La partie Dashboard qui est une interface codée en React (+ Formik pour les formulaires). Elle permet à l'administrateur de renseigner toutes les informations relatives à son restaurant (horraires d'ouvertures, numéro de téléphone, addresse, codes de réduction, promotions etc) et de bien sûr créer les produits qui seront mis en vente.

- Une interface qui permet au staff de gérer les commandes en direct, ainsi la personne au comptoir peut faire passer une commande aux cuisiniers qui peuvent la faire passer aux livreurs etc, le tout en direct sans jamais raffraichir la page internet.Ceci est possible grâce à l'utilisation de la téchnologie Webscockets via Django Channels.

- La dernière partie est simplement l'interface présentée aux utilisateurs finaux, qui comprend la liste des produits, celle des reductions, la recherhe de produits, l'interface permettant rentrer ses informations personnelles de livraison etc.

Ce projet une Single Page Application (SPA) qui utilise Django/DRF comme API ainsi que Django Channels du côté Backend et React via le Framework NextJS (qui permet entre autres le Server Side Rendering) côté frontend. La gestion des paiements se fait via la librairie Stripe.

## Backend

Tout le code Django est hébérgé à [cette addresse](https://github.com/StitiFatah/SuperShopAPI)

Le code est divisés en plusieurs "applications" Django:

- "Boards" est l'application qui utilise Django Channels, elle est en charge de la gestion des commandes en direct.
- "Orders" se charge de tout ce qui est relatif aux commandes, de la création jusqu'au paiement.
- "Payment" se charge de la finalisation des commandes via la librairie Stripe.
- "Shop" se charge de tout ce qui est relatif aux produits, leurs catégories, collections ainsi aue les codes de récuctions et promotions pouvant affecter leurs prix.
- "Business" se charge des informations purement relatives au restaurant.

Les signaux Django sont beaucoup utilisés dans le projet, que ce soit pour générer les identifiants uniques "slug", modifier les prix selon l'évolution des promotions ou envoyer des messages asynchrones à Django Channels.
Le code est quasiment entièrement testé via pytest dans le dossier "tests" de chaque application.

## Frontend

Tout le code React peut être trouvé [ici](<(https://github.com/StitiFatah/SuperShopAPI)>)

La partie frontend utilise ReactJs via le framewrok NextJS, Typesctipt est utilisé à la place de Javascript. Le code est divisé selon les 3 grandes sections du projet décrites ci dessus qui sont le DashBoard Administrateur, la partie de gestion des commandes en direct et l'interface destinée auc utilisateurs finaux. Le projet se concentre sur la création de composants réutilisables, que ce soit dans le projet lui même ou plus globalement dans d'autres si l'occasion venait à se présenter.

Pour ce qui est des librairies externes Formik est utilisé pour gérer les formulaires de façon interactive pour le Dashboard Administrateur et pour la création de commande par l'utilisateur final. Zustand est utilisé pour gérer les "global states" qui sont des valeurs réutilisés dans plusieurs parties du projet lorsque l'architecture des composants permet difficilement l'utilisations de "local states" qui sont des valeurs locales.

Le style est partiellement géré par la libraire PostCSS : TailwindCSS.

![page_acceuil](/images/ss_home.png)
**Page d'acceuil**

![cart](/images/ss_cart.png)
**Le composant CheckoutBar**

![dashboard](/images/ss_db.png)
**Categorie Produits/Liste du Dashboard administrateur**
