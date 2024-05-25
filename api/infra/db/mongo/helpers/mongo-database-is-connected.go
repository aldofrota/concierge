package helpers

import (
	"github.com/aldofrota/concierge/data/protocols"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDatabaseIsConnectedHelper struct {
	client *mongo.Client
}

func NewMongoDatabaseIsConnectedHelper(client *mongo.Client) protocols.DatabaseIsConnected {
	return MongoDatabaseIsConnectedHelper{client}
}

func (helper MongoDatabaseIsConnectedHelper) IsConnected() (bool, error) {
	err := helper.client.Ping(nil, nil)
	if err != nil {
		return false, err
	}
	return true, nil
}
