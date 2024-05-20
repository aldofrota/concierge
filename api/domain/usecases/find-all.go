package usecases

type ConciergeFindAll interface {
	FindAll() ([]string, error)
}
