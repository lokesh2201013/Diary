package controller

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/lokesh2201013/Diary/database"
	"github.com/lokesh2201013/Diary/model"
)

const uploadDir = "./static/uploads/"

func init() {
	// Create the upload directory if it doesn't exist
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		err := os.MkdirAll(uploadDir, os.ModePerm)
		if err != nil {
			log.Fatalf("Failed to create upload directory: %v", err)
		}
	}
}

func DiaryList(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary List",
	}

	time.Sleep(time.Millisecond * 500)
	db := database.DBConn
	var records []model.Diary
	db.Find(&records)
	context["diary_records"] = records
	c.Status(200)
	return c.JSON(context)
}

func DiaryDetail(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Detail",
	}

	id := c.Params("id")

	var record model.Diary
	result := database.DBConn.First(&record, id)

	if record.ID == 0 {
		log.Println("Record not found")
		context["msg"] = "Record Not Found"
		c.Status(404)
		return c.JSON(context)
	}

	if result.Error != nil {
		context["msg"] = "Something Went Wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["record"] = record
	c.Status(200)
	return c.JSON(context)
}

func DiaryCreate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Create",
	}

	record := new(model.Diary)

	if err := c.BodyParser(record); err != nil {
		log.Println("Error in parsing request")
		context["msg"] = "Something went wrong"
		c.Status(400)
		return c.JSON(context)
	}

	file, err := c.FormFile("file")
	if err == nil && file.Size > 0 {
		filename := "./static/uploads/" + file.Filename
		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
			context["msg"] = "File upload failed"
			c.Status(500)
			return c.JSON(context)
		}
		record.Image = filename
	}

	result := database.DBConn.Create(record)
	if result.Error != nil {
		log.Println("Error in saving data", result.Error)
		context["msg"] = "Something went wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record Saved Successfully"
	context["data"] = record
	c.Status(200)
	return c.JSON(context)
}

func DiaryUpdate(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Update",
	}

	id := c.Params("id")
	var record model.Diary

	database.DBConn.First(&record, id)
	if record.ID == 0 {
		log.Println("Record not Found")
		context["msg"] = "Record Not Found"
		c.Status(404)
		return c.JSON(context)
	}

	if err := c.BodyParser(&record); err != nil {
		log.Println("Error in parsing request", err)
		context["msg"] = "Something went wrong"
		c.Status(400)
		return c.JSON(context)
	}

	file, err := c.FormFile("file")
	if err == nil && file.Size > 0 {
		filename := "static/uploads/" + file.Filename
		if err := c.SaveFile(file, filename); err != nil {
			log.Println("Error in file uploading...", err)
			context["msg"] = "File upload failed"
			c.Status(500)
			return c.JSON(context)
		}
		record.Image = filename
	}

	result := database.DBConn.Save(&record)
	if result.Error != nil {
		log.Println("Error in saving data", result.Error)
		context["msg"] = "Something went wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record Updated Successfully"
	context["data"] = record
	c.Status(200)
	return c.JSON(context)
}

func DiaryDelete(c *fiber.Ctx) error {
	context := fiber.Map{
		"statusText": "ok",
		"msg":        "Diary Delete",
	}

	id := c.Params("id")
	var record model.Diary

	database.DBConn.First(&record, id)
	if record.ID == 0 {
		log.Println("Record not found")
		context["msg"] = "Record Not Found"
		c.Status(404)
		return c.JSON(context)
	}

	filename := record.Image
	if err := os.Remove(filename); err != nil {
		log.Println("Error in deleting file.", err)
	}

	result := database.DBConn.Delete(&record)
	if result.Error != nil {
		context["msg"] = "Something Went Wrong"
		c.Status(400)
		return c.JSON(context)
	}

	context["msg"] = "Record Deleted Successfully"
	c.Status(200)
	return c.JSON(context)
}
