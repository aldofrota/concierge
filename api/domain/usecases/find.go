package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeFind interface {
	Find(flagger string) (protocols.FlagPayload, error)
}
