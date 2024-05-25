package usecases

import "github.com/aldofrota/concierge/data/protocols"

type ConciergeAuthUser interface {
	Auth(payload protocols.AuthUser) (protocols.AuthUserStruct, error)
}
