# BayaX System Diagrams

### 1. Entity-Relationship (ER) Diagram
This diagram represents the exact Database schema relationships based on your current Mongoose models.

```mermaid
erDiagram
    USER {
        ObjectId _id PK
        String username
        String email
        String password
        Date createdAt
        Date updatedAt
    }

    IDEAPROJECT {
        ObjectId _id PK
        String field
        String intent
        String projectName
        String status "pending | completed | failed"
        Mixed analysisData
        ObjectId creatorId FK
        Date generatedAt
        Date createdAt
        Date updatedAt
    }

    LESSONPLAN {
        ObjectId _id PK
        String subject
        String topic
        Number grade
        Number duration
        ObjectId creatorId FK
        Date createdAt
        Date updatedAt
    }

    USER ||--o{ IDEAPROJECT : "creates"
    USER ||--o{ LESSONPLAN : "generates"
```

### 2. System Class Diagram
Displays exactly the MVC Layer, Controllers, and Services available in the TypeScript backend.

```mermaid
classDiagram
    %% Services
    class AIEngine {
        - AIEngine instance$
        - String modelName
        - Groq groq
        - GoogleGenerativeAI genAI
        + getInstance()$ AIEngine
        + buildPrompt(context, type) String
        + execute(prompt) Promise~object~
        - callGemini(prompt) Promise~object~
        - callGroq(prompt) Promise~object~
        - parseJSON(text) object
    }

    class JWTService {
        - String accessSecret
        - String refreshSecret
        - String accessExpiry
        - String refreshExpiry
        + generateAccessToken(userId) String
        + generateRefreshToken(userId) String
        + verifyRefreshToken(token) object
        + verifyAccessToken(token) object
    }

    class UserService {
        - JWTService jwtService
        + register(payload) Promise~object~
        + login(email, password) Promise~object~
        + refreshAccessToken(refreshToken) String
        + getProfile(userId) Promise~Document~
    }

    class IdeaService {
        - AIEngine aiEngine
        + performAnalysis(data) Promise~object~
        + storeProject(data, analysisData) Promise~void~
        + getProjects(creatorId) Promise~Document[]~
        + deleteProject(projectId, creatorId) Promise~void~
    }

    class LessonService {
        - AIEngine aiEngine
        + generateContent(data) Promise~object~
        + storePlan(data) Promise~void~
        + getPlans(creatorId) Promise~Document[]~
        + deletePlan(planId, creatorId) Promise~void~
    }

    %% Controllers
    class UserController {
        - UserService userService
        - JWTService jwtService
        - getCookieOptions() object
        + signUp(req, res) Promise~void~
        + signIn(req, res) Promise~void~
        + refreshToken(req, res) Promise~void~
        + viewPlans(req, res) Promise~void~
        + clearCookie(req, res) void
    }

    class IdeaController {
        - IdeaService ideaService
        + analyzeIdea(req, res) Promise~void~
        + getProjects(req, res) Promise~void~
        + deleteProject(req, res) Promise~void~
    }

    class LessonController {
        - AIEngine aiEngine
        - toText(data) String
        - getMockData(topic) object
        + createPlan(req, res) Promise~void~
        + viewAllPlans(req, res) Promise~void~
    }

    %% Relationships
    IdeaController --> IdeaService
    UserController --> UserService
    UserController --> JWTService
    LessonController --> AIEngine
    
    IdeaService --> AIEngine
    LessonService --> AIEngine
    UserService --> JWTService
```

### 3. Sequence Diagram (Idea Generation Flow)
Maps out the exact request lifecycle for generating a new AI Blueprint. 

```mermaid
sequenceDiagram
    actor Client
    participant Frontend (axiosInstance)
    participant AuthMiddleware
    participant IdeaController
    participant IdeaService
    participant AIEngine
    participant Gemini/Groq
    participant MongoDB

    Client->>Frontend (axiosInstance): Submit Idea Details
    Frontend (axiosInstance)->>AuthMiddleware: POST /api/v1/idea/analyze (with Cookies)
    
    alt Invalid/Expired Token
        AuthMiddleware-->>Frontend (axiosInstance): 401 Unauthorized
        Frontend (axiosInstance)->>UserController: POST /api/v1/user/refreshToken
        UserController-->>Frontend (axiosInstance): 200 OK (New Tokens)
        Frontend (axiosInstance)->>AuthMiddleware: Retry POST (with New Cookies)
    end
    
    AuthMiddleware->>IdeaController: Extract userId & Forward Request
    IdeaController->>IdeaService: performAnalysis(data)
    IdeaService->>AIEngine: execute(systemPrompt)
    AIEngine->>Gemini/Groq: generateContent (REST Call)
    Gemini/Groq-->>AIEngine: Return unstructured JSON text
    AIEngine->>AIEngine: parseJSON(text)
    AIEngine-->>IdeaService: return Valid JSON Object
    IdeaService-->>IdeaController: return analysisData
    
    IdeaController->>IdeaService: storeProject(data, analysisData)
    IdeaService->>MongoDB: IdeaProjectModel.create()
    MongoDB-->>IdeaService: Success
    IdeaService-->>IdeaController: Database Persisted
    
    IdeaController-->>Frontend (axiosInstance): 200 OK (data)
    Frontend (axiosInstance)-->>Client: Navigate to IdeaResult Page
```
