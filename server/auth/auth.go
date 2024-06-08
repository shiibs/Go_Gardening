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

    // get garden details of the user if available
    gardens := make([]map[string]interface{}, len(user.Gardens))
    for i, garden := range user.Gardens {
        gardens[i] = map[string]interface{}{
            "id":   garden.ID,
            "name": garden.Name,
        }
    }

    returnObject["garden"] = gardens
    returnObject["token"] = jwttoken
    returnObject["user"] = user
    returnObject["msg"] = "User authenticated"
    return c.Status(fiber.StatusOK).JSON(returnObject)
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

// func GetUserHandler(c *fiber.Ctx) error {

//     sess, err := database.Store.Get(c)
//     if err != nil {
//         log.Println("Error retrieving session:", err)
//         return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
//             "statusText": "Error",
//             "message":    "Session retrieval failed",
//         })
//     }
//     defer sess.Save()

//     log.Println("Session in getUserHandler", sess)
//     // Check if user is authenticated
//     userID := sess.Get("userID")
//     userEmail := sess.Get("userEmail")
//     log.Println("userId and email in getUserHandler", userID, userEmail)
  
//     var user model.User
//     result := database.DBConn.Preload("Gardens").First(&user, userID)
//     if result.Error != nil {
//         return c.Status(fiber.StatusInternalServerError).SendString("User not found")
//     }

//     // Prepare a response with garden IDs and names
//     gardens := make([]map[string]interface{}, len(user.Gardens))
//     for i, garden := range user.Gardens {
//         gardens[i] = map[string]interface{}{
//             "id":   garden.ID,
//             "name": garden.Name,
//         }
//     }

//     response := map[string]interface{}{
//         "userName": user.UserName,
//         "gardens":  gardens,
//     }

//     return c.JSON(response)
// }
