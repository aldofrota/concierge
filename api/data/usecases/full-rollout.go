package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
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
