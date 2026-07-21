.PHONY: dev build deploy destroy clean install infra-deploy site-deploy invalidate

# Default commands
install:
	cd app && npm install
	cd infra && npm install

dev:
	cd app && npm run dev

build:
	cd app && npm run generate

deploy: build infra-deploy site-deploy invalidate

infra-deploy:
	cd infra && npm run deploy

site-deploy:
	./scripts/deploy.sh sync

invalidate:
	./scripts/deploy.sh invalidate

destroy:
	cd infra && npm run destroy

clean:
	rm -rf app/dist app/node_modules infra/node_modules
