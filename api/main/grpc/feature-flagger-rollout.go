package grpc

import (
	"context"

	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/main/factories"
	pb "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/proto/v1/Concierge"
)

// Implemente o serviço definido no arquivo .proto
type Concierge struct {
	pb.ConciergeServer
}

// Implemente o método do serviço
func (s *Concierge) Rollout(ctx context.Context, request *pb.Request) (*pb.Response, error) {

	usecase := factories.NewConciergeGrpcFactory()
	inRollout, err := usecase.Rollout(request.Flagger, request.Id)
	if err != nil {
		return &pb.Response{
			Rollout: false,
		}, nil
	}

	return &pb.Response{
		Rollout: inRollout,
	}, nil
}
