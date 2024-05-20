package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeCompanyCase struct {
	redis protocols.Redis
}

func NewConciergeCompanyCase(
	redis protocols.Redis,
) usecases.ConciergeCompany {
	return ConciergeCompanyCase{
		redis,
	}
}

func (service ConciergeCompanyCase) Rollout(id string) ([]string, error) {

	Concierge, err := service.redis.FindFlaggersCompany(id)
	if err != nil {
		return nil, err
	}
	return Concierge, nil
}
