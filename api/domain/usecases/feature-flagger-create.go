package usecases

import "repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"

type ConciergeCreate interface {
	Create(payload protocols.FlagPayload) error
}
