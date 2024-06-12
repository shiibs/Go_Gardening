package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/shiibs/go-garden-planner/database"
	"github.com/shiibs/go-garden-planner/model"

	"golang.org/x/oauth2"

	"golang.org/x/oauth2/google"
)


var googleOauthConfig *oauth2.Config

func InitOAuth() {
    googleOauthConfig = &oauth2.Config{
        RedirectURL:  "http://localhost:8001/auth/callback",
        ClientID:     "572068711762-09vptss1fv1bquptr3sfjrbme9t4fk8l.apps.googleusercontent.com",
        ClientSecret: "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",
        Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
        Endpoint:     google.Endpoint,
    }
}

func GoogleLoginHandler(c *fiber.Ctx) error {

    url := googleOauthConfig.AuthCodeURL("state")
    return c.Redirect(url)
}

func GoogleCallbackHandler(c *fiber.Ctx) error {
    code := c.Query("code")
    if code == "" {
        return c.Status(fiber.StatusBadRequest).SendString("Code query parameter is missing")
    }

    token, err := googleOauthConfig.Exchange(context.Background(), code)
    if err != nil {
        log.Printf("Failed to exchange token: %v\n", err)
        return c.Status(fiber.StatusInternalServerError).SendString("Failed to exchange token")
    }

    userInfo, err := getUserInfo(token.AccessToken)
    if err != nil {
        log.Printf("Failed to get user info: %v\n", err)
        return c.Status(fiber.StatusInternalServerError).SendString("Failed to get user info")
    }

 

    // Check if the user exists in the database
    var user model.User
    result := database.DBConn.Where(&model.User{GoogleID: userInfo.ID}).First(&user)
    if result.Error != nil {
        // User does not exist, create a new user
        user = model.User{
            GoogleID: userInfo.ID,
            Email:    userInfo.Email,
            UserName: userInfo.Name,
        }
        if err := database.DBConn.Create(&user).Error; err != nil {
            log.Printf("Failed to create user: %v\n", err)
            return c.Status(fiber.StatusInternalServerError).SendString("Failed to create user")
        }
    } else {
        // User exists, update user information
        user.Email = userInfo.Email
        user.UserName = userInfo.Name
        if err := database.DBConn.Save(&user).Error; err != nil {
            log.Printf("Failed to update user: %v\n", err)
            return c.Status(fiber.StatusInternalServerError).SendString("Failed to update user")
        }
    }

    returnObject := fiber.Map{
		"status": "OK",
		"msg":    "Login route",
	}

     // add jwt token and return token and user details in context
    jwttoken, err := GenerateToken(user)
    if err != nil {
        returnObject["msg"] = "Token creation error."
        return c.Status(fiber.StatusUnauthorized).JSON(returnObject)
    }

    var loggedInUser model.LoggedInUser

    loggedInUser.ID = user.ID
    loggedInUser.UserName= user.UserName

    gardenLayout, err := GetAllGardenByUserID(loggedInUser.ID)

    if err != nil {
        log.Println("failed to get gardens:", err)
    }

    // get garden details of the user if available
    gardens := make([]model.GardenDetails, len(gardenLayout))
    for _, garden := range gardenLayout {
        var data model.GardenDetails
        data.ID = garden.ID
        data.Name = garden.Name

        gardens = append(gardens, data)
    }

    loggedInUser.Gardens = gardens
    // Create a map to hold user data

    fmt.Println(loggedInUser.Gardens)
    userData := map[string]interface{}{
        "user":   loggedInUser,
        "token":  jwttoken,
    }


    loginData, err := json.Marshal(userData)
    if err != nil {
        log.Printf("Failed to serialize user data: %v\n", err)
        return c.Status(fiber.StatusInternalServerError).SendString("Failed to serialize user data")
    }
   // Set a cookie with the serialized user data
   c.Cookie(&fiber.Cookie{
    Name:  "userData",
    Value: string(loginData),   
   })

    return c.Redirect("http://localhost:5173", fiber.StatusTemporaryRedirect)
}

type UserInfoResponse struct {
    ID             string `json:"id"`
    Email          string `json:"email"`
    VerifiedEmail  bool   `json:"verified_email"`
    Name           string `json:"name"`
    GivenName      string `json:"given_name"`
    FamilyName     string `json:"family_name"`
    Picture        string `json:"picture"`
    Locale         string `json:"locale"`
}

func getUserInfo(token string) (*UserInfoResponse, error) {
    resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token)
    if err != nil {
        log.Printf("Failed to get user info: %v\n", err)
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        log.Printf("Failed to get user info: status code %d\n", resp.StatusCode)
        return nil, fmt.Errorf("failed to get user info: status code %d", resp.StatusCode)
    }

    userInfo := &UserInfoResponse{}
    if err := json.NewDecoder(resp.Body).Decode(userInfo); err != nil {
        log.Printf("Failed to decode user info: %v\n", err)
        return nil, err
    }

    return userInfo, nil
}

func GetAllGardenByUserID(userID uint) ([]model.GardenLayout, error){
    var gardens []model.GardenLayout

    result := database.DBConn.Where("user_id = ?", userID).Find(&gardens)

    return gardens, result.Error
}