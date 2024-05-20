#!/bin/bash

go mod tidy

CGO_ENABLED=0 swag init -g ./main/main.go -o ./main/docs

protoc --go_out=. --go-grpc_out=. proto/*.proto

# go run main/main.go

air