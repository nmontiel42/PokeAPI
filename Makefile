
# Al ejecutar make tambien hara node server.js, ya que esta configurado en package.json
all:
	docker-compose up --build

clean:
	docker-compose down


re:
	docker-compose down
	docker-compose up --build