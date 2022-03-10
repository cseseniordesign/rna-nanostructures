# Selected Conventions & Process Documentation from the 2020-2021 Senior Design Team


# Python Coding Conventions and Styles

## [Python](https://www.python.org/dev/peps/pep-0008/)

### Naming

- Variables: lowercase underscore: `variable_name =`
- Global Variables: double undersore: `__global_var__ =`
- Functions: lowercase underscore: `def func_hello:`
- Class Names: CapCase: `ClassName:`

### Indentation & Commenting
```python

# Block comments
# Lets us use multiple lines
def function:
  x = 1   
  if x == 5: # inline comment
    print("hello")
  return x
```

### Programming Recommendations
- Don't compare boolean values to True or False using ==

# System (RNA Nanostructures Science Gateway) Requirements

### User-Interface Requirements

1.  The User-Interface (UI) shall be implemented using the Airavata Django Portal, a web interface to the Apache Airavata API.
2.  The UI shall provide a landing page.
    1.  The landing page shall provide high-level information about the RNA Nanostructures Science Gateway project.
    2.  The landing page shall provide a button to enable Users to log in to the system.
        1.  The log-in page shall enable Users to log in using their institution credentials or a registered account.
        2.  The log-in page shall be implemented using CILogon
        3.  CILogon shall be used to require a User to have a registered account.
        4.  CILogon shall be used to verify the validity of a User's credentials.
            1.  CILogon shall reject admission into the application provided invalid credentials.
            2.  CILogon shall enable admission into the application provided valid credentials.
    3.  The landing page shall provide a button to enable Users to register for an account.
        1.  Users shall be required to register with their first name.
        2.  Users shall be required to register with their last name.
        3.  Users shall be required to register with a username.
        4.  Users shall be required to register with a valid email address.
        5.  Users shall be required to register with a valid password.
3.  The User shall be redirected to the available Django Portal upon successful login.
    1.  Should a User login with a valid Administrator account, the User shall be redirected to a management portal.
        1.  The management portal shall provide manager privileges.
            1.  Manager privileges include:
                1.  Implementing new applications
                2.  Modifying existing applications
                3.  Adding additional resources to run applications
                4.  Managing user accounts
                5.  Viewing all jobs and their histories
    2.  Should a User login with a valid User account, the User shall be redirected to a user portal
        1.  The user portal shall provide Users with the ability to perform the following tasks: 
            1.  Select an application to run
            2.  View recently conducted experiments
            3.  Browse experiments
            4.  View the current state of experiments
            5.  Cancel current experiments
            6.  Create new projects
            7.  Edit existing projects
            8.  Upload new files
            9.  Manage files
            10. Download files
            11. Log out from their account
            12. Create new groups
            13. Manage existing groups
            14. Manage group settings
            15. Upload SSH keys
            16. View recent notifications
            17. Email Settings

### RNA Scaffolding Application Requirements
*The RNA Scaffolding Application shall be referred to as "the application".*
1.  The application shall be integrated into the UI.
    1.  The application shall be implemented using Python3.
2.  The application shall require a user to submit a PDB file.
    1.  The application shall verify the integrity of the PDB file.
        1.  The application shall verify the integrity the validity of the PDB file according to the following criteria:
            1.  Filetype ( .pdb)
            2.  Verify by content (ask Joseph about how he does it).
            3.  The PDB file shall be composed of the base pairs to build the RNA 3D scaffold from.
3.  The application shall require a User to enter the starting base pair.
    1.  The starting base pair shall be provided by the User through a text box.
4.  The application shall require a User to enter the end base pair.
    1.  The end base pair shall be provided by the User through a text box.
5. The application shall require a User to enter the number of designs.
    1.  The number of designs shall be provided by the User through a text box.
6. The application shall process the User-provided PDB file using the Design RNA Scaffold application available through RNA Make.
7. The application shall return the a PDB file provided by the Design RNA Scaffold application.
    1.  The returned PDB file shall be downloadable by the User.
    2.  The PDB shall be rendered using JSMol.
        1.  The rendering shall be embedded within the application.
        2.  The rendering shall be viewable in "cartoon" mode.
        3.  The new scaffold built from RNAMake will be highlighted.
8. The application shall return a CSV file provided by the Design RNA Scaffold Application.
    1.  The CSV file shall be displayed in the form of a table.
        1.  The table shall be embedded within the application.

### Airavata Extension Requirements
1.  The Airavata API shall be extended to support job scheduling through HTCondor.
2.  The Airavata API shall be extended to  enable users to submit jobs on the Open Science Grid.
3.  The Airavata API shall be extended to incorporate a Groovy template for HTCondor.
4.  The Airavata API shall be extended to include an HTCondor command map.

### Django Extension Requirements
1.  Be able to send an email to the User.
    1.  The email shall be sent to the email address associated with their account.
    2.  The Django Extension shall be able to send Job Completion emails.
        1.  Job Completion emails shall include the following information:
            1.  Job title
            2.  Associated application
            3.  Time of competition
            4.  Job run time
    3.  The Django Extension shall be able to send Error emails.
        1.  Error emails shall include the following information:
            1.  Job title
            2.  Associated application
            3.  Time of error
            4.  Error messages
2.  The Django Extension shall integrate the API extensions provided by the Airavata Extension as discussed within the Airavata Extension Requirements.

# Testing Strategy
The project uses distinct testing strategies for the different frameworks.

### Airavata
- The Airavata server API system makes use of unit tests in a number of portions of the code which are run during Maven builds as well as run using Travis CI on the apache/airavata repository; however, testing the full stack of services to confirm usability of the workflow manager and job submission system does not employ any mock or unit testing. This is as set up by Apache/Airavata and consequently the testing strategy cannot be modified by the team.
- The Airavata-HTCondor Extension is manually tested using the following components:
  - Docker to spin up the required backend services such as the databases and credential broker.
  - The Airavata API, job manager, and job monitor--started in the IDE.
  - A virtual machine running Ubuntu with HTCondor and an SMTP server are installed.
    - The above tools are used to run a testing pool and to send job notifications to our test email that the job monitor polls.
  - The PGA portal after spinning it up using Docker as per the testing instructions.
    - The steps to configure the PGA Portal on a Linux environment can be found [here](https://github.com/cseseniordesign/rna-nanostructures/blob/master/docs/testing/pga_portal_installation_instructions.md).
    - While in the default Super Admin mode of the PGA Portal, the virtual machine compute resource is registered.
    - After disabling the Super Admin mode in the PGA Portal, the virtual machine compute resource is set up with the default gateway and set to default.
  - The Django Portal with the following configurations:
    - The settings are configured to all point to the local Docker services and local running Airavata API service.
    - The compute resource is registered in the settings portion of the Django portal.
    - An application is set up to run on the compute resource.
  - An application is then tested using the virtual compute resource. If the application is able to complete successfully and the output on the IDE console running the Airavata services does not indicate any failures, we consider it in the working state. Otherwise, we edit code/settings/configurations to fix the issues we ran into.

### Django
- The Airavata Django Portal makes use of unit testing via Django framework, testing sub-components according to the unit tests employed. It also performs Python style and syntax validation through `flake8`. This is tested using Travis CI which runs the Django tests and yarn tests for the server.
- Travis CI performs continuous integration on every commit and pull request, making sure code can be merged.
- The PDB parser is tested using the same Django test suite, which allows it to be tested using the same testing system.

# Release Roadmap

**Release One: Completed**

-   September 17 - September 30

-   System requirements, project workflow, framework

**Release Two: Completed**

-   October 15 - October 28

-   Team One: Airavata HTCondor Support Implementation

-   Team Two: Django Application and Landing page wireframes, Django Application and Landing page User-Tests, Django Application and Landing page mockups

**Release Three: Completed**

-   November 3 - November 24

-   Release Meeting: November 24, 2020

-   Team One: Airavata HTCondor Support Pull Request, Airavata HTCondor Extension testing

-   Team Two: Completed Django Landing Page, PDB Parser Protoype, JSMol Protoype

**Release Four:**

-   February 22 - March 5

-   Release Meeting: March 5, 2021  

-   Team One: Test the integration of the Airavata HTCondor extension in the Django Portal

-   Team Two: Completed Django Application Prototype

**Release Five:**

-   March 29 - April 9

-   Release Meeting: April 9, 2021

-   Completed Finalize the Django Application, validate test cases, make final changes to the application according to sponsor feedback

**Release Six:**

-   April 19 - April 30

-   Release Meeting: April 30, 2021

-   RNA Nanostructures Science Gateway deployment (Documentation, Presentation)

# Risk Management

## Risk Management Steps:

1.  Identify Risks
	- [A] is a risk because [B].
2.  Map Out Impact Versus Likelihood
	- What are the chances that [A] happens?
3.  Plan Your Risk Response
	- What can I do to lower the chances of [A]?
4.  Assign an Owner to the Risk
	- [story object] is where this risk lies.
5.  Understand Your Triggers.
	-  [a,b,c] are things that can cause this risk to arise.
6.  Make a Backup Plan
	-  If [A] is unavoidable, how can we work around it/ what could we do instead of [A].
7.  Measure Your Risk Threshold
	- Keeping track of [A], what are the chances that the alternatives are less likely to become risks?

## Avoidance Plan:
There are several steps that are incorporated into our avoidance plan to ensure that risks are prevented. The first step is to use rich forms of communication and incorporate stakeholder jargon. This step is incorporated to ensure that all stakeholders understand the current state of the project and no misunderstandings develop as a consequence of differences in communication. The second step is to involve stakeholders in backlog grooming. This will be conducted in Sponsor meetings. The team will involve stakeholders in backlog grooming by writing stories into ZenHub during meetings as requirements are discovered during meetings. Additionally, during meetings, the team will review the stories that are being moved into the backlog with sponsors. Finally demonstrations will be used frequently in stakeholder meetings to ensure that all stakeholders are able to get a thorough understanding of the project, avoiding discrepancies in communication. In terms of development, risks will be mitigated by creating prototypes frequently. Furthermore, any development concerns or needs will be discussed early to prevent them from becoming risks. Should a concern arise, the stakeholders will be notified as early as possible.

## Mitigation Plan:
The first step in the mitigation plan is to notify all stakeholders of the risk. This is essential to determine the best track to take in mitigating the impact of the risk. The second step involved in the mitigation plan is to better understand the reason that the risk emerged, the urgency of resolving the risk, and the severity of the risk. Once such parameters have been observed, the stakeholders will communicate potential solutions using rich communication. This will allow all stakeholders to actively share ideas and their own understanding regarding how to overcome the risk. Once a solution has been proposed, the next step is to form a step-by-step plan to mitigate the risk. Such steps incorporated in this plan will include resolving the thing that caused the risk, reducing its impact as early as possible, and forming next steps to prevent the risk. The plan will then be discussed with all stakeholders to determine the value of the plan. Next, the plan will be executed by the development team. Should the plan to resolve the risk fail, stakeholders will be notified of this, and the previous steps will be taken again to determine alternative methods to mitigate the risk.

## Recovery Plan:
The first step in our recovery plan to overcome roadblocks is to notify stakeholders of the roadblock. Upon notifying stakeholders of the roadblock, the team and stakeholders will discuss the problem areas, the reason for the roadblock, the urgency of the roadblock, and consequences of the roadblock. Upon forming an understanding of these things, the stakeholders will discuss solutions for the roadblock. Additional solutions shall be discussed should the initial solution fail to resolve the roadblock. Examples of solutions may be adjustment of system requirements or retrospectives to analyze non-valuable behaviors. Additionally, the solution should work to remedy the impact that the roadblock has already caused. The stakeholders will then decide on a plan to execute. Should this not be effective, the alternative strategies will be employed to overcome the roadblock. This process will be followed until a solution is effectively deployed.

### Definitions:  
Rich Communication: clear and concise communications or communications without ambiguity.
