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

## Setting up local portal to connect to online dev portal
Connecting your local portal to the online dev portal is needed to login using CILogon with your UNL credentials and to be able to submit jobs.
1. Go through the Quick Setup Instructions
2. Go to https://dev.rnamake.scigap.org/admin/developers/ or the given dev online portal and add `/admin/developers/` 
3. Login using your credentials in needed.
4. Download the `settings_local.py` file
5. Go to `rna-nanostructures/airavata-django-portal/django_airavata/` and paste the downloaded settings local file.
