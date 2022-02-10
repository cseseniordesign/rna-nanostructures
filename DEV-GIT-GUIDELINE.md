## Dev Commits:

1. `git pull` to pull the latest changes before adding your changes.

2. `git checkout -b (branch type)/issue#-quick-description` checkout your changes to a new branch. 

    branch types: feature, bugfix, refactor
    
    example command: `git checkout -b refactor/73-refactoring-workspace-page`

3. `git add .` to add all the files you made changes to or files you've added/removed. 

4. `git commit -m "some description message"`

    *Git Tip:* You can do command 3 and 4 in one go using the following the git command `git commit -am "some description message"`

    Example messages:
        Fixed issue where the react page would not load when clicking on it's corresponding button as it was not linked to the page. 
        
    Or:
        - Added a new section in the job submission page for more granular control about the RNA molecule.
        - Added a new button in the job submission page for the user to submit. No functionality yet for the button.

5. `git push` The terminal will spit out a command for you. Copy and paste that command to finish pushing the branch.


## Others:

### "I need to update my branch from develop, it is behind" and creating a PR:

1. Commit changes to your branch first and push.

2. `git switch dev`

3. `git pull` to make sure you have the latest changes on pulled from develop.

4. `git checkout branch-I-want-to-update`

5. `git merge dev`

6. Fix any merge conflicts present.

7. Commit changes to that branch and push.

8. Create PR on github. Make sure that the branch merging is pointed at dev and not main.

### Merging a branch back into develop (Only DM):

1. Commit changes to your branch first and push.

2. Switch to the branch you want to merge.

3. `git checkout dev`

4. `git merge branch-I-want-to-merge-to-dev`

5. Commit and push changes.
