package controllers

import (
	"net/http"

	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeDeleteUserController struct {
	ConciergeDeleteUserCase usecases.ConciergeDeleteUser
}

func NewConciergeDeleteUserController(ConciergeDeleteUserCase usecases.ConciergeDeleteUser) protocols.Controller {
	return &ConciergeDeleteUserController{ConciergeDeleteUserCase}
}

func (controller *ConciergeDeleteUserController) Handle(ctx *gin.Context) protocols.HttpResponse {

	id := ctx.Param("id")
	err := controller.ConciergeDeleteUserCase.Delete(id)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body: map[string]interface{}{
			"message": "User removed successfuly",
		},
	}
}
