package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
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
