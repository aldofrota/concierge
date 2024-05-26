package controllers

import (
	"net/http"
	"reflect"

	protocolsData "github.com/aldofrota/concierge/data/protocols"
	"github.com/aldofrota/concierge/domain/usecases"
	"github.com/aldofrota/concierge/presentation/protocols"
	"github.com/gin-gonic/gin"
)

type ConciergeUpdateUserController struct {
	ConciergeUpdateUserCase usecases.ConciergeUpdateUser
}

func NewConciergeUpdateUserController(ConciergeUpdateUserCase usecases.ConciergeUpdateUser) protocols.Controller {
	return &ConciergeUpdateUserController{ConciergeUpdateUserCase}
}

type UpdateUserRequest struct {
	Name        string `json:"name,omitempty"`
	Email       string `json:"email,omitempty"`
	Password    string `json:"password,omitempty"`
	Language    string `json:"language,omitempty"`
	Status      string `json:"status,omitempty"`
	Permissions struct {
		CreateRollout bool `json:"create_rollout,omitempty"`
		UpdateRelease bool `json:"update_release,omitempty"`
		RemoveRollout bool `json:"remove_rollout,omitempty"`
		Admin         bool `json:"admin,omitempty"`
	} `json:"permissions,omitempty"`
}

func (controller *ConciergeUpdateUserController) Handle(ctx *gin.Context) protocols.HttpResponse {

	id := ctx.Param("id")
	var requestBody UpdateUserRequest

	// Faz a leitura do corpo JSON da solicitação
	if err := ctx.BindJSON(&requestBody); err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Error parsing JSON request body: " + err.Error(),
		}
	}

	// Verifica se o corpo da solicitação contém algum dado para atualizar
	if reflect.DeepEqual(requestBody, UpdateUserRequest{}) {
		return protocols.HttpResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "No data provided for update",
		}
	}

	// Define o status padrão se não fornecido
	if requestBody.Status == "" {
		requestBody.Status = "active"
	}

	// Converte UpdateUserRequest para UserStruct
	user := protocolsData.UserStruct{
		Name:     requestBody.Name,
		Email:    requestBody.Email,
		Password: requestBody.Password,
		Language: requestBody.Language,
		Status:   requestBody.Status,
		Permissions: protocolsData.UserPermissions{
			CreateRollout: requestBody.Permissions.CreateRollout,
			UpdateRelease: requestBody.Permissions.UpdateRelease,
			RemoveRollout: requestBody.Permissions.RemoveRollout,
			Admin:         requestBody.Permissions.Admin,
		},
	}

	permissions, err := controller.ConciergeUpdateUserCase.Update(id, user)
	if err != nil {
		return protocols.HttpResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
		}
	}

	return protocols.HttpResponse{
		StatusCode: http.StatusOK,
		Body:       permissions,
	}
}
