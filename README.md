# Event Service

A service dedicated to publishing and listening event - to be replaced or revamped to use Kafka.


### Setup

#### Local

Run `node index.js`

#### Docker
```
docker build -t quizroulette/event-service:v1.0.0 .
docker push quizroulette/event-service:v1.0.0
docker run -d -p 30100:30100 quiz-roulette/socket-server
```

To remove unnecessary docker images:
```
docker rmi $(docker images -f "dangling=true" -q)
```

#### K8

```yaml
TO BE UPDATED
```



