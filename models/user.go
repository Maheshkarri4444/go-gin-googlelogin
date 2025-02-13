package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      string             `bson:"name,omitempty" json:"name"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password,omitempty" json:"-"`
	GoogleID  string             `bson:"google_id,omitempty" json:"google_id,omitempty"`
	CreatedAt int64              `bson:"created_at,omitempty" json:"created_at"`
}
