## SpePas Web Admin
* The Web Admin repository is for managing Spepas admin portal dev.


### Instructions on pushing code to this repository
* Always create a new branch for any new change you push.
  * you can create a new branch using the following syntax `git checkout -b <your-new-branch-name>`
* You need to make sure you push your new change in the new branch you created.
  * to be sure the current branch you are on is the new branch you created, you use the following syntax `git status`
* To check the list of branches you have created, use the following syntax `git branch -a`.
* To switch to a different branch, use the following syntax `git checkout <your-new-branch-name>`
* Steps to update your new branch with the latest version in the main branch
  * Switch to the main branch using the following syntax `git checkout main`.
  * Pull the latest update from remote main branch to local main branch with the following syntax `git pull`
  * Switch back to your new branch using the following syntax `git checkout <your-new-branch-name>`
  * Merge the local main branch to your new branch using the following syntax`git merge main`
  * Your new branch now has the updated version on the main branch. You can now push the new change in your new branch.
  * After pushing your changes, go on github repository to create a pull request for reviewer to review code and merge your new changes to the main branch.
