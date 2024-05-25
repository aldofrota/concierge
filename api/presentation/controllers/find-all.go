package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeFindAllController struct {
	ConciergeFindAllCase usecases.ConciergeFindAll
}

func NewConciergeFindAllController(ConciergeFindAllCase usecases.ConciergeFindAll) protocols.Controller {
	return &ConciergeFindAllController{ConciergeFindAllCase}
}

func (controller *ConciergeFindAllController) Handle(ctx *gin.Context) protocols.HttpResponse {

	keys, err := controller.ConciergeFindAllCase.FindAll()
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       keys,
	}
}
