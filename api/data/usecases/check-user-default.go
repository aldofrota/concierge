package usecases

import (
	"github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
)

type ConciergeFindUserDefaultCase struct {
	mongo protocols.Mongo
}

func NewConciergeFindUserDefaultCase(
	mongo protocols.Mongo,
) usecases.ConciergeFindUserDefault {
	return ConciergeFindUserDefaultCase{
		mongo,
	}
}

func (service ConciergeFindUserDefaultCase) CheckDefault() error {

	defaultUser := protocols.UserStruct{
		Name:     "Admin",
		Email:    "admin@concierge.app",
		Password: "admin",
		Language: "portuguese",
		Status:   "active",
		Permissions: protocols.UserPermissions{
			CreateRollout: true,
			UpdateRelease: true,
			RemoveRollout: true,
			Admin:         true,
		},
	}

	_, err := service.mongo.FindUserByEmail(defaultUser.Email)
	if err != nil {
		if err.Error() == "user with email 'admin@concierge.app' does not exist" {
			err = service.mongo.CreateUser(defaultUser)
			if err != nil {
				return err
			}
		} else {
			return err
		}
	}

	return nil
}
