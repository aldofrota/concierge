package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeFindAllUsersCase struct {
	mongo protocols.Mongo
}

func NewConciergeFindAllUsersCase(
	mongo protocols.Mongo,
) usecases.ConciergeFindAllUsers {
	return ConciergeFindAllUsersCase{
		mongo,
	}
}

func (service ConciergeFindAllUsersCase) FindAllUsers() ([]protocols.UserStruct, error) {

	users, err := service.mongo.FindAllUsers()
	if err != nil {
		return []protocols.UserStruct{}, err
	}

	return users, nil
}
