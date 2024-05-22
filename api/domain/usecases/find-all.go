package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeFindAll interface {
	FindAll() ([]protocols.FlagPayload, error)
}
