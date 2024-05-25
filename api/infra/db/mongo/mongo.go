package mongo

import (
	"context"
	"fmt"
	"time"

	"github.com/aldofrota/concierge/data/protocols"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type MongoHelper struct {
	client     *mongo.Client
	collection *mongo.Collection
}

func NewMongoService(client *mongo.Client, dbName string) protocols.Mongo {
	collection := client.Database(dbName).Collection("users")
	return &MongoHelper{client: client, collection: collection}
}

func (helper MongoHelper) FindAllUsers() ([]protocols.UserStruct, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cur, err := helper.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var users []protocols.UserStruct
	for cur.Next(ctx) {
		var user protocols.UserStruct
		err := cur.Decode(&user)
		if err != nil {
			return nil, err
		}

		// Remove the password field before appending to the users slice
		user.Password = ""
		users = append(users, user)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (helper MongoHelper) FindUserByEmail(email string) (protocols.UserStruct, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user protocols.UserStruct
	filter := bson.D{{Key: "email", Value: email}}
	err := helper.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return user, fmt.Errorf("user with email '%s' does not exist", email)
		}
		return user, err
	}

	return user, nil
}

func (helper MongoHelper) CreateUser(user protocols.UserStruct) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Verify e-mail already exists
	filter := bson.D{{Key: "email", Value: user.Email}}
	var existingUser protocols.UserStruct
	err := helper.collection.FindOne(ctx, filter).Decode(&existingUser)
	if err == nil {
		return fmt.Errorf("user with email '%s' already exists", user.Email)
	} else if err != mongo.ErrNoDocuments {
		return err
	}

	// Hash the password before saving the user
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword
	user.Id = primitive.NewObjectID()

	_, err = helper.collection.InsertOne(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func (helper MongoHelper) UpdateUser(id string, user protocols.UserStruct) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	// If password is being updated, hash the new password
	if user.Password != "" {
		hashedPassword, err := hashPassword(user.Password)
		if err != nil {
			return err
		}
		user.Password = hashedPassword
	}

	filter := bson.D{{Key: "_id", Value: objID}}
	update := bson.D{
		{Key: "$set", Value: user},
	}

	_, err = helper.collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (helper MongoHelper) DeleteUser(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.D{{Key: "_id", Value: objID}}
	_, err = helper.collection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	return nil
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
