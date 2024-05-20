package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/domain/usecases"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/presentation/protocols"
)

type ConciergeCompanyController struct {
	ConciergeCase usecases.ConciergeCompany
}

func NewConciergeCompanyController(ConciergeCompanyCase usecases.ConciergeCompany) protocols.Controller {
	return &ConciergeCompanyController{ConciergeCompanyCase}
}

func (controller *ConciergeCompanyController) Handle(ctx *gin.Context) protocols.HttpResponse {

	id := ctx.Param("id")

	rollouts, err := controller.ConciergeCase.Rollout(id)
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
			"rollouts": rollouts,
		},
	}
}
