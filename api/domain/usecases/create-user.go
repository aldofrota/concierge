package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeCreateUser interface {
	Create(payload protocols.UserStruct) error
}
