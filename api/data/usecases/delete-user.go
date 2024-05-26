package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeDeleteUserCase struct {
	mongo protocols.Mongo
}

func NewConciergeDeleteUserCase(
	mongo protocols.Mongo,
) usecases.ConciergeDeleteUser {
	return ConciergeDeleteUserCase{
		mongo,
	}
}

func (service ConciergeDeleteUserCase) Delete(id string) error {

	err := service.mongo.DeleteUser(id)
	if err != nil {
		return err
	}

	return nil
}
