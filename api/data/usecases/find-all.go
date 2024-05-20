package usecases

import (
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
)

type ConciergeFindAllCase struct {
	redis protocols.Redis
}

func NewConciergeFindAllCase(
	redis protocols.Redis,
) usecases.ConciergeFindAll {
	return ConciergeFindAllCase{
		redis,
	}
}

func (service ConciergeFindAllCase) FindAll() ([]string, error) {

	flaggers, err := service.redis.FindAll()
	if err != nil {
		return nil, err
	}

	return flaggers, nil
}
