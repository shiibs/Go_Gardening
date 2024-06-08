package controller

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/database"
	"github.com/shiibs/go-garden-planner/model"
	"gorm.io/gorm"
)

func GetGardenLayoutWithID(c *fiber.Ctx) error {
	returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Get Garden route",
	}
  // Retrieve garden ID from the request
	gardenID := c.Params("id")

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

	// Initialize the garden layout model
	var gardenLayout model.GardenLayout

	// Query the database to find the garden by ID and preload its schedules and user
	result := database.DBConn.Preload("GardeningSchedule").Preload("User").First(&gardenLayout, gardenID)
	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"statusText": "Error",
				"message":    "Garden not found",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"statusText": "Error",
			"message":    "Error retrieving garden",
		})
	}

	// Check if the garden belongs to the authenticated user
	if gardenLayout.UserID != user.ID {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"statusText": "Error",
			"message":    "You are not authorized to access this garden",
		})
	}

	// Respond with the garden layout and its schedules
	return c.Status(fiber.StatusOK).JSON(gardenLayout)
}