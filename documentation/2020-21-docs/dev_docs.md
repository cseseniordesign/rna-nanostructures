# Selected Developer Documentation from the 2020-2021 Senior Design Team

# Custom Django Apps

The functionality of the Airavata Django Portal can be extended by adding custom
Django apps that can provide completely custom user interfaces while leveraging
the Airavata Django Portal REST API. This page documents how to get started with
creating a custom Django app that works with the Airavata Django Portal and how
to make use of functionality provided.

## Getting Started

Creating a custom Django app requires creating an installable Python package
with metadata describing that it is a Django app meant to be automatically
installed into the Airavata Django Portal when it is loaded into the virtual
environment.

We'll go through the minimal setup code needed. This will follow along with the
code in the <https://github.com/machristie/test-dynamic-djangoapp> repo, which
represents a minimal custom Django app for the Django Portal.

1.  Install the Airavata Django Portal. See the
    [https://github.com/apache/airavata-django-portal/blob/master/README.md](README)
    for instructions.
2.  With the Django Portal virtual environment activated, navigate to a separate
    directory outside the airavata-django-portal, where you'll create your
    custom django app. The following instructions wil assume this directory is
    `$HOME/custom-django-app` but it could be called and placed anywhere. In
    `$HOME/custom-django-app`, run `django-admin startapp my_custom_app`, but
    instead of _my_custom_app_ specify the module name you want to use. For
    example, let's say your directory is called `custom-django-app` and you want
    to call the module name `custom_app`. Then you would run

        cd $HOME/custom-django-app
        django-admin startapp custom_app

    This will result in the following files:

        custom-django-app
        custom-django-app/custom_app
        custom-django-app/custom_app/migrations
        custom-django-app/custom_app/migrations/__init__.py
        custom-django-app/custom_app/models.py
        custom-django-app/custom_app/__init__.py
        custom-django-app/custom_app/apps.py
        custom-django-app/custom_app/admin.py
        custom-django-app/custom_app/tests.py
        custom-django-app/custom_app/views.py

3.  Create a `setup.py` file in your custom apps root directory. In the example
    above that would be in the `$HOME/custom-django-app/` directory.

```python
import setuptools

setuptools.setup(
    name="my-custom-django-app",
    version="0.0.1",
    description="... description ...",
    packages=setuptools.find_packages(),
    install_requires=[
        'django>=1.11.16'
    ],
    entry_points="""
[airavata.djangoapp]
custom_app = custom_app.apps:CustomAppConfig
""",
)
```

Change the `name` and `description` as appropriate. The necessary metadata for
letting the Airavata Django Portal know that this Python package is a custom
Django app is specified in the `[airavata.djangoapp]` section.

4.  Create the CustomAppConfig class that is referenced above. Open
    `$HOME/custom-django-app/custom_app/apps.py` and edit to match the
    following:

```python
from django.apps import AppConfig


class CustomAppConfig(AppConfig):
    name = 'custom_app'
    label = name
    verbose_name = 'My Custom App'
    fa_icon_class = 'fa-comment'
```

This the main metadata for this custom Django app. Besides the normal metadata
that the Django framework expects, this also defines a display name
(`verbose_name`) and an icon (`fa_icon_class`) to use for this custom app. See
[AppConfig settings](./new_django_app.md#integrating-with-the-django-portal) for
details on available properties here. Note that `app_order` isn't supported for
custom Django apps. Only `name`, `label` and `verbose_name` are required. See
[Django project documentation on AppConfig](https://docs.djangoproject.com/en/1.11/ref/applications/#application-configuration)
for description of these properties.

5.  Create a simple template based view in
    `$HOME/custom-django-app/custom_app/views.py`.

```python
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def hello_world(request):
    return render(request, "custom_app/hello.html")
```

This view will render the template `custom_app/hello.html` which we'll create in
the next step. Add the `@login_required` decorator to any views that should be
authenticated.

6.  Create the hello.html template in
    `$HOME/custom-django-app/custom_app/templates/custom_app/hello.html`

```django
{% extends 'base.html' %}
{% block content %}
<div class="main-content-wrapper">
    <main class="main-content">
        <div class="container-fluid">
            <h1>Hello World</h1>
        </div>
    </main>
</div>
{% endblock content %}
```

!!! note

    Notice that we created a directory for our templates in `custom_app`
    called `templates/custom_app/hello.html`. That might look like
    redundancy, but it is intentional. The convention in Django is to create
    a separately named directory under `templates` for each Django app. From
    the [Django docs](https://docs.djangoproject.com/en/1.11/topics/templates/):

    > It’s possible – and preferable – to organize templates in
    > subdirectories inside each directory containing templates. The convention
    > is to make a subdirectory for each Django app, with subdirectories within
    > those subdirectories as needed.

7.  Create a url mapping for this view in
    `$HOME/custom-django-app/custom_app/urls.py`.

```python
from django.conf.urls import url, include

from . import views

app_name = 'custom_app'
urlpatterns = [
    url(r'^hello/', views.hello_world, name="home"),
]
```

Note that
[`app_name` specifies the namespace](https://docs.djangoproject.com/en/1.11/topics/http/urls/#url-namespaces-and-included-urlconfs)
for your app's urls and should be changed to something appropriate for your app.

8. That defines a basic Hello World Django app. To preview and develop this
   Django app further we need to install it into a locally running Django
   portal. See
   [the README.md](https://github.com/apache/airavata-django-portal/blob/master/README.md)
   for notes on getting the Django portal installed locally. Let's assume you
   install the Django portal locally in `$HOME/airavata-django-portal`. To
   install the custom Django app in that portal you would:

```bash
# First activate the Django portal's virtual environment
cd $HOME/airavata-django-portal
source venv/bin/activate
# Then change to the custom app and install it in develop mode
cd $HOME/custom-django-app
python setup.py develop
```

Now when you log into the Django portal at <http://localhost:8000> you should
see the custom app in the dropdown menu in the top of the page (the one that
defaults to **Workspace** when you login).

## Next Steps

### AiravataAPI JS library

To use the `airavata-api.js` JavaScript library to call the Django portal REST
API (which in turn calls the Airavata API), you can include it in your templates
in the `scripts` block:

```django
{% block scripts %}
<script src="{% static 'django_airavata_api/dist/airavata-api.js' %}"></script>
<script>
    const { models, services, session, utils } = AiravataAPI;

    // Your code here ...
</script>
{% endblock scripts %}
```

For more information on the AiravataAPI library:

-   see the
    [Gateways tutorial](../tutorial/gateways_tutorial.md#tutorial-exercise-create-a-custom-django-app)
-   see the
    [index.js](https://github.com/apache/airavata-django-portal/blob/master/django_airavata/apps/api/static/django_airavata_api/js/index.js)
    file in the AiravataAPI to see what models and services are provided by the
    library

### Custom Django apps

There are now several examples of custom Django apps that can be learned from:

-   <https://github.com/SciGaP/simccs-maptool>
-   <https://github.com/InterACTWEL/interactactwel-django-app>

# Custom Output View Provider

A custom _output view provider_ generates visualizations of experiment outputs.
Output view providers are implemented as a Python function and packaged as a
Python package, with the requisite metadata (more on this below). An output view
provider is associated with the output of an application in the Application
Catalog.

There are several different output view display types, such as: image, link, or
html. If configured an output view will be displayed for an output file and the
Airavata Django Portal will invoke the custom output view provider to get the
data to display. For example, if the output view display type is image, then the
output view provider will be invoked and it should return image data.

## Getting started

See the
[Gateways tutorial](../tutorial/gateways_tutorial.md#tutorial-exercise-create-a-custom-output-viewer-for-an-output-file)
for help on setting up a development environment and implementing a simple
output view provider.

You can use this as a starting point to create your own custom output view
provider. Here is what you would need to change:

1. First add your custom output view provider implementation to
   `output_views.py`.
2. Rename the Python package name in `setup.py`.
3. Update the `install_requires` list of dependencies based on what your custom
   output view provider requires.
4. Rename the Python module folder from `./gateways2019_tutorial` to whatever
   you want to call it.
5. Rename the output view provider in the `entry_points` metadata in `setup.py`.
   For example, if you wanted to name your output view provider
   `earthquake-sites-visualization` and you renamed your Python module folder
   from `./gateways2019_tutorial` to `./earthquake_gateway`, then you could have
   the following in the `entry_points`:

```
...
    entry_points="""
[airavata.output_view_providers]
earthquake-sites-visualization = earthquake_gateway.output_views:EarthquakeSitesViewProvider
""",
```

6. If you don't need a Django app, you can remove the `[airavata.djangoapp]`
   section from `entry_points`.

Please note, if you update `setup.py` and you're doing local development, you'll
need to reinstall the package into your local Django instance's virtual
environment using:

```bash
python setup.py develop
```

### Setting up remote data access

To access the files in the remote deployed Django portal instance in your local
development environment you need to configure a setting so that your local
Django instance knows at what URL is the remote deployed Django portal REST API.
The remote API will be used for accessing data, making your local instance
behave just like the remote instance. Set the GATEWAY_DATA_STORE_REMOTE_API in
settings_local.py to have the domain of the remote deployed Django portal:

```
# Change this to match your remote Django portal instance
GATEWAY_DATA_STORE_REMOTE_API = 'https://testdrive.airavata.org/api'
```

## Reference

### Output View Provider interface

Output view providers should be defined as a Python class. They should define
the following attributes:

-   `display_type`: this should be one of _link_, _image_ or _html_.
-   `name`: this is the name of the output view provider displayed to the user.

Optional attributes that can be defined on the output view provider class
include:

-   `test_output_file`: this is a file path to an file that will be substituted
    for the actual file for testing the output view provider. This is only used
    during development and will only work with the Django DEBUG setting is True.
    For more information, see
    [Using test_output_file in development](#using-test_output_file-in-development).

The output view provider class should define the following method:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, **kwargs):

    # Return a dictionary
    return {
        #...
    }
```

For the output view provider to work with experiment outputs of type
URI_COLLECTION, add `output_files=None` to the function signature and get the
output as a list of file objects.

```python
# For URI_COLLECTION, add output_files=None to signature
def generate_data(self, request, experiment_output, experiment, output_files=None, **kwargs):

    # Return a dictionary
    return {
        #...
    }
```

The required contents of the dictionary varies based on the _display type_.

#### Display type link

The returned dictionary should include the following entries:

-   url
-   label

The _label_ is the text of the link. Generally speaking this will be rendered
as:

```html
<a href="{{ url }}">{{ label }}</a>
```

**Examples**

-   [SimCCS Maptool - SolutionLinkProvider](https://github.com/SciGaP/simccs-maptool/blob/master/simccs_maptool/output_views.py#L5)

#### Display type image

The returned dictionary should include the following entries:

-   image: a stream of bytes, i.e., either the result of `open(file, 'rb')` or
    something equivalent like `io.BytesIO`.
-   mime-type: the mime-type of the image, for example, `image/png`.

**Examples**

-   [AMP Gateway - TRexXPlotViewProvider](https://github.com/SciGaP/amp-gateway-django-app/blob/master/amp_gateway/plot.py#L115)

#### Display type html

The returned dictionary should include the following entries:

-   output: a raw HTML string
-   js: a static URL to a JavaScript file, for example,
    `/static/earthquake_gateway/custom-leaflet-script.js`.

**Examples**

-   [dREG - DregGenomeBrowserViewProvider](https://github.com/SciGaP/dreg-djangoapp/blob/master/dreg_djangoapp/output_views.py#L4)

### Entry Point registration

Custom output view providers are packaged as Python packages in order to be
deployed into an instance of the Airavata Django Portal. The Python package must
have metadata that indicates that it contains a custom output view provider.
This metadata is specified as an _entry point_ in the package's `setup.py` file
under the named parameter `entry_points`.

The entry point must be added to an entry point group called
`[airavata.output_view_providers]`. The entry point format is:

```
label = module:class
```

The _label_ is the identifier you will use when associating an output view
provider with an output file in the Application Catalog. As such, you can name
it whatever you want. The _module_ must be the Python module in which exists
your output view provider. The _class_ must be the name of your output view
provider class.

See the **Getting Started** section for an example of how to format the entry
point in `setup.py`.

### Associating an output view provider with an output file

In the Application Catalog, you can add JSON metadata to associate an output
view provider with an output file.

1. In the top navigation menu in the Airavata Django Portal, go to **Settings**.
2. If not already selected, select the **Application Catalog** from the left
   hand side navigation.
3. Click on the application.
4. Click on the **Interface** tab.
5. Scroll down to the _Output Fields_ and find the output file with which you
   want to associate the output view provider.
6. In the _Metadata_ field, add or update the `output-view-providers` key. The
   value should be an array (beginning and ending with square brackets). The
   name of your output view provider is the label you gave it when you created
   the entry point.

The _Metadata_ field will have a value like this:

```json
{
    "output-view-providers": ["gaussian-eigenvalues-plot"]
}
```

Where instead of `gaussian-eigenvalues-plot` you would put or add the label of
your custom output view provider.

There's a special `default` output view provider that provides the default
interface for output files, namely by providing a download link for the output
file. This `default` output view provider will be shown initially to the user
and the user can then select a custom output view provider from a drop down
menu. If, instead, you would like your custom output view provider to be
displayed initially, you can add the `default` view provider in the list of
output-view-providers and place it second. For example:

```json
{
    "output-view-providers": ["gaussian-eigenvalues-plot", "default"]
}
```

would make the `gaussian-eigenvalues-plot` the initial output view provider. The
user can access the default output view provider from the drop down menu.

### Accessing additional experiment output files

The output view provider is associated with a particular output file, but your
output view provider can access other files in the experiment data directory. To
access those files use the `list_experiment_dir` of the
[user_storage module](https://airavata-django-portal-sdk.readthedocs.io/en/latest/#module-user_storage)
in the Airavata Django Portal SDK.

```python
from airavata_django_portal_sdk import user_storage
def generate_data(self, request, experiment_output, experiment, output_file=None, **kwargs):

    dirs, files = user_storage.list_experiment_dir(request, experiment.experimentId)
    # ...
```

`list_experiment_dir` returns a tuple of directories and files in the experiment
data directory. Each entry is a dictionary of metadata about the directory/file.
See the SDK documentation for more information.

### Using test_output_file in development

The output view provider class can specify a `test_output_file` attribute. The
value should be the file path to a sample output file within the output view
provider's Python package. For an example of how to set `test_output_file`, see
[this example](https://github.com/machristie/gateways19-tutorial/blob/044d4c6ddda48e7d0fa17f6c1d84936919c9303c/gateways19_tutorial/output_views.py#L14).
This file will substitute for the real experiment output file when the Django
DEBUG setting is True and the output view provider request is made in _test
mode_. This can be used to develop the output view provider with a sample output
file when access to an actual experiment generated output file is not easily
available (see [Setting up remote data access](#setting-up-remote-data-access)
for information on using experiment outputs in your local development
environment if experiment generated output files are an option for you).

To enable _test mode_, you have two options. First, you can test the output view
provider REST API directly and add a query parameter of `test-mode=true`:

    http://localhost:8000/api/image-output?experiment-id=...expid...&experiment-output-name=Gaussian-Application-Output&provider-id=gaussian-eigenvalues-plot&test-mode=true

But substitute your experiment id, etc and change `image-output` to
`html-output` or `link-output` or whatever display type is appropriate for your
output view provider. You can load the output view in the Airavata Django Portal
and then in your browser's developer tools, find the REST API request, open it
in a new tab and change the test-mode value to `true`.

Second, you can modify the output view provider UI to always pass
`test-mode=true` when making REST API requests to load data from output view
providers. To do this, open the OutputViewDataLoader.js file and change
TEST_MODE to `true`:

```javascript
const TEST_MODE = true;
```

Then in `django_airavata/apps/workspace` run `yarn && yarn build` (or
`yarn && yarn serve` if you are developing frontend code).

### Interactive parameters

You can add some interactivity to your custom output view provider by adding one
or more interactive parameters. An interactive parameter is a parameter that
your custom output view provider declares, with a name and current value. The
Airavata Django Portal will display all interactive parameters in a form and
allow the user to manipulate them. When an interactive parameter is updated by
the user, your custom output view provider will be again invoked with the new
value of the parameter.

To add an interactive parameter, you first need to add a keyword parameter to
your `generate_data` function. For example, let's say you want to add a boolean
`show_grid` parameter that the user can toggle on and off. You would change the
signature of the `generate_data` function to:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, show_grid=False, **kwargs):

    # Return a dictionary
    return {
        #...
    }
```

In this example, the default value of `show_grid` is `False`, but you can make
it `True` instead. The default value of the interactive parameter will be its
value when it is initially invoked. It's recommended that you supply a default
value but the default value can be `None` if there is no appropriate default
value.

Next, you need to declare the interactive parameter in the returned dictionary
along with its current value in a special key called `interactive`. For example:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, show_grid=False, **kwargs):

    # Return a dictionary
    return {
        #...
        'interactive': [
            {'name': 'show_grid', 'value': show_grid}
        ]
    }
```

declares the interactive parameter named `show_grid` and its current value.

The output view display will render a form showing the value of `show_grid` (in
this case, since it is boolean, as a checkbox).

#### Supported parameter types

Besides boolean, the following additional parameter types are supported:

| Type    | UI Control              | Additional options                                                                                          |
| ------- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| Boolean | Checkbox                |                                                                                                             |
| String  | Text input              |                                                                                                             |
| Integer | Stepper or Range slider | `min`, `max` and `step` - if `min` and `max` are supplied, renders as a range slider. `step` defaults to 1. |
| Float   | Stepper or Range slider | `min`, `max` and `step` - if `min` and `max` are supplied, renders as a range slider.                       |

Further, if the interactive parameter defines an `options` list, this will
render as a drop-down select. The `options` list can either be a list of
strings, for example:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, color='red', **kwargs):

    # Return a dictionary
    return {
        #...
        'interactive': [
            {'name': 'color', 'value': color, 'options': ['red', 'green', 'blue']}
        ]
    }
```

Or, the `options` list can be a list of `(text, value)` tuples:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, color='red', **kwargs):

    # Return a dictionary
    return {
        #...
        'interactive': [
            {'name': 'color', 'value': color, 'options': [('Red', 'red'), ('Blue', 'blue'), ('Green', 'green')]}
        ]
    }
```

The `text` is what is displayed to the user as the value's label in the
drop-down. The `value` is what will be passed to the output view provider when
selected by the user.

#### Additional configuration

The following additional properties are supported:

-   **label** - by default the name of the interactive parameter is its label in
    the interactive form. You can customize the label with the `label` property.
-   **help** - you can also display help text below the parameter in the
    interactive form with the `help` property.

For example:

```python
def generate_data(self, request, experiment_output, experiment, output_file=None, color='red', **kwargs):

    # Return a dictionary
    return {
        #...
        'interactive': [
            {'name': 'color',
            'value': color,
            'options': [('Red', 'red'), ('Blue', 'blue'), ('Green', 'green')],
            'label': 'Bar chart color',
            'help': 'Change the primary color of the bar chart.'}
        ]
    }
```

# Code Standards

For the Python code we follow the
[PEP8 standard](https://www.python.org/dev/peps/pep-0008/). A linter called
`flake8` is used to verify adherence to the standard.

## Setting up dev environment

```bash
source venv/bin/activate
pip install -r requirements-dev.txt
```

## Running flake8

```
flake8 .
```

## Automatically formatting Python code

```
autopep8 -i -aaa -r .
isort .
```

# Getting started with Vue.js development

Make sure you have
[the latest version of Node.js LTS installed](https://nodejs.org/en/download/).
You also need to install [the Yarn package manager](https://yarnpkg.com).

Start the Django portal (`python manage.py runserver`). Navigate to the Django
app directory and run `yarn` and then `yarn` to start up the dev server. Now you
can load the Django app in your browser and as you make code changes they should
automatically be hot-reloaded in the browser. For example, if you wanted to work
on the _workspace_ app's frontend code, you could do

```
cd django_airavata/apps/workspace
yarn
yarn run serve
```

Then in your browser go to
[http://localhost:8000/workspace/dashboard](http://localhost:8000/workspace/dashboard).

Note: after stopping the dev server the portal will still keep trying to load
the app's JS and CSS from the dev server URLs, which it will fail to do. To go
back to a pre dev server state run:

```
yarn run build
```

# Development

## Adding a dependency

If you need to add a JavaScript dependency, run the following:

```
yarn add <name of dependency>
```

This automatically updates the `package.json` file with the added dependency.
The `yarn.lock` file is also updated with a locked version of the added
dependency.

## Adding an entry point

Create an entry point for the Vue app in a new javascript file. The naming
convention is to name the entry point `entry-<name of entry point>.js`. For
example, `entry-something-list.js`. The entry point shouldn't require compiling
a Vue template since we don't include the template compiler in the runtime. The
entry point will generally have the following structure:

```javascript
import { components, entry } from "django-airavata-common-ui";
import SomethingListContainer from "./containers/SomethingListContainer.vue";

entry((Vue) => {
    new Vue({
        render: (h) => h(components.MainLayout, [h(SomethingListContainer)]),
    }).$mount("#something-list");
});
```

If you need to pass data into the Vue app, see below.

vue-cli calls entry points "pages". Edit `vue.config.js` and add an entry to the
"pages" config. For example, to add an entry point with the key "something-list"
and that is defined in the file
"static/django_airavata_myapp/js/entry-something-list.js", you would add:

```javascript
pages: {
  // ...
  "something-list": "static/django_airavata_myapp/js/entry-something-list.js"
}
```

Now you need a template that will load the entry point. For the simple case you
can just use the base.html template and pass in the `bundle_name` which should
equal the page key that you entered in vue.config.js. So in `views.py`, add the
following view function:

```python
@login_required
def something_list(request):
    # request.active_nav_item = ... # update this as appropriate
    return render(request, 'django_airavata_myapp/base.html', {
        'bundle_name': 'something-list'
    })
```

### Passing data through template to the Vue.js app

If you need to pass data from the backend to the frontend Vue.js app, you need
to make that data available to the Django template and then pass it to the
Vue.js app via a data attribute. For example, let's say we have a
_something-view_ and we need to pass _something-id_ to the Vue.js app, we could
do the following:

First, define a URL pattern that allows passing the id in urls.py:

```python
url(r'^something/(?P<something_id>\w+)/$', views.view_something,
    name='view_something'),
```

Then define the view function in views.py:

```python
@login_required
def view_something(request, something_id):
    # request.active_nav_item = ... # update this as appropriate
    return render(request, 'django_airavata_myapp/view_something.html', {
        'bundle_name': 'view-something',
        'something_id': something_id
    })
```

Then create a template that passes the something_id as a data attribute. We'll
name the template view_something.html which will extend the local base.html
template:

```django
{% extends './base.html' %}
{% block content %}
<div id="{{ bundle_name }}" data-something-id="{{ something_id }}"></div>
{% endblock content %}
```

In the entry point, load the data attribute in the `mounted()` hook and pass to
the Vue.js app container via a property:

```javascript
import { components, entry } from "django-airavata-common-ui";
import ViewSomethingContainer from "./containers/ViewSomethingContainer.vue";

entry((Vue) => {
    new Vue({
        render(h) {
            return h(components.MainLayout, [
                h(ViewSomethingContainer, {
                    props: {
                        somethingId: this.somethingId,
                    },
                }),
            ]);
        },
        data() {
            return {
                somethingId: null,
            };
        },
        beforeMount() {
            this.somethingId = this.$el.dataset.somethingId;
        },
    }).$mount("#view-something");
});
```

## Automatically formatting source code

Run `prettier --write .` with the following:

```
yarn format
```

## Recommended tools

-   <https://github.com/vuejs/vue-devtools> - debugging/inspection in Firefox
    or Chrome
-   <https://vuejs.github.io/vetur/> - Vue tooling for Visual Studio Code

# Developing a Custom Input Validator
The Airavata Django Portal integrates validation for both text input and file validation. The following documentation serves to discuss the instructions to implement a new custom input validator.

The first step in implementing a new validator is to determine the input for the validator. If the input will be text from a text-box, it will be necessary to implement a validator to handle text input. If the input will be a file (e.g., a PDB file), it will be necessary to both implement a file validation script and to extend the implementation to support this new validation method. To learn how to implement a text input validator, refer to the [Text Input Validator Instructions](#text-input-validator-instructions). To learn how to implement a file input validator, refer to the [File Input Validator Instructions](#file-input-validator-instructions)

## Text Input Validator Instructions
The following instructions serve to discuss the method of developing a new text input validation method.

1. Create a new `javascript` file that will house the custom validator
    * Navigate to the directory `rna-nanostructures/django_airavata/apps/api/static/django_airavata_api/js/models/validators/`
    * Create a new `javascript` file that will contain the validator for the provided input
        * For example, `MyCustomValidator.js` where, `MyCustomValidator` is the name of the validator that will be made and will become the name of the validator class.
2. Create a new option in the `Validator Factory`
    * Naviagate to the file `rna-nanostructures/django_airavata/apps/api/static/django_airavata_api/js/models/validators/ValidatorFactory.js`
    * Import the new validator created in Step 1 into the `ValidatorFactory.js` file
        * `import MyCustomValidator from "./MyCustomValidator";`
        * **NOTE:** Replace MyCustomValidator with the name of the validator that has been specified in Step 1.
    * Add a new reference entry to the `VALIDATOR_MAPPING` object
        * `custom_validator: MyCustomValidator,`
        * **NOTE:** Replace `custom_validator` with the name of the validator as you wish Users to reference it in the front-end configuration
3. Implement the input editor to validate the text input as desired
    * Navigate to the file created in Step 1.
    * Create the validator to validate the input using the desired configurations and the desired output messages. It is worth noting that the essential components are the `validate()` function, and the `MyCustomValidator` class, where `MyCustomValidator` is replaced with the naming scheme established for Step 1.
    * As a reference, the following skeleton code has been provided. For additional references, refer to the `MaxLengthValidator.js` file or the `MinLengthValidator.js` file.
        * ```javascript
          export default class MyCustomValidator {
            constructor(config) {
                // Here you should collect any configurations that you desire (i.e., the minimum length of the text input)
                this.myConfig = config["value"];
                if ("message" in config) {
                  this.customErrorMessage = config["message"];
                }
            }

            validate(value) {
                if (value === null || typeof value === "undefined") {
                  return this.getErrorMessage(value);
                }
                if (typeof value !== "string") {
                  value = value.toString();
                }

                // Validate the text input here and return the error message
                if (valid) {
                 return this.getErrorMessage(value);
                }
                
                return null;
            }

            getErrorMessage() {
                if (this.customErrorMessage) {
                  return this.customErrorMessage;
                } else {
                  return ("This is my default error message");
                }
            }
          }
          ```

## File Input Validator Instructions
The following instructions serve to discuss the approach that should be taken to implement a file input validator. These instructions assume that a file validation script has already been implemented. If a file validation script has not yet been implemented, please do so prior to completing the following instructions. Refer to the `pdb_parser.py` file as an example.

1. Create a new `javascript` file that will house the custom validator
    * Navigate to the directory `rna-nanostructures/django_airavata/apps/api/static/django_airavata_api/js/models/validators/`
    * Create a new `javascript` file that will contain the validator for the provided input
        * For example, `MyCustomValidator.js` where, `MyCustomValidator` is the name of the validator that will be made and will become the name of the validator class.
2. Create a new option in the `Validator Factory`
    * Naviagate to the file `rna-nanostructures/django_airavata/apps/api/static/django_airavata_api/js/models/validators/ValidatorFactory.js`
    * Import the new validator created in Step 1 into the `ValidatorFactory.js` file
        * `import MyCustomValidator from "./MyCustomValidator";`
        * **NOTE:** Replace MyCustomValidator with the name of the validator that has been specified in Step 1.
    * Add a new reference entry to the `VALIDATOR_MAPPING` object
        * `custom_validator: MyCustomValidator,`
        * **NOTE:** Replace `custom_validator` with the name of the validator as you wish Users to reference it in the front-end configuration
3. Create a new method to handle collecting the User-provided file and to validate the file using the implemented file validation script.
    * Navigate to the `rna-nanostructures/django_airavata/apps/api/views.py` file
    * Import the `validation()` method responsible for validating a file
        * For example, the `validate_pdb()` method provided in the `pdb_parser.py` file
    * Create a new validation method at the bottom of the file that will be responsible for collecting the User-provided file and for calling the `validation()` method imported. Use the following template to implement this method. Note that the method name `file_validation()` can be modified to your desired naming.
        * ```python
          def file_validation(request):
            # Get the data product URI that contains the User-provided file
            data_product_uri = request.GET['dataProductURI']
            try:
                data_product = request.airavata_client.getDataProduct(request.authz_token, data_product_uri)
            except Exception as e:
                log.warning("Failed to load DataProduct for {}"
                            .format(data_product_uri), exc_info=True)
                # The system was unable to collect the specified data product URI
                raise Http404("data product does not exist") from e
            # Attempt to validate the file using the provided validation method
            try:
                # Create the new Python file object using the built-in API open_file method
                file = user_storage.open_file(request, data_product)

                # Validate the file and collect the errors returned
                # TODO: Replace the validate_file() method with your own imported method
                validation_error = validate_file(file)
                
                # Return the validation error as an HTTP response
                return HttpResponse(json.dumps(
                    {
                        'okay': validation_error is None,
                        'reason': str(validation_error),
                    }
                ))
            except ObjectDoesNotExist as e:
                raise Http404(str(e)) from e  
          ```
4. Add a new URL to the `urlpatterns` list to ensure that the system is able to effectively post the file to the server on User-provided file on User input
    * Navigate to the `rna-nanostructures/django_airavata/apps/api/urls.py` file
    * Append a new URL to the `urlpatterns` list using the following formatting:
        * `url(r'^my-custom-validator', views.file_validation),`
        * **NOTE:** Replace `my-custom-validator` with the name of the custom validator and replace `file_validation` with the name of the method implemented in Step 3.
5. Implement the custom `javascript` validation file created in Step 1.
    * Navigate to the file created in Step 1
    * Using the following template implement the respective class
        * ```javascript
          import FetchUtils from "../../utils/FetchUtils";
          export default class MyCustomValidator {
            constructor(config) {
                this.customErrorMessage = null;
                
                // Collect the alternative custom output message provided in the configurations
                if ("message" in config) {
                  this.customErrorMessage = config["message"];
                }
            }

            validate(value) {
                if (value === null || typeof value === "undefined") {
                  return 'The provided input must be a file.';
                }

                // TODO: Replace `my-custom-validator` with the value implemented as the url in Step 4
                return FetchUtils.get('/api/my-custom-validator', {
                  dataProductURI: value,
                }).then((response) => {
                  return response['reason']
                }).catch((error) => {
                  return error
                })
            }
          }
6. Now with this all of the setup complete to add the file validation: 
    * start the application and navigate to the settings screen and then to the application you wish to edit.
    * Once in the settings screen, select the application that you want to add validation to.
    * Now navigate to interface.
    * In the Input fields section make sure the input type is URI
    * For the validation add in the Advanced Input Field Modification Metadata section:
        * ```json
            {
                "editor": {
                    "validations": [
                        {
                            "type": "custom_validator"
                        }
                    ]
                }
            }
          ```
          **NOTE:** The "custom_validator" would change to be name given in the validatorFacotry
    * Click save at the bottem.
    * Now the validator should be added to that input of the application
    * **NOTE:** for more information about app inputs checkout: https://github.com/cseseniordesign/rna-nanostructures/blob/documentation/docs/admin/app_inputs.md

# Developing Custom Output Viewers
The following documentation serves to provide information regarding the method of extending the existing front-end to support new custom output viewers. As a reference, information will be provided regarding the approach taken to develop the custom `Molecule Viewer` and the custom `Table Viewer` implemented for the RNA Nanostructures Science Gateway. This document serves to act as a set of instructions for developing a custom output viewer; however additional documentation regarding setup and testing of the custom output viewers can be found [here](https://github.com/cseseniordesign/rna-nanostructures/blob/master/docs/dev/custom_output_view_provider.md)

1. For all viewers that will require any `npm` dependencies, the file `rna-nanostructures/django_airavata/apps/workspace/package.json` should be updated to include the respective package and the version to be used in the application. This can be done by using the command `yarn add dependency` where `dependency` is the name of the `npm` package name within the location `rna-nanostructures/django_airavata/apps/workspace`.
2. Update the `views.py` to support the new custom output viewer by collecting the required data from the server
    * Navigate to the `rna-nanostructures/django_airavata/apps/api/views.py` file
    * Add a new API View method by following the below pattern. This should be appended to the end of the file (near approximately line 1967).
        * ```python
          @api_view()
          def your_new_custom_output_view(request):
              data = _generate_output_view_data(request)
              return Response(data)
          ```
        * **NOTE:** Replace `your_new_custom_` with the name of the new custom output viewer that will be added
3. To prepare the Airavata Django Portal server to support the new custom output viewer, update the `urls.py` file to include the custom output viewer
    * Navigate to the `rna-nanostructures/django_airavata/apps/api/urls.py` file
    * Append a new URL to the `urlpatterns` list where `your-new-custom` are replaced with the name of the output view that you wish to implement and `your_new_custom_` is replaced with the naming used:
        * `url(r'^your-new-custom-output', views.your_new_custom_output_view, name="your-new-custom-output"),`
        * **NOTE:** Ensure that the `name` element and the element following `r'^` are equivalent
4. Create a new file to contain the custom output view
    * Create a new output display `Vue` file within the `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/` directory (e.g., `YourCustomOutputDisplay.vue`)
5. Add a new custom output data type to the Output Display Container
    * Navigate to the `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/OutputDisplayContainer.vue` file
    * Update the imports specified on approximately lines 31-41 to include the file created in Step 4. The name of the class imported from the file should be equivalent to the name of the file, but the `.vue` element will be removed.
    * Update the `components` on approximately lines 64-74 to include the imported class specified in the previous step
    * Append a new data type to the `displayTypeData()` object on approximately line 96 using the following format where the name of the component is equivalent to the component name previously specified; however, the name formatting should be modifed to be dash-separated lowercase.
        * ```javascript
          custom_output: {
            component: "your-custom-output-display",
            url: "/api/your-new-custom-output/",
          }
        * **NOTE:** The element of the URL following `/api/` in the above code should be equivalent to the name of `your-new-custom-output` used in Step 1.
6. Implement an output view provider to enable access to the output view implementation
    * Navigate to the `rna-nanostructures/django_airavata/apps/api/output_views.py` file
    * Implement a new output view provider by creating a dictionary with the desired elements. For situations requiring an output file, the `output_file` parameter has been provided. The following code snippet provides reference to the approach that may be taken to implement this provider.
        * ```python
          class YourCustomViewProvider:
            display_type = 'custom_output'
            name = 'Your Custom Output'

            def generate_data(self, request, experiment_output, experiment, output_file=None, **kwargs):
                return {
                    'key': output_file
                }
        * **NOTE:** Replace the `display_type` value with the name of the object specified in Step 5 (i.e., `custom_output`); replace the `name` value with the name of the custom output viewer as you desire it to be presented to the User; update the dictionary returned in the `generate_data()` method to include the data that you wish to utilize for the custom output viewer.
7. Implement the output viewer
    * Within the new file created for Step 4, create a new `<template>` to embed the output view within. References for this can be observed within the alternative existing output views. Note that the template should be implemented for the type of output that you wish to display to the user (e.g., an image).
    * In the new file, create a new `<script>` that will contain the implementation to create the desired output view and update the `template` to present this to the User
    * **NOTE:** The `<script>` should access the desired data with the expectation that the provided data will be provided as implemented in the dictionary created in Step 4. That is, the keys and value established in Step 4 will also be accessible in the implementation for the output viewer. References to approaches that may be taken to implement an output viewer are available in the other output view files in the current directory (e.g., `PdbTableOutputDisplay.vue`). Finally, the name of the object implemented within the `<script>` should be equivalent to the name of the component that was established in Step 3. (i.e., what you changed `your-custom-output-display` to be)

### References
The University of Nebraska-Lincoln Senior Design Team implemented two new custom output viewers for their project. The locations of the files changed and their respective files are documented below:
* GLMol Output Viewer
    * File: `rna-nanostructures/django_airavata/apps/api/views.py`
    * File: `rna-nanostructures/django_airavata/apps/api/urls.py` 
    * File: `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/OutputDisplayContainer.vue` 
    * File: `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/MoleculeOutputDisplay.vue`
    * File: `rna-nanostructures/django_airavata/apps/api/output_views.py`
    * Imports: 
        * File: `rna-nanostructures/django_airavata/static/glmol/ChemDoodleWeb.js`
        * File: `rna-nanostructures/django_airavata/static/glmol/ChemDoodleWeb.css`
        * File: `rna-nanostructures/django_airavata/apps/workspace/templates/django_airavata_workspace/view_experiment.html`
* PDB Table Viewer
    * File: `rna-nanostructures/django_airavata/apps/api/views.py`
    * File: `rna-nanostructures/django_airavata/apps/api/urls.py` 
    * File: `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/OutputDisplayContainer.vue` 
    * File: `rna-nanostructures/django_airavata/apps/workspace/static/django_airavata_workspace/js/components/experiment/output-displays/PdbTableOutpuDisplay.vue`
    * File: `rna-nanostructures/django_airavata/apps/api/output_views.py`
    * Imports: `rna-nanostructures/django_airavata/apps/workspace/package.json`

# Adding a Django App

The functionality of the Airavata Django Portal is broken up into separate
Django apps. The apps live in the `django_airavata/apps` directory. When adding
new functionality to the Django portal it may make sense to add it as a new
separate Django app instead of adding it to an existing app. The following steps
document how to do this.

## Create the new Django App

For this example, assume the name of the app is **myapp**. The following also
assumes you have sourced your virtual environment.

```
cd airavata-django-portal
mkdir django_airavata/apps/myapp
python manage.py startapp myapp django_airavata/apps/myapp
```

## Integrating with the Django Portal

### AppConfig settings

Edit the AppConfig so that it extends the AiravataAppConfig and fill in the
required details:

```python
from django_airavata.app_config import AiravataAppConfig


class MyAppConfig(AiravataAppConfig):
    name = 'django_airavata.apps.myapp'
    label = 'django_airavata_myapp'
    verbose_name = 'My App'
    app_order = 10
    url_home = 'django_airavata_myapp:home'
    fa_icon_class = 'fa-bolt'
    app_description = """
        My app for doing stuff in the Airavata Django Portal.
    """
    nav = [
        {
            'label': 'Dashboard',
            'icon': 'fa fa-tachometer-alt',
            'url': 'django_airavata_myapp:dashboard',
            'active_prefixes': ['dashboard']
        },
        # ... additional entries as needed
    ]
```

Some of these are self explanatory, but here are some details on each of these
properties:

- _name_ - this is the python package of the app
- _label_ - this needs to be unique across all installed Django apps. I just
  make this match the _app_name_ in `urls.py`.
- _verbose_name_ - display name of app
- _app_order_ - order of app in the menu listing. Range is 0 - 100. See the
  other Django apps for their values to figure out how to order this app
  relative to them.
- _url_home_ - namespaced url of the "home" page of this app. This will be the
  url used when a user selects this app in a navigational menu.
- _fa_icon_class_ - a FontAwesome icon class. See
  [the list of available icons for v. 4.7](https://fontawesome.com/v4.7.0/icons/).
- _app_description_ - description of this app
- _nav_ - **optional** provide navigation into sections of the app. The _nav_ is
  optional but is necessary to provide users with a link from the left hand side
  navigation bar to a url in your app.
    - _label_ - textual label, displayed on hover in the side navigation bar
    - _icon_ - FontAwesome icon, see _fa_icon_class_ above
    - _url_ - named or namespaced url
    - _active_prefixes_ - list of strings that come after this app's base url for
        all urls that are considered "active" for this nav item. This is used to
        highlight the currently active nav item in the left side navigation bar. For
        example, let's say the app's base url is "/myapp" and urls belonging to the
        "projects" nav item are of the form "/myapp/projects/`<project_id>`" and
        "/myapp/new-project". Then you would set _active_prefixes_ to `["projects", "new-project"]`.

### Add AppConfig to INSTALLED_APPS

Edit INSTALLED_APPS in settings.py:

```python
INSTALLED_APPS = [
  # ...
  'django_airavata.apps.myapp.MyAppConfig'
]
```

### Add Webpack bundle loader config to settings.py

If the new app has Webpack built frontend, then add the following configuration
to WEBPACK_LOADER in settings.py:

```python
...
'MYAPP': {
  'BUNDLE_DIR_NAME': 'django_airavata_myapp/dist/',
  'STATS_FILE': os.path.join(
      BASE_DIR,
      'django_airavata',
      'apps',
      'myapp',
      'static',
      'django_airavata_myapp',
      'dist',
      'webpack-stats.json'),
  'TIMEOUT': 60,
},
...
```

### Add the apps urls to the site's urls.py

Edit `django_airavata/urls.py` and add the app's urls config:

```python
urlpatterns = [
    url(r'^djadmin/', admin.site.urls),
    url(r'^admin/', include('django_airavata.apps.admin.urls')),
    url(r'^auth/', include('django_airavata.apps.auth.urls')),
    url(r'^workspace/', include('django_airavata.apps.workspace.urls')),
    url(r'^api/', include('django_airavata.apps.api.urls')),
    url(r'^groups/', include('django_airavata.apps.groups.urls')),
    # ... Add the app urls here
    url(r'^myapp/', include('django_airavata.apps.myapp.urls')),
    # ...
    url(r'^home$', views.home, name='home'),
    url(r'^cms/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),
    url(r'', include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

It's important that the app urls are added before the `wagtail_urls` since
wagtail controls those urls.

## App urls.py and base template

Let's add a starter home page and urls.py config for this app. Create a
`urls.py` file in `myapp/`:

```python
from django.conf.urls import url

from . import views

app_name = 'django_airavata_myapp'
urlpatterns = [
    url(r'^home$', views.home, name='home'),
]
```

Add a view function called `home` in views.py:

```python
from django.shortcuts import render


def home(request):
    return render(request, 'django_airavata_myapp/home.html')
```

Create a templates directory called in `myapp` called
`templates/django_airavata_myapp/`.

Then create a base template in that directory called `base.html`. We'll create
this file assuming that it will load webpack bundles generated by vue-cli:

```django

{% extends 'base.html' %}

{% load static %}
{% load render_bundle from webpack_loader %}

{% block css %}
{% render_bundle 'chunk-vendors' 'css' 'MYAPP' %}
{% comment %}BUT NOTE: if you only have one entry point you won't have a 'chunk-common' bundle so you may need to comment out the next line until you have more than one entry point.{% endcomment %}
{% render_bundle 'chunk-common' 'css' 'MYAPP' %}
{% render_bundle bundle_name 'css' 'MYAPP' %}
{% endblock %}

{% block content %}
<div id="{{ bundle_name }}"/>
{% endblock %}


{% block scripts %}
{% render_bundle 'chunk-vendors' 'js' 'MYAPP' %}
{% comment %}BUT NOTE: if you only have one entry point you won't have a 'chunk-common' bundle so you may need to comment out the next line until you have more than one entry point.{% endcomment %}
{% render_bundle 'chunk-common' 'js' 'MYAPP' %}
{% render_bundle bundle_name 'js' 'MYAPP' %}
{% endblock %}
```

Now, create a `home.html` template:

```html
{% extends './base.html' %}
{% load static %}
{% block css %}
{% comment %}This isn't a Vue.js app, so just turn off loading CSS.{% endcomment %}
{% endblock %}
{% block content %}

<h1>Hello World!</h1>

{% endblock content %}
{% block scripts %}
{% comment %}This isn't a Vue.js app, so just turn off loading JavaScript.{% endcomment %}
{% endblock %}
```

Now if you log into the Django portal you should see "My App" in the menu at the
top and clicking on it should display the home page of this app.

## JS build config - Vue.js

Now we'll add JavaScript build config to the app using Vue.js, npm and webpack.

Add a package.json file to the app's directory (i.e.,
django_airavata/apps/myapp):

```json
{
  "name": "django-airavata-myapp-views",
  "description": "A Vue.js project",
  "version": "1.0.0",
  "author": "Marcus Christie <machristie@apache.org>",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "format": "prettier --write ."
  },
  "dependencies": {
    "bootstrap": "^4.0.0-beta.2",
    "bootstrap-vue": "2.0.0-rc.26",
    "django-airavata-api": "file:../api",
    "django-airavata-common-ui": "file:../../static/common",
    "vue": "^2.5.21"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.1.1",
    "@vue/cli-plugin-eslint": "^3.1.1",
    "@vue/cli-service": "^3.1.1",
    "babel-eslint": "^10.0.1",
    "eslint": "^5.8.0",
    "eslint-plugin-vue": "^5.0.0-0",
    "prettier": "^2.1.2",
    "vue-template-compiler": "^2.5.21",
    "webpack-bundle-tracker": "^0.4.2-beta"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": ["plugin:vue/essential", "eslint:recommended"],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 8"]
}
```

Run `yarn` which will install these dependencies and also create a
`yarn.lock` file with locked dependency versions.

Add a `babel.config.js` to this directory too:

```javascript
module.exports = {
  presets: ["@vue/app"]
};
```

Now add a `vue.config.js` file too:

```javascript
const BundleTracker = require("webpack-bundle-tracker");
const path = require("path");

module.exports = {
  publicPath:
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000/static/django_airavata_myapp/dist/"
      : "/static/django_airavata_myapp/dist/",
  outputDir: "./static/django_airavata_myapp/dist",
  pages: {
    home: "./static/django_airavata_myapp/js/entry-home"
    // additional entry points go here ...
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: __dirname
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new BundleTracker({
        filename: "webpack-stats.json",
        path: "./static/django_airavata_myapp/dist/"
      })
    ],
    optimization: {
      /*
       * Force creating a vendor bundle so we can load the 'app' and 'vendor'
       * bundles on development as well as production using django-webpack-loader.
       * Otherwise there is no vendor bundle on development and we would need
       * some template logic to skip trying to load it.
       * See also: https://bitbucket.org/calidae/dejavu/src/d63d10b0030a951c3cafa6b574dad25b3bef3fe9/%7B%7Bcookiecutter.project_slug%7D%7D/frontend/vue.config.js?at=master&fileviewer=file-view-default#vue.config.js-27
       */
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial"
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true
          }
        }
      }
    }
  },
  chainWebpack: config => {
    /*
     * Specify the eslint config file otherwise it complains of a missing
     * config file for the ../api and ../../static/common packages
     *
     * See: https://github.com/vuejs/vue-cli/issues/2539#issuecomment-422295246
     */
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(options => {
        options.configFile = path.resolve(__dirname, "package.json");
        return options;
      });
  },
  devServer: {
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    hotOnly: true
  }
};
```

You'll customize _pages_ by modifying and/or adding additional entry points and
you'll need to modify _publicPath_ and _outputDir_ and the BundleTracker config
to correspond to your folder structure.

Now create a static folder for holding javascript code. For this example we
would create `static/django_airavata_myapp/js`. In this folder you can put the
entry points, for example `entry-home.js`.

For each entry point you'll create a template, extending your app's `base.html`
and including that entry points generated css and js file. See
[_Adding an entry point_](./developing_frontend.md#adding-an-entry-point) for
further instructions.

For a complete example, see the _workspace_ app.

## build_js.sh build script

In the root of the project is a master build script, `build_js.sh`, that
generates a production build of all of the JS frontend code in the project. Add
a line in there for your Django app, like so:

```bash
...
(cd $SCRIPT_DIR/django_airavata/apps/myapp && yarn && yarn run build) || exit 1
```

You can test it by running `./build_js.sh` in the root folder.

# Creating a Wagtail Export

You can create an initial set of Wagtail pages with theming and images and then
export them for loading into another Django portal instance. These can be used
to create starter themes or to fully develop a themed set of pages for an
Airavata Django Portal.

These steps document how to create one of these exports locally.

## Getting Started

1. Clone and setup the
   [Airavata Django Portal](https://github.com/apache/airavata-django-portal)
   locally. Follow the instructions in the README.md.
2. Edit your `django_airavata/settings_local.py` file and add the following at
   the bottom:

```python
AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend']
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Wagtail related middleware
    'wagtail.core.middleware.SiteMiddleware',
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]
```

This allows you to log in locally, without needing to setup Keycloak or have an
Airavata backend running.

3. Make sure your virtual environment is activated if not already.

```
source venv/bin/activate
```

4. Create a superuser account. You'll use this to log into wagtail and edit
   pages:

```
python manage.py createsuperuser
```

5. (Optional) To start from an existing Wagtail export, run
   `python manage.py load_cms_data FILENAME`, where FILENAME is the name of one
   of the Wagtail exports in
   [fixtures](https://github.com/apache/airavata-django-portal/tree/master/django_airavata/wagtailapps/base/fixtures)
   directory. For example, you can run

```
python manage.py load_cms_data default.json
```

6. Start the Django server and log in at <http://localhost:8000/cms>

```
python manage.py runserver
```

## Creating the Wagtail export

Once you have the pages just the way you want them, you can now export them.

1. Make sure your virtual environment is activated if not already.

```
source venv/bin/activate
```

2. Run the following to export the Wagtail settings into a JSON file in the
   fixtures directory:

```bash
python manage.py dumpdata --natural-foreign --exclude auth.permission \
  --exclude contenttypes --indent 4 > django_airavata/wagtailapps/base/fixtures/myexport.json
```

Where you can change `myexport` to whatever you want to meaningfully name the
export file.

3. Commit any media files that were added as part of creating the Wagtail pages.

## Resetting your local environment

1. To start over, first remove (or rename) the database.

!!! warning

    db.sqlite3 stores all of the Wagtail changes you have made. Only remove
    this if you have already exported the wagtail changes to a file. See the
    previous section.

```
rm db.sqlite3
```

2. Make sure your virtual environment is activated if not already.

```
source venv/bin/activate
```

3. Migrate the database:

```
python manage.py migrate
```

4. Create a superuser account. You'll use this to log into wagtail and edit
   pages:

```
python manage.py createsuperuser
```

5. (Optional) To start from an existing Wagtail export, run
   `python manage.py load_cms_data FILENAME`, where FILENAME is the name of one
   of the Wagtail exports in
   [fixtures](https://github.com/apache/airavata-django-portal/tree/master/django_airavata/wagtailapps/base/fixtures)
   directory. For example, you can run

```
python manage.py load_cms_data default.json
```

6. Start the Django server and log in at <http://localhost:8000/cms>

```
python manage.py runserver
```

## Importing a Wagtail export

You can import a Wagtail export by running the following command on a newly
created Django instance.

1. Make sure your virtual environment is activated if not already.

```
source venv/bin/activate
```

2. Run

```bash
python manage.py load_cms_data myexport.json
```

where `myexport.json` should match the name that you gave the file when
exporting it.

## Replacing a Wagtail import with a different export

Use this when you have already loaded a Wagtail export into a Django instance
and you need to load a different one to overwrite the first one. The following
steps will first remove the Wagtail tables and then load the export like normal.

1. Make sure your virtual environment is activated if not already.

```bash
source venv/bin/activate
```

2. Run the following to delete all wagtail tables

```bash
python manage.py migrate wagtailimages 0001
python manage.py migrate wagtailimages zero
python manage.py migrate taggit zero
python manage.py migrate wagtailadmin zero
python manage.py migrate wagtailcore zero
python manage.py migrate wagtailusers zero
python manage.py migrate wagtailembeds zero
```

3. Migrate the database:

```bash
python manage.py migrate
```

4. Run

```bash
python manage.py load_cms_data myexport.json
```

where `myexport.json` should match the name that you gave the file when
exporting it.
