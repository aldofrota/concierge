package usecases

type ConciergeUnrelease interface {
	Unrelease(flagger string, ids []string) error
}
