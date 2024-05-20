package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeFindCase struct {
	redis protocols.Redis
}

func NewConciergeFindCase(
	redis protocols.Redis,
) usecases.ConciergeFind {
	return ConciergeFindCase{
		redis,
	}
}

func (service ConciergeFindCase) Find(flagger string) (protocols.FlagPayload, error) {

	flaggerPayload, err := service.redis.FindFlagger(flagger)
	if err != nil {
		return protocols.FlagPayload{}, err
	}

	return flaggerPayload, nil
}
