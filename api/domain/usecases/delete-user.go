package usecases

type ConciergeDeleteUser interface {
	Delete(id string) error
}
