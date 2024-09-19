package model

import (
    
)

type Diary struct{
    ID uint `json:"id" gorm:"primaryKey"`
    Title string `json:"title" gorm:"not null;column:title;type:varchar(255)"`
    Post string  `json:"post" gorm:"not null;column:post;type:varchar(255)"`
    Year int `json:"year" gorm:"not null;column:year"`
    Month int `json:"month" gorm:"not null;column:month"`
    Day int `json:"day" gorm:"not null;column:day"`//this is date
    //Image string `json:"image" gorm:"column:image;type:varchar(255)"`
}
 