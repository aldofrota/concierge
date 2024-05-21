FROM golang:1.22 AS builder

WORKDIR /usr/concierge/api

RUN go install github.com/cosmtrek/air@latest
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN go install gotest.tools/gotestsum@latest
RUN apt-get install -y git curl

# Instale o compilador protobuf e as ferramentas gRPC
RUN apt-get update && apt-get install -y protobuf-compiler
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

EXPOSE 9989

CMD [ "tail", "-f", "/dev/null" ]