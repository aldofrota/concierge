package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
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
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       flaggerPayload,
	}
}
