package controller

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/model"
)
func DiaryList(c *fiber.Ctx) error{
context:=fiber.Map{
	"statusText": "ok",
        "msg":"Diary List",
}
time.Sleep(time.Millisecond*500)
db:=database.DBConn
var records []model.Diary
db.Find(&records)
context["diary_records"]=records
c.Status(200)
return c.JSON(context)	
}
func DiaryDetail(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Detail",
	}

	id := c.Params("id") // Capture the 'id' from the URL parameters

	var record model.Diary

	// Use the 'id' to find the record and store the result
	result := database.DBConn.First(&record, id)

	// If no record is found, log it and return a 404 response
	if record.ID == 0 {
		log.Println("Record not found")
		context["msg"] = "Record Not Found"
		c.Status(404)
		return c.JSON(context)
	}

	// Check if there's an error in the query result
	if result.Error != nil {
		context["msg"] = "Something Went Wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["record"] = record
	context["msg"] = "Diary Detail"
	context["statusText"] = "Ok"

	c.Status(200)
	return c.JSON(context)
}


func DiaryCreate(c *fiber.Ctx)error{
	context:=fiber.Map{
		"statusText": "ok",
        "msg":"Diary Create",
	}


	record:=new(model.Diary)

	if err := c.BodyParser(&record);err!=nil {
		log.Println("Error in parsing request")
		context["msg"]="Something went wrong"
	}

	result:=database.DBConn.Create(record)
	
	if result.Error!=nil{
		log.Println("Error n saving data")
		context["statusText"]=""
		context["msg"]="Something went wrong"
	}
	
	context["msg"]="Record Saved Successfully"
	
	context["data"]=record
	
	c.Status(200)
	
	return c.JSON(context)
}

func DiaryUpdate(c *fiber.Ctx)error{
	context:=fiber.Map{
		"statusText": "ok",
        "msg":"Diary Update",
	}

	id:=c.Params("id")

	var record model.Diary

	database.DBConn.First(&record,id)

	if record.ID==0{
		log.Println("Record not Found ")
		c.Status(400)
		context["statusText"]=""
		context["msg"]="Record Not Found"
		return c.JSON(context)
	}

	if err:= c.BodyParser(&record);err!=nil{
		log.Println("Error in parsing Request")
	}

	result:= database.DBConn.Save(record)

	if result.Error!=nil{
		log.Println("Error in Saving Data")
	}

c.Status(200)
return c.JSON(context)
}


func DiaryDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Delete",
	}

	id := c.Params("id") // Capture the 'id' from the URL parameters

	var record model.Diary

	// Use the 'id' to find the record
	database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["msg"] = "Record Not Found"
		c.Status(400)
		return c.JSON(context)
	}

	result := database.DBConn.Delete(&record)

	if result.Error != nil {
		context["msg"] = "Something Went Wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record Deleted Successfully"
	context["statusText"] = "Ok"

	c.Status(200)
	return c.JSON(context)
}
