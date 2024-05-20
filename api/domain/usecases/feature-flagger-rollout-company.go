package usecases

type ConciergeCompany interface {
	Rollout(id string) ([]string, error)
}
