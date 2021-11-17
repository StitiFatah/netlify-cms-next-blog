---
title: "Technews Project"
date: "2021-09-05"
summary: "Presentation de Technews, un site web d'articles sur la Tech"
image: "/images/aa_holmes.jpg"
stack: ["DRF", "VueJS", "Celery", "Bootstrap"]
link_name: "technews.com"
link_href: "http://45.33.13.12"
---

**Lien Github** : <https://github.com/StitiFatah/technews1>

**Hebergé à** : <http://45.33.13.12>

**Technologies** : Django, DRF, Celery, VueJs (previously vanilla JS/JQuery),Bootstrap

**Utilisateur Test** : nom d'utilisateur : test@test.com, mdp: test

## Introduction

Ce site web est mon premier projet de taille réel avec Django, c'est un "news aggregator" qui va periodiquement analyser des lien RSS à la recherche de nouveaux articles publiés par certaines sources, les noms, images, liens et résumés de ces articles sont ensuite stockés dans une base de données et mis a disposition des utilisateurs qui peuvent ensuite choisir d'être redirigés vers les sites originaux des articles. Ces utilisateurs peuvent également sauvegarder et blacklister certains articles ou sources.  
Le forum Reddit est aussi analysé pour proposer des liens vers les sujets les plus discutés du moment dans le monde de la Tech.

![home_page](/images/tn_home.png)
La page d'acceuil

## Technologies utilisées

Ce projet a été plusieurs fois assez largement modifiés :

- Au départ il s'agissait d'un projet utilisant quasi exclusivement Django, en plus du backend le frontend etait donc également géré par Django via son système de template par défaut. L'interactivité ( pour sauvegarder et blacklister les articles par exemple ) était quant à elle gérée par du Vanilla JS/JQuery. Le code pour cette branche du projet est trouvable à cette [adresse](https://github.com/StitiFatah/technews1/tree/pure_django)

- J'ai ensuite modifié le projet pour y integrer le framework frontend VueJS, l'intégration s'est faite via un CDN, le code VueJs reste donc accessible via le dossier static de Django. Le code VueJS a ensuite été intégré à chaque page pour venir completer les templates par défaut de Django. En plus des Views précédentes j'ai donc également utilisé le Django Rest Framework dont les Views sont consommés directement par le frontend Vuejs. Le code correspondant à cette phase du projet est trouvable à cette [adresse](https://github.com/StitiFatah/technews1/tree/Technews_vue_mpa)

- Réalisant l'inneficacité due à la répétition du Code VueJs intégré à chaque page j'ai décidé d'utiliser VueJs avec une approche plus centrée sur les "composants", ces composants partageant la logique des differentes pages et acceptant differentes valeur de "props" sont donc intégrés aux templates par défaut de Django qui jouent cette fois ci un rôle moindre. Cette version du code est la dernière en date et est accessible via la branche [master](https://github.com/StitiFatah/technews1/tree/master)

Pour analyser les liens RSS de chaque source stockée dans la base de données j'ai utilisé la librairie python [feedparser](https://github.com/kurtmckee/feedparser) et [Celery](https://github.com/celery/celery)/celery beat pour périodiquement répéter la tâche (avec RabbitMQ comme message broker). J'ai aussi utilisé la librairie de web scrapping BerautifulSoup pour accéder à certaines images d'articles non directement disponibles via les liens RSS et pour récupérer les informations provenant du forum Reddit.

Bootstrap 5 a été utilisé pour une partie de la mise en page ainsi que pour gérer les modals et toasts.

## Fonctionnement global

### Sauvegarder les articles

Le processus est assez simple, nous avons des modèles Django pour les Catégories, les Sources, les Articles, les Préférences, les Articles Sauvegardés, les Sources Reddit et les Sujets Reddits. Tous ces modèles sont trouvables à l'adresse [suivante](https://github.com/StitiFatah/technews1/blob/master/main_app/models.py).

Une Catégorie (Android par exemple) peut contenir plusieurs sources (9to5Google et Xda par exemple) et chaque source contient naturellement plusieurs articles. Chaque source contient également un nom, une image par défaut utile si un article donné n'en posséde pas, un lien RSS et d'autres informations comme les résumés, images et la façon dont est géré le cache pour determiner si de nouveaux articles ont été publié depuis la dernière vérification via Celery.

Le modèle "Article" est lié à une source via une ForeignKey et à une ou plueisurs catégories via une relation Many To Many Field. Il possède aussi un nom, un lien vers l'URL original de l'article, une image et une date de publication.

Les Sources qui vont ensuite être analysées à la recherche de nouveaux articles peuvent être ajoutées manuellement depuis l'interface administrateur Django ou via le Terminal grâce au script accessibler via la commande

```bash
python manage.py create argument
```

avec un argument "yes" ou "no" qui insruit au script de chercher ou non la manière optiomale d'accéder aux images des articles, les différents choix étant :

```python
    GET_IMAGE_CHOICES = [

        ('image_tag', 'Bs4 nth image tag of the file'),
        ('summary', 'Get image through summary 1st image tag'),
        ('content', 'Get image through the feed content dictionnary'),
        ('content_media', 'Get image through the feed media content dictionnary'),
        ('thumbnail_media', 'Get image through the feed media thumbnail dictionnary '),
        ('links', 'Get image through links dictionnary'),
        ('meta', 'Get image through one of the meta tag of teh file'),
        ('custom1', 'custom way to get image from hackernoon website'),
        ('none', 'no consistant way to get the image')
    ]

```

Quand une source est finalement ajoutée, son lien RSS va ensuite être analysée à intervalle régulier lorsque Celery lancera les tâches relatives à cette action. Les articles seront ensuite enregistrés dans la base données. La création d'articles est gérée par la fonction [creating articles](https://github.com/StitiFatah/technews1/blob/master/main_app/functions.py), cette dernière gère en effet toute la logistique. Pour résumer : elle compare d'abbord l'etag/last_modified d'une source et le compare à son équivalent dans la base de données, s'il y a similarité cela signifie qu'aucun article de cette source n'a été publié depuis la derniere verification, on peut donc passer à la source suivante. Il est à noter que certaines sources ne disposant pas d'etag/last_modified il a parfois été nécéssaire d'utiliser la libraire hashlib pour créer un hash servant a la comparaison.

Si les caches s'avèrent être différents nous comparons le titre de l'article à ceux des articles récents pour éviter les doublons, les titres vont donc être comparés en utilisant la distance de Levenshtein via la librairie [FuzzyWuzzy](https://github.com/seatgeek/fuzzywuzzy), si la valeur de la comparaison est inferieur à 59 nous estimons que l'article est original et nous sauvegardons donc son titre, son résumé, son lien ainsi que son image dans la base de données.

![source_page](/images/tn_source_page.png)
Derniers articles publiés par OmgUbuntu!

## Les utilisateurs

_Utilisateur Test_ : nom d'utilisateur : test@test.com, mot de passe: test

Le site Web permet la création d'utilisateurs, entre autres via la librairie[django-all-auth](https://github.com/pennersr/django-allauth), un modèle d'utilisateur personnalisé est disponible [ici](https://github.com/StitiFatah/technews1/blob/master/users/models.py).

Les utilisateurs peuvent ensuite sauvegarder certains articles pour y accéder plus tard via la section "Saved Searches" disponible depuis la barre latérale. Le modèle "Saved" est associé à un utilisateur via une relation OneToOneField et aux modèles "Articles" via M2M Field. La logique pour effectuer cette action est gérée par par l'API du Django REST Framework disponible [ici](ttps://github.com/StitiFatah/technews1/blob/master/main_app/views.py), du coté frontend la fonction qui déclenche cette view est trouvable à cette [adresse](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/static_in_env/js/api/category_page_vue.js#L90)

```javascript

toggle_save(article) {
      let endpoint = `/api/toog_art_sav/${article.id}/`;
      apiService(endpoint).then((data) => {
        if (data.saved) {
          // article.saved_by_author = true;
          this.toast_saved_message = "ARTICLE SAVED";
          this.saved_articles_ids.push(article.id);

          console.log(`article with id ${article.id} saved`);
        } else {
          // article.saved_by_author = false;
          this.toast_saved_message = "ARTICLE UNSAVED";

          let unsaved_id = this.saved_articles_ids.indexOf(article.id);
          this.saved_articles_ids.splice(unsaved_id, 1);

          console.log(`article with id ${article.id} unsaved`);
        }
      });
      this.show_toast_save();
    },

```

Les DRF Views reponsables du blacklisting sont disponibles à la même adresse, il en va de même pour les fonctions VueJS.

![saved_searches](/images/tn_saved_page.png)
**Articles à lire plus tard**

![preferences](/images/tn_preference_page.png)
**2 Articles et 2 Sources sont blacklistés, mais on peut bien sur faire machine arrière**

Les utilisateurs peuvent aussi intérroger la base de donnée, une recherche simple est disponible depuis la barre de navigation mais il est aussi possible d'effectuer une recherche plus approfondie en rensignant la source, catégorie et le titre de l'article voulu. la DRF View gérant cette recherche est disponible [ici](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/main_app/api/views.py#L28), elle utilise DjangoFilterBackenf avec un [filtre personnalisé](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/main_app/api/custom_filtering.py#L5) qui hérite de la classe filters.FilterSet.

```python
from main_app.models import Articles
from django_filters import rest_framework as filters


class ArticleFilter(filters.FilterSet):

    f_title = filters.CharFilter(
        field_name ="title",lookup_expr="icontains"
    )

    f_category = filters.CharFilter(
        field_name="category__name", lookup_expr="icontains"
    )
    f_source = filters.CharFilter(
        field_name="source__name", lookup_expr="icontains"
    )
    class Meta:
        model = Articles
        fields = ["title","category__name","source__name"]

```

l'URL pour éxécuter le code de la View se voit renseigner un nom d'article, de source et de catégorie et doit être du format :

```javascript
let url = `/api/articles/?title=${t_e}&category__name=${c_e}&source__name=${s_e}&f_title=${t_c}&f_category=${c_c}&f_source=${s_c}&ordering=${order}`;
```

La partie en VueJS qui se charge de la recherche est disponible à cette [adresse](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/search_page_vue.js)

![advanced_search](/images/tn_advanced_search.png)
Exemple de recherche avancée

## Le Frontend

La partie frontend est aussi assez simple, la partie style est gérée par Bootstrap 5 (Bootstrap 4 puis MAJ), BoostrapJS est aussi en charge de gérer les toasts et modals.

VueJS est quant à lui chargé via CDN au niveau du [template commun de Django](https://github.com/StitiFatah/technews1/blob/master/templates/api/base.html). Vue est responsable de l'affichage des articles. Les fichiers VueJs (en .js) sont disponibles dans le [dossiers static](https://github.com/StitiFatah/technews1/tree/master/static_in_env/js/api).

Le composant VueJS principal est [category_page_vue.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/category_page_vue.js), malgré son nom il gère l'affichage des articles pour l'acceuil, les catégories, les sources et les articles sauvegardés. Il accepte 3 props qui sont :

```javascript
 props: {
    isauthenticated: {
    // Pour savoir si l'utilisateur est connécté
      type: String,
      required: true,
    },
    // l'URL qui redirige vers la page de connection
    login_url: {
      type: String,
      required: true,
    },
    // l'url DRF pour accéder à la liste d'articles
    article_list_endpoint: {
      type: String,
      required: true,
    },
  }
```

Ce composant affiche aussi le composant [skeletton.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/skeletton.js) qui affiche l'état de chargement avant que les articles soient complétement chargés et un composant [toast.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/toasts.js) qui est responsable de l'affichage des toasts et modals.

Le frontend contient également un composant pour les [articles Reddit](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/reddit.js), un composant pour les [articles sauvegardés](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/search_page_vue.js) ainsi qu'un composant pour les [préférences](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/preference_page_vue.js).

Finalement tout le fetching depuis VueJs vers les DRF Views se fait via [fetch](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/api.service.js)
