package usecases

type ConciergeRelease interface {
	Release(flagger string, ids []string) error
}
