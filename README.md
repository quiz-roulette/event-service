docker build -t quiz-roulette/socket-server . -f Dockerfile

docker run -d -p 30100:80 quiz-roulette/socket-server

docker rmi $(docker images -f "dangling=true" -q)
