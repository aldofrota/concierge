package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
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
			Body: map[string]interface{}{
				"error": err.Error(),
			},
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body: map[string]interface{}{
			"flaggers": keys,
		},
	}
}
