package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/auth"
	"github.com/shiibs/go-garden-planner/database"
	"github.com/shiibs/go-garden-planner/model"
)

func RefreshToken(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Refresh Token route",
	}

	email := c.Locals("email")

	if email == nil {
		log.Println("Email not found")
		returnObject["msg"] = "Email not found."
		return c.Status(fiber.StatusUnauthorized).JSON(returnObject)
	}

	var user model.User

	if err := database.DBConn.Where("email = ?", email).First(&user).Error; err != nil {
		log.Println("User not found.")
		returnObject["msg"] = "User not found."
		return c.Status(fiber.StatusBadRequest).JSON(returnObject)
	}

	token, err := auth.GenerateToken(user)

	if err != nil {
		returnObject["msg"] = "Token creation error."
		return c.Status(fiber.StatusUnauthorized).JSON(returnObject)
	}

	  // get garden details of the user if available
	  gardens := make([]map[string]interface{}, len(user.Gardens))
	  for i, garden := range user.Gardens {
		  gardens[i] = map[string]interface{}{
			  "id":   garden.ID,
			  "name": garden.Name,
		  }
	  }

	returnObject["token"] = token
	returnObject["user"] = user
	returnObject["garden"] = gardens

	return c.Status(fiber.StatusOK).JSON(returnObject)
}