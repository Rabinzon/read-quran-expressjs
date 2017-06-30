up:
	docker-compose up -d && docker-compose exec mongo sh -c 'mongorestore /backup'
down:
	docker-compose down