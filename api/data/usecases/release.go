package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeReleaseCase struct {
	redis protocols.Redis
}

func NewConciergeReleaseCase(
	redis protocols.Redis,
) usecases.ConciergeRelease {
	return ConciergeReleaseCase{
		redis,
	}
}

func (service ConciergeReleaseCase) Release(flagger string, ids []string) error {

	err := service.redis.AddCompanyInFlagger(flagger, ids)
	if err != nil {
		return err
	}

	return nil
}
