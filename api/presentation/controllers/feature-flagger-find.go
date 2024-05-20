package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeFindController struct {
	ConciergeFindCase usecases.ConciergeFind
}

func NewConciergeFindController(ConciergeFindCase usecases.ConciergeFind) protocols.Controller {
	return &ConciergeFindController{ConciergeFindCase}
}

func (controller *ConciergeFindController) Handle(ctx *gin.Context) protocols.HttpResponse {

	flagger := ctx.Param("flagger")
	flaggerPayload, err := controller.ConciergeFindCase.Find(flagger)
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
			"payload": flaggerPayload,
		},
	}
}
