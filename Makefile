
# Al ejecutar make tambien hara node server.js, ya que esta configurado en package.json
all:
	npm run dev

clean:
	fuser -k 5174/tcp || true
	fuser -k 4000/tcp || true

re:
	fuser -k 5174/tcp || true
	fuser -k 4000/tcp || true
	npm run dev