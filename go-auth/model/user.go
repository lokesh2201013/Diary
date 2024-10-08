package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)
 type User struct{
	  ID   uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Email string `json:"email" gorm:"column:email;unique"`
	Password  string    `json:"-" gorm:"column:password;"`
 }
 func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    if u.ID == uuid.Nil {
        u.ID = uuid.New()
    }
    return
}