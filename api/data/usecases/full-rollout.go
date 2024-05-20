package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeFullRolloutCase struct {
	redis protocols.Redis
}

func NewConciergeFullRolloutCase(
	redis protocols.Redis,
) usecases.ConciergeFullRollout {
	return ConciergeFullRolloutCase{
		redis,
	}
}

func (service ConciergeFullRolloutCase) FullRollout(flagger string, status bool) error {

	err := service.redis.UpdateFullRollout(flagger, status)
	if err != nil {
		return err
	}

	return nil
}
