package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeFindAllUsers interface {
	FindAllUsers() ([]protocols.UserStruct, error)
}
