package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeCreate interface {
	Create(payload protocols.FlagPayload) error
}
