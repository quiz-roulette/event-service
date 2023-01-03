docker build -t quizroulette/event-service:v1.0.0 .
docker push quizroulette/event-service:v1.0.0
docker run -d -p 30100:80 quiz-roulette/socket-server

docker rmi $(docker images -f "dangling=true" -q)

docker build -t quizroulette/event-service .
