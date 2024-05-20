package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
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
