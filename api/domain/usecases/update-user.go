package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeUpdateUser interface {
	Update(id string, payload protocols.UserStruct) (protocols.UserPermissions, error)
}
