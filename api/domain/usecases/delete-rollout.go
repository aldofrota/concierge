package usecases

type ConciergeDelete interface {
	Delete(flagger string) error
}
