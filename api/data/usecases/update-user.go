package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeUpdateUserCase struct {
	mongo protocols.Mongo
}

func NewConciergeUpdateUserCase(
	mongo protocols.Mongo,
) usecases.ConciergeUpdateUser {
	return ConciergeUpdateUserCase{
		mongo,
	}
}

func (service ConciergeUpdateUserCase) Update(id string, payload protocols.UserStruct) (protocols.UserPermissions, error) {

	permissions, err := service.mongo.UpdateUser(id, payload)
	if err != nil {
		return protocols.UserPermissions{}, err
	}

	return permissions, nil
}
