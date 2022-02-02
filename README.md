## Quick Setup Instructions
1. `cd airavata-django-portal`
2. Follow the instructions in the [Airavata Django Portal](https://github.com/apache/airavata-django-portal) for this folder.
3. `cd ../hcc_rnamake_portal`
4. `pip install -e .`
5. `cd frontend`
6. `npm i`
7. `npm run-script build`
8. `cd ../../airavata-django-portal`
9. `python manage.py runserver` to run the portal.

portal should be running now.
