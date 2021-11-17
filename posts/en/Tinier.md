---
title: "Tinier"
date: "2021-09-03"
summary: "An Url Shortner SPA made with VueJS + DRF"
link_name: "tinr.me"
link_href: "https://tinr.me" 
----

**Githun Links** :

- Django/DRF backend : <https://github.com/StitiFatah/tinier_project/tree/refactoring>
- VueJS frontend : <https://github.com/StitiFatah/tinier_project/tree/refactoring/frontend_tinier>

**Status** : to deploy.

_This blog post is only a quick description of the project, I'll later provide a more in depth code analysis_

It's a Single Page Application (SPA) made with Django/DRF on the backend and VueJS on the Frontend. The styling is handled by Bootstrap Vue. It's basically an URL shortner, you provide a long link like *https://www.myverylong/link/verylong* and you end up with a shortened link like _tnr/lglk_ that you can easily share on social medias for example. You can use the webAPP without being connected, shortened links will thus be stored in the localStorage. An optionnal expiration date can be provided.

![home_not_connected](/images/ut_not_connected.png)

If you want more controls you can however create an account and get your links even if you change your browser or clear the LocalStorage. If you want your links to be monitored you can enable the option on a per link basis and get statistics about them.

![ut_connected](/images/ut_connected.png)
**home page with links**

![ut_stats](/images/ut_stats.png)
**stats about some links**

I have also developped a MessageTinier extension, it's just a simple tool that help you minify a text given a "max_length" by using abbreviation and other techniques, it has an auto and manual mode.

![message_tinier](/images/mt.png)
**Message Tinier**
