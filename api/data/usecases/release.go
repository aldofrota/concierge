package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
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
