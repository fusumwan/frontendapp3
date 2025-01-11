"# frontendapp" 
echo "# frontendapp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/fusumwan/frontendapp.git
git push -u origin main

==========================================================================


git remote add origin https://github.com/fusumwan/frontendapp.git
git branch -M main
git push -u origin main


==========================================================================




=========================================




git pull
git add .
git commit -m "Updating"
git branch -M main
git push -u origin main




=========================================
cd C:\WebDevelopment\WorkspaceGCP\docker\frontendapp\frontendapp


docker login -u <username>


docker build -t frontendapp -f frontendapp/Dockerfile .


docker build -t frontendapp:latest -f frontendapp/Dockerfile .
Clean Up Docker Context: Remove unused Docker images and containers to avoid conflicts:


docker system prune -af




=======run docker image===============


docker run -d -p 3000:3000 --name frontendapp frontendapp




Check Running Containers: Use the docker ps command to confirm the container is running.




docker ps




http://localhost:3000




docker stop frontendapp
docker rm frontendapp






=======force update====


If you have uncommitted changes you don’t want to keep, you can reset them:
git reset --hard


git pull origin main

==============================

cd C:\gcp\docker\frontendapp3\frontendapp3\frontendapp3
Step 3: Clean and Reinstall Dependencies
If the problem persists, clear your node_modules and reinstall all dependencies:

rm -rf node_modules package-lock.json

npm install
============PowerShell=============

Remove-Item -Recurse -Force node_modules

Remove-Item -Force package-lock.json

Alternative (One-Liner Command)
You can combine the two commands into a one-liner:

Remove-Item -Recurse -Force node_modules; Remove-Item -Force package-lock.json; npm install



==================================


git pull --force origin main
git add .
git commit -m "Updating"
git branch -M main
git push -u origin main --force




git pull
git add .
git commit -m "Updating"
git branch -M main
git push -u origin main --force



==========================================

git fetch origin && git reset --hard origin/main && git pull --force origin main && git add . && git commit -m "Updating" && git branch -M main && git push -u origin main



=========================================
below is container image url
docker.io/timothyfudocker/frontendapp:v1.01
