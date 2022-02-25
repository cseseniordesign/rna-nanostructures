# Testing Strategy
The project uses distinct testing strategies for the different frameworks.

### Airavata
- The Airavata server API system makes use of unit tests in a number of portions of the code which are run during Maven builds as well as run using Travis CI on the apache/airavata repository; however, testing the full stack of services to confirm usability of the workflow manager and job submission system does not employ any mock or unit testing. This is as set up by Apache/Airavata and consequently the testing strategy cannot be modified by the team.


### Django
- The Airavata Django Portal makes use of unit testing via Django framework, testing sub-components according to the unit tests employed. It also performs Python style and syntax validation through `flake8`. This is tested using Travis CI which runs the Django tests and yarn tests for the server.
- Travis CI performs continuous integration on every commit and pull request, making sure code can be merged.
- For the React Plugin, we will have unit tests inside django for any functionality of features that will be added. We will also have unit tests for the react front end for any functions that will be done in javascript, along with manual tests for the front end itself.