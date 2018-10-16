# to manually set ip use:
#  $ make IP=192.168.25.3

default:
	make build $(IP)
	make run

build:
	python get-ip-address.py $(IP)
	docker-compose build

run:
	docker-compose up -d
	docker-compose exec front bash -c "yarn; bash"

down:
	docker-compose down

stop:
	make down