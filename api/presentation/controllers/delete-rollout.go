package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeDeleteController struct {
	ConciergeDeleteCase usecases.ConciergeDelete
}

func NewConciergeDeleteController(ConciergeDeleteCase usecases.ConciergeDelete) protocols.Controller {
	return &ConciergeDeleteController{ConciergeDeleteCase}
}

func (controller *ConciergeDeleteController) Handle(ctx *gin.Context) protocols.HttpResponse {

	flagger := ctx.Param("flagger")
	err := controller.ConciergeDeleteCase.Delete(flagger)
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
			"message": "Flagger removed successfuly",
		},
	}
}
