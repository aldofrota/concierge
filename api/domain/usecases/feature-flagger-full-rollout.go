package usecases

type ConciergeFullRollout interface {
	FullRollout(flagger string, status bool) error
}
