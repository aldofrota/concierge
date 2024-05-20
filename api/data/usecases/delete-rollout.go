package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeDeleteCase struct {
	redis protocols.Redis
}

func NewConciergeDeleteCase(
	redis protocols.Redis,
) usecases.ConciergeDelete {
	return ConciergeDeleteCase{
		redis,
	}
}

func (service ConciergeDeleteCase) Delete(flagger string) error {

	err := service.redis.DeleteFlagger(flagger)
	if err != nil {
		return err
	}

	return nil
}
