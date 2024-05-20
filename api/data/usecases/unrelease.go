package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeUnreleaseCase struct {
	redis protocols.Redis
}

func NewConciergeUnreleaseCase(
	redis protocols.Redis,
) usecases.ConciergeUnrelease {
	return ConciergeUnreleaseCase{
		redis,
	}
}

func (service ConciergeUnreleaseCase) Unrelease(flagger string, ids []string) error {

	err := service.redis.RemoveCompanyInFlagger(flagger, ids)
	if err != nil {
		return err
	}

	return nil
}
