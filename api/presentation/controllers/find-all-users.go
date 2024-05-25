package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeFindAllUsersController struct {
	ConciergeFindAllUsersCase usecases.ConciergeFindAllUsers
}

func NewConciergeFindAllUsersController(ConciergeFindAllUsersCase usecases.ConciergeFindAllUsers) protocols.Controller {
	return &ConciergeFindAllUsersController{ConciergeFindAllUsersCase}
}

func (controller *ConciergeFindAllUsersController) Handle(ctx *gin.Context) protocols.HttpResponse {

	users, err := controller.ConciergeFindAllUsersCase.FindAllUsers()
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       users,
	}
}
