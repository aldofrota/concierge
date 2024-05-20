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

//	@title			Mis Rollouts HUB
//	@version		0.0.1
//	@description	API para gerenciamento de rollouts

// @host		localhost:9989
var DD_MONITORING_ENABLED = contains([]string{"homologacao", "projeto", "producao"}, os.Getenv("DD_ENV")) && os.Getenv("DD_MONITORING_ENABLED") == "true"

func main() {
	if DD_MONITORING_ENABLED {
		var agentHors = os.Getenv("DD_TRACE_AGENT_HOSTNAME") + ":" + os.Getenv("DD_TRACE_AGENT_PORT")
		// Configuração do Tracer Datadog
		opts := []tracer.StartOption{
			tracer.WithEnv(os.Getenv("DD_ENV")),         // Especificação do ambiente
			tracer.WithService(os.Getenv("DD_SERVICE")), // Nome do serviço
			tracer.WithAgentAddr(agentHors),             // Endereço do agente Datadog
		}
		if os.Getenv("DD_ENV") != "" {
			opts = append(opts, tracer.WithEnv(os.Getenv("DD_ENV")))
		}
		tracer.Start(opts...)

		fmt.Println("Monitoring is running")
	}

	go func() {
		err := factories.NewDatabaseRedisOpenConnection()
		if err != nil {
			panic("Falha ao conectar ao banco de dados Redis")
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

func contains(slice []string, str string) bool {
	for _, s := range slice {
		if s == str {
			return true
		}
	}
	return false
}
