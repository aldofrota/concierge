package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeCreateCase struct {
	redis protocols.Redis
}

func NewConciergeCreateCase(
	redis protocols.Redis,
) usecases.ConciergeCreate {
	return ConciergeCreateCase{
		redis,
	}
}

func (service ConciergeCreateCase) Create(payload protocols.FlagPayload) error {

	err := service.redis.CreateFlagger(payload)
	if err != nil {
		return err
	}

	return nil
}
