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
docker.io/timothyfudocker/frontendapp:3
