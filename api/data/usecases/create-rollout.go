package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
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
