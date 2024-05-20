package grpc

import (
	"context"
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	pb "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/proto/v1/Concierge"
)

var server *grpc.Server

func Run() error {
	go func() {
		port := os.Getenv("PORT_GRPC")
		lis, err := net.Listen("tcp", ":"+port)
		if err != nil {
			log.Fatalf("Failed to listen: %v", err)
		}
		server = grpc.NewServer()
		pb.RegisterConciergeServer(server, &Concierge{})
		reflection.Register(server)
		log.Println("gRPC server listening on port " + port)
		if err := server.Serve(lis); err != nil {
			log.Fatalf("Failed to serve gRPC: %v", err)
		}
	}()

	return nil
}

func ShutDown(ctx context.Context) error {
	if server != nil {
		server.GracefulStop()
	}
	return nil
}
