package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeFindUserController struct {
	ConciergeFindUserCase usecases.ConciergeFindUser
}

func NewConciergeFindUserController(ConciergeFindUserCase usecases.ConciergeFindUser) protocols.Controller {
	return &ConciergeFindUserController{ConciergeFindUserCase}
}

func (controller *ConciergeFindUserController) Handle(ctx *gin.Context) protocols.HttpResponse {

	id := ctx.Param("id")
	user, err := controller.ConciergeFindUserCase.Find(id)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       user,
	}
}
