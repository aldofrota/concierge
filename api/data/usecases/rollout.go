package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeCase struct {
	redis protocols.Redis
}

func NewConciergeCase(
	redis protocols.Redis,
) usecases.Concierge {
	return ConciergeCase{
		redis,
	}
}

func (service ConciergeCase) Rollout(flagger string, id string) (bool, error) {

	Concierge, err := service.redis.FindFlagger(flagger)
	if err != nil {
		return false, err
	}

	if Concierge.FullRollout {
		return true, nil
	} else if len(Concierge.IDs) > 0 {
		for _, s := range Concierge.IDs {
			if s == id {
				return true, nil
			}
		}
	}
	return false, nil
}
