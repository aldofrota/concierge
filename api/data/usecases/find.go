package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
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
