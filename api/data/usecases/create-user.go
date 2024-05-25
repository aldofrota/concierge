package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeCreateUserCase struct {
	mongo protocols.Mongo
}

func NewConciergeCreateUserCase(
	mongo protocols.Mongo,
) usecases.ConciergeCreateUser {
	return ConciergeCreateUserCase{
		mongo,
	}
}

func (service ConciergeCreateUserCase) Create(payload protocols.UserStruct) error {

	err := service.mongo.CreateUser(payload)
	if err != nil {
		return err
	}

	return nil
}
