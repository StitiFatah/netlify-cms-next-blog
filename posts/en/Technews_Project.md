---
title: "Technews Project"
date: "2021-09-05"
summary: "Overview of technews, a website with tech related news"
image: "/images/aa_holmes.jpg"
stack: ["DRF", "VueJS", "Celery", "Bootstrap"]
link_name: "technews.com"
link_href: "http://45.33.13.12"
---

**Github Link** : <https://github.com/StitiFatah/technews1>

**Hosted at** : <http://45.33.13.12>

**Stack** : Django, DRF, Celery, VueJs (previously vanilla JS/JQuery)

**Test User** : username : test@test.com, password: test

## Context

This Website was my first serious Django project, it's a Tech News News Aggregator which periodically parse some website's rss files and then store meaningful informations like titles, links, the main picture and quick summaries of available articles. These are then accessible to users who can follow their links to access the original content. They can also perform some operations on them like saving for after or blacklist sources or articles they don't want to see anymore.
Reddit forums are also parsed to show users which are the hot topics discussed at the moment.

![home_page](/images/tn_home.png)
The home page

## Technologies used

I have refactored this project quite a bit:

- First It was a pure django project, which means Django's default templating langage was used in the front end side with just vanilla js/jQuery to handle the interactivity (you can still access this code at the **pure_django** branch [here](https://github.com/StitiFatah/technews1/tree/pure_django)).

- Then, although I realised it wasn't that necessary for such basic tasks, I refactored the project to handle a part of the frontend with VueJS loaded via a CDN, which means it wasn't a SPA but just some VueJS sitting in Django's static files' directory and used inside Django Templates. The Django Rest Framework is used to communicate with the frontend. You can find this branch. [here](https://github.com/StitiFatah/technews1/tree/Technews_vue_mpa)

- Realising I was writting the same logic too many times for the different pages I came back to it later to minimise the use of Django Templates and write Vue Components that are shared by different Django templates with different props values, this last version of the project is accessible at the master branch [here](https://github.com/StitiFatah/technews1/tree/master)

To parse SSR links that are stored inside the database I use the python library [feedparser](https://github.com/kurtmckee/feedparser) and make use of [Celery](https://github.com/celery/celery) and celery beat to regularely kick off the task that do so ( witrh RabbitMQ as the message broker). I also use Beautiful Soup to scrap some webpages when some articles' images aren;'t directly available via the RSS file.

I'm also using Boostrap 5 (started with Bs4 then updated) to handle styling and things like toasts/modals and dropdowns.

## How Does This work ?

### Getting Articles

The functionnement is rather simple. I have Django Models for Categories,Sources, Articles, Preferences, Saved Articles, Reddit Sources and Reddit Topics. All of these models are located [here](https://github.com/StitiFatah/technews1/blob/master/main_app/models.py).

A category (like Android for example) can contain multiple sources (like 9to5Goole and Xda) and multiple articles will then be related to it. Each Source contains a name, a fallback image in case no image is available for a given article, the **rss link** from where the articles would be parsed, some informations about how to access the summary and the image, and the way the caching is done in order to see if new articles have been published from this same source since the last check via Celery Task Queue.

The Article Model is related to its source and categorie(s) via Foreign Key and M2M Field, it also contains a name, a link to the origin url to read the full article, an image and a date of publication.

Sources which will be parsed are added manually by the admin, this can be done via the Django Admin Interface or via a CLI script accessible through

```bash
python manage.py create argument
```

with the argument being yes or no to instruct the script if it should search for the best way to find image's for articles related to this source or just let you handle it later. These are all the different potential ways to find these images :

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

When a source is finally added to the database, its rss link will then be parsed the next time Celery kicks offs the registered tasks to do so and articles will be stored too. The article creation ste is handled by the [creating articles](https://github.com/StitiFatah/technews1/blob/master/main_app/functions.py). This function handles all the needed logic to add articles to the database, it will first check if the availables sources need to be parsed by comparing the etag or last_modified fields available in the database to those in the rss file, if these one match that means no new articles have been published from this source since the last parsing, and the script can naturally skip it. It's good to note that some rss links neither provide etag or last_modified tags, in such cases an hash is generated via hashlib to perform the comparison.

In the other hand if the caches don't match the script will then compare the title of each new article published by the source with the recent ones added (last day in this case) to the database to unsure similar articles haven't already been saved. This comparison is performed using Fuzzy string matching ( Levenshtein Distance) wuth the help of the [FuzzyWuzzy](https://github.com/seatgeek/fuzzywuzzy) library.

If the value of the comparison is below 59 (higher value mean higher similarities) the script gathers the link,image,summary and date of publication of the article and save it to the database.

![source_page](/images/tn_source_page.png)
Latest articles published by OmgUbuntu!

### Users

The website allow user creation, the popular [django-all-auth](https://github.com/pennersr/django-allauth) library helps for that. A rather simple custom user Model named PersoUser is used and can be found [here](https://github.com/StitiFatah/technews1/blob/master/users/models.py).

Users can perform nasic operations to filter which articles are displayed to them. They can save articles to access them later through the "Save Searches" sections available in the side bar. The model **Saved** is associated to a user via a OneToOneField relation and to the "Articles" Model through a M2M Field. The logic to save an article is handled by the "ToogleArticleSavedAPI" APIView DRF class available [here](https://github.com/StitiFatah/technews1/blob/master/main_app/views.py), the frontend function to call this view can be found [here](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/static_in_env/js/api/category_page_vue.js#L90)

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

DRF's class views to Blacklist Sources and Articles are available from the same file and same goes for the VueJs functions that call them.

![saved_searches](/images/tn_saved_page.png)
**Articles I'd want to read later!**

![preferences](/images/tn_preference_page.png)
**2 Articles and 2 sources are Blacklisted, but I can still unblacklist them !**

Users Can also search the database for articles, a simple search is available from the navbar but there is also an advanced one based on Titles,Categories and Sources, the view responsible for that is located [here](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/main_app/api/views.py#L28), it's using DjangoFilterBackend to perform the filtering, the custom filtering is described by [this](https://github.com/StitiFatah/technews1/blob/22cf64634c15b9ffd7e4c64898557115831d06a8/main_app/api/custom_filtering.py#L5) filters.FilterSet class.

```python
rom main_app.models import Articles
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

The url to call the view is given articles/sources/categories name and the filtering is performed, here's how it should looks like from the javascript side

```javascript
let url = `/api/articles/?title=${t_e}&category__name=${c_e}&source__name=${s_e}&f_title=${t_c}&f_category=${c_c}&f_source=${s_c}&ordering=${order}`;
```

the vue part that handle the frontend for the search is located [here](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/search_page_vue.js)

![advanced_search](/images/tn_advanced_search.png)
Want to know about the new phone from Google ?

## The Frontend

The Frontend is also rather simple, the style part is handled by vanilla Css and Bootstrap 5 (previously bootstrap 4), Bootstrap JS is also in charge of handling some js parts like toasts or modals.

VueJs loaded via a CDN in the [root](https://github.com/StitiFatah/technews1/blob/master/templates/api/base.html) django templates is responsible for displaying articles and handling operations like saving,blacklisting and searching. All the vue files are located in the [static file directory](https://github.com/StitiFatah/technews1/tree/master/static_in_env/js/api).

The main vueJS components is [category_page_vue.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/category_page_vue.js) which despite its name handle the frontend for home,category,sources and saved pages. It takes 3 props which are :

```javascript
 props: {
    isauthenticated: {
    // to know if the user is authenticated
      type: String,
      required: true,
    },
    // the url to redirect to in case the user needs to be connected
    login_url: {
      type: String,
      required: true,
    },
    // the DRF encpoint where to get articles list from
    article_list_endpoint: {
      type: String,
      required: true,
    },
  }
```

This component also render a [skeletton.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/skeletton.js) component which display nice loading skelettons before articles are fetched and a [toast.js](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/toasts.js) that is responsible for toasts and modals.

Components for [reddit trends](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/reddit.js), the [saved article's page](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/search_page_vue.js) and the [preference page](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/preference_page_vue.js) are also used for the frontend.

Finally all the fetching to call DRF's endpoints is done by [fetch](https://github.com/StitiFatah/technews1/blob/master/static_in_env/js/api/api.service.js)
