package helpers

import (
	"github.com/go-redis/redis"
	"repo.tallos.com.br/tallos/development/tallos-chat/support/concierge/data/protocols"
)

type RedisDatabaseIsConnectedHelper struct {
	client *redis.Client
}

func NewRedisDatabaseIsConnectedHelper(client *redis.Client) protocols.DatabaseIsConnected {
	return RedisDatabaseIsConnectedHelper{client}
}

func (helper RedisDatabaseIsConnectedHelper) IsConnected() (bool, error) {
	_, err := helper.client.Ping().Result()
	if err != nil {
		return false, err
	}
	return true, nil
}
