package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

	"github.com/aldofrota/concierge/main/factories"
	"github.com/aldofrota/concierge/main/grpc"
	"github.com/aldofrota/concierge/main/routes"
)

//	@title			Concierge
//	@version		0.0.1
//	@description	API para gerenciamento de rollouts

// @host		localhost:9989

func main() {
	go func() {
		err := factories.NewDatabaseMongoOpenConnection()
		if err != nil {
			panic("Falha ao conectar ao banco de dados Mongo")
		}

		err = factories.NewDatabaseRedisOpenConnection()
		if err != nil {
			panic("Falha ao conectar ao banco de dados Redis")
		}

		err = factories.NewConciergeFindUserDefaultFactory()
		if err != nil {
			fmt.Println(err.Error())
		}

		if err := grpc.Run(); err != nil && err != http.ErrServerClosed {
			panic(err)
		}

		if err := routes.Run(); err != nil && err != http.ErrServerClosed {
			panic(err)
		}

	}()

	stop := make(chan os.Signal, 1)

	signal.Notify(stop, syscall.SIGTERM, os.Interrupt, syscall.SIGINT)
	<-stop

	defer tracer.Stop()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	fmt.Println("Stopping server...")

	if err := factories.NewCloseDatabaseMongoConnection(); err != nil {
		panic(err)
	}
	if err := factories.NewCloseDatabaseRedisConnection(); err != nil {
		panic(err)
	}
	if err := grpc.ShutDown(ctx); err != nil {
		panic(err)
	}
	if err := routes.ShutDown(ctx); err != nil {
		panic(err)
	}

	fmt.Println("Server stopped successfully!")
}
