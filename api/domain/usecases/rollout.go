package usecases

type Concierge interface {
	Rollout(keyRollout string, id string) (bool, error)
}
