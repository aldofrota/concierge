package usecases

import "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"

type ConciergeFind interface {
	Find(flagger string) (protocols.FlagPayload, error)
}
