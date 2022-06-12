all: 
	@docker-compose up -d

down:
	@docker-compose down

stop:
	@docker-compose stop

kill:
	@docker-compose kill

re:
	@docker-compose up -d --build

top:
	@docker-compose top

bash:
	@docker-compose exec px_server bash

ps:
	@docker-compose ps

logs:
	@docker-compose logs

clean:
	@docker stop $$(docker ps -qa); \
	docker rm $$(docker ps -qa); \
	docker rmi -f $$(docker images -qa); \
	docker volume rm $$(docker volume ls -q); \
	docker network rm $$(docker network ls -q);

.PHONY: all re down clean bash