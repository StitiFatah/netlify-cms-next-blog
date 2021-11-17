---
title: "Tinier"
date: "2021-09-03"
summary: "Un raccourcisseur d'URL développé avec VueJS et Django/DRF"
stack: ["VueJS", "Celery", "DRF", "BootstrapVue"]
link_name: "tinr.me"
link_href: "https://tinr.me" 
---

**Liens Github** :

- Django/DRF backend : <https://github.com/StitiFatah/tinier_project/tree/refactoring>
- VueJS frontend : <https://github.com/StitiFatah/tinier_project/tree/refactoring/frontend_tinier>

**Status** : A déployer.

_Cet Article de Blog constitue une déscription rapide du projet, une analyse en profondeur du code sera prochainement publiée_

Cet webAPP est une Single Page Application (SPA) dévellopée avec Django/DRF côté backend et VueJS côté frontend. Le style est en partie géré par la librairie BootstrapVue. C'est un raccourcisseur de liens qui va, aprés lui avoir fournis un lien plus ou moins long vous retourner un lien plus court qui redirigera vers ce dernier. Par exemple un lien au format *https://www.myverylong/link/example* pourra être transformé en _tnr/l0kiJ_, ce qui vous permettra de le partager plus facilement. La webAPP est utilisable sans inscription, les liens réduits seront donc stockés dans le localStorage, une date d'expiration du lien peut même être précisé.

![home_not_connected](/images/ut_not_connected.png)

Si vous voulez aller plus loin vous pouvez créer un compte pour accéder aux liens même aprés un changement de navigateur. Il est aussi possible d'activer les statistiques pour les liens dont vous voulez voir l'évolution de la popularité.

![ut_connected](/images/ut_connected.png)
**page d'acceuil avec liens**

![ut_stats](/images/ut_stats.png) \*_Statistiques des liens_

Une extension "Message Tinier" a aussi été developpé, c'est un outil simple qui permet de raccourcir un texte pour qu'il atteigne, si possible, une certaine taille via entre autres l'utilisation d'abbréviations et l'optimisation des espaces. Un mode automatique intelligent et un mode manuel pour plus de contrôle sont disponibles.

![message_tinier](/images/mt.png)
**Message Tinier**
