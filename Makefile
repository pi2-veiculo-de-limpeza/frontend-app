default:
	make build $(IP)
	make run

build:
	python get-ip-address.py $(IP)
	docker-compose -f docker-compose-osx.yml build

run:
	docker-compose -f docker-compose-osx.yml up -d
	docker-compose -f docker-compose-osx.yml exec front bash -c "yarn; bash"

down:
	docker-compose -f docker-compose-osx.yml down

stop:
	make down
