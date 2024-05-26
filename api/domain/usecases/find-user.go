package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeFindUser interface {
	Find(id string) (protocols.UserStruct, error)
}
