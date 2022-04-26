# Process Documentation

The process documentation will include (release by release)

- Plans for development
- Completed action items
- Changing requirements

# Overall Development plan

## Release 1

### Tasks Completed

1. Development environments are setup
2. Basic wireframes are completed
3. User stories are added to Zenhub

## Release 2: React frontend skeleton live demo

### Overview

1. Figma Mockup of Website
2. Demoable ReactJS Implementation of Mockup

### Tasks Completed

1. Figma Mockup-Development
2. Team HCC Accounts Created and Verified
3. Researched Javascript and ReactJS
4. React Project Pages Created and Implemented
    1. Landing Page
    2. Workspace
    3. Job Submission
    4. Past Experiments
    5. About, Contact
    6. Documentation
    7. Groups
    8. File Upload

### Risks & Roadblocks

1. Development may be delayed due to time needed to move Airavata Django Portal to ReactJS from previous team’s code base
    1. Team will invest time in researching code base to resolve any issues now instead of later
2. Ran into issues with code base
    1. Met and agreed on a standard format for file structure
3. Running out of time for this release
    1. Learning process for team
    2. Team members volunteered outside of team time to complete this release
4. Backloaded Sprints

## Release 3

### Overview

1. React Front End is attached to Django Backend
    1. No Functionality
    2. Switch from VueJS to ReactJS
    3. Fine Tune Front End
2. Job Submission and Job Submission Results
    1. Job Submission page is created and functional
    2. User can choose which settings to apply to the job
    3. Job Submission Results can be viewed

### Tasks Completed

1. Agreed on Project Vision: *To create a working web portal that is aesthetically pleasing and easy to use that contains a login page, ga uided RNA structure creation with options, a RNA structure creation summary, and a molecular viewer that shows a 3D rendering of the structure*
2. Adjusted Project Direction from continuous communication with sponsors and Indiana
3. Created and refined Architecture Diagram
4. Indiana provided development gateway
    1. Front-facing page
    2. Functional login
    3. Landing page
5. Used Cookiecutter and webpack to create a custom UI plugin for the django portal which contains our React UI
6. Minor Changes to UI
5. Revamped Project Roadmap:

#### Previous Roadmap

**Release 3: Finishing backend Login, refine frontend**
- React front end attached to django backend.
- Research SSO login and implement in backend
- Create Landing page, placeholder login, and workspace page

**Release 4: Working login**
- Users will be able to login using an SSO
- Anonymous usage of the application is possible

**Release 5: Job submission and results**
- Job Submission page is created and functional
- Users can choose which settings to apply to the job submission
- Job submission results can be viewed.

**Release 6: Bug Fixes, Final touches for presentation**
- Bug fixes
- Final touches

**Parking lot**
- RNA molecule viewer
- Account Setting Functionality

#### New Roadmap 

**Release 3: Django Development and Frontend Connection**
- Demo integration of Team's React frontend with Django middleware via Cookiecutter
- Application running on Anvil for Sponsors to interact with
- Architecture Diagram (before and after)
- Continue Frontend Refinement

**Release 4: Working Frontend and Minimum Viable Product** 
- Users will be able to login using an SSO
- Functional application with job submission and results
- User can apply certain settings to jobs

**Release 5: Frontend Refinement and backend bug fixes**
- Creating more user friendly UI
- Polished Login

**Release 6: Bug Fixes, Final touches for presentation**
- Bug fixes
- Final touches

**Parking Lot**
- RNA molecule viewer
- Account Setting Functionality

### Roadblocks

1. Unable to add any new compute resources because only Scigap admins can access the pgadmin portal
2. Indiana is on holiday, so we cannot install the Cookiecutter plugin which contains the React UI on their servers
    1. There is no convenient way to share our progress with sponsors
3. All changes seen are made on local development environments
    1. Public Website located at: https://dev.rnamake.scigap.org/
4. Once the team and Indiana is back from Holiday, work can resume on setting up the authorization

## Release 4: Minimum Viable Product

### Overview
1. Minimum functionality for sponsors to use
2. Functional Job Submission
    1. Jobs can be submitted
    2. Status can be viewed
    3. Job Submission Results are available
3. User Settings for Jobs
    1. Remove user options for compute resources
    2. Base Pairs depending on Job Submission

### Tasks Completed
1. Gateway front end changes in wagtail
    1. Contact and Home Page
    2. RNAMake Icon
2. Created simple tests for software components
3. Got integration and access to Jetstream and HTCondor
4. File and data persistence for job submissions
5. Submitting jobs and seeing job status
6. Pull data in recent experiments
7. Webhook for deployment
    1. Deploy without waiting for Indiana

### Tasks Not Completed

1. Job Submission Results are available
2. Base Pairs depending on Job Submission

### Risks & Roadblocks

1. HTCondor and Jetstream access
    1. Wait was on Indiana
    2. No longer and issue, the team has access now
2. Team was down with the sickness (not in a good way)
3. Slowdown with ReactJS/Django integration

## Release 5



### Overview


### Tasks Completed


### Roadblocks


## Release 6

### Overview


### Tasks Completed


### Roadblocks

