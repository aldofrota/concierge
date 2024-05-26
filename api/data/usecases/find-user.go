package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeFindUserCase struct {
	mongo protocols.Mongo
}

func NewConciergeFindUserCase(
	mongo protocols.Mongo,
) usecases.ConciergeFindUser {
	return ConciergeFindUserCase{
		mongo,
	}
}

func (service ConciergeFindUserCase) Find(id string) (protocols.UserStruct, error) {

	user, err := service.mongo.FindUserById(id)
	if err != nil {
		return protocols.UserStruct{}, err
	}

	return user, nil
}
