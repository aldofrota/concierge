package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
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
