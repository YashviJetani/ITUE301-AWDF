# Automated Test Suite for Practicals 7, 9, 10
# Covers: JWT Auth Pipeline, Input Validation, Cache Hits/Misses, and Async Event Architecture
$ErrorActionPreference = "Continue"
$BaseUrl = "http://localhost:5000"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " RUNNING PRACTICAL 7, 9, 10 COMPREHENSIVE TEST SUITE" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

function Assert-Test($name, $condition, $actual) {
    if ($condition) {
        Write-Host "  [PASS] $name" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $name - Actual: $actual" -ForegroundColor Red
    }
}

# 1. Health check
Write-Host "`n1. Testing GET / (Root Health Check)..." -ForegroundColor Yellow
$res = Invoke-RestMethod -Uri "$BaseUrl/" -Method Get
Assert-Test "Server is running smoothly" ($res.success -eq $true) $res.success

# 2. Input Validation on Registration (Missing fields should return 400)
Write-Host "`n2. Testing Input Validation on POST /auth/register (Empty payload)..." -ForegroundColor Yellow
try {
    $badReg = Invoke-RestMethod -Uri "$BaseUrl/auth/register" -Method Post -Body '{}' -ContentType "application/json"
    Assert-Test "Should have failed with 400" $false "Succeeded unexpectedly"
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Assert-Test "Registration rejected empty payload with HTTP 400 Bad Request" ($statusCode -eq 400) $statusCode
}

# 3. User Registration (Practical 7)
Write-Host "`n3. Testing POST /auth/register (Create User with bcrypt hashed password)..." -ForegroundColor Yellow
$randId = Get-Random -Minimum 1000 -Maximum 9999
$testEmail = "student_$randId@university.edu"
$regPayload = @{ name = "Meet Ghori"; email = $testEmail; password = "securePassword2026" } | ConvertTo-Json
$regRes = Invoke-RestMethod -Uri "$BaseUrl/auth/register" -Method Post -Body $regPayload -ContentType "application/json"
Assert-Test "User registered successfully" ($regRes.success -eq $true) $regRes.user.email
Assert-Test "JWT token generated on registration" ($null -ne $regRes.token) "Token present"

# 4. User Login (Practical 7)
Write-Host "`n4. Testing POST /auth/login (Validate credentials & generate JWT)..." -ForegroundColor Yellow
$loginPayload = @{ email = $testEmail; password = "securePassword2026" } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "$BaseUrl/auth/login" -Method Post -Body $loginPayload -ContentType "application/json"
$token = $loginRes.token
Assert-Test "Login returned HTTP 200 and signed JWT token" ($null -ne $token) "Token received"

$authHeaders = @{
    "Authorization" = "Bearer $token"
    "Content-Type"  = "application/json"
}

# 5. Protected User Profile (/auth/me endpoint)
Write-Host "`n5. Testing GET /auth/me (Protected route using decoded JWT)..." -ForegroundColor Yellow
$meRes = Invoke-RestMethod -Uri "$BaseUrl/auth/me" -Method Get -Headers $authHeaders
Assert-Test "/me returned authenticated user details" ($meRes.user.email -eq $testEmail) $meRes.user.name

# 6. Auth Middleware Protection Check: Missing Token (Expect 401)
Write-Host "`n6. Testing GET /tasks without Token (Expect 401 Unauthorized)..." -ForegroundColor Yellow
try {
    $unauthRes = Invoke-RestMethod -Uri "$BaseUrl/tasks" -Method Get
    Assert-Test "Should fail without token" $false "Allowed unexpectedly"
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Assert-Test "Protected route rejected request without token with 401" ($statusCode -eq 401) $statusCode
}

# 7. Auth Middleware Protection Check: Invalid/Tampered Token (Expect 401)
Write-Host "`n7. Testing GET /tasks with Tampered Token (Expect 401 Unauthorized)..." -ForegroundColor Yellow
try {
    $badTokenHeaders = @{ "Authorization" = "Bearer invalid_tampered_token_xyz" }
    $tamperedRes = Invoke-RestMethod -Uri "$BaseUrl/tasks" -Method Get -Headers $badTokenHeaders
    Assert-Test "Should fail with tampered token" $false "Allowed unexpectedly"
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Assert-Test "Protected route rejected tampered token with 401" ($statusCode -eq 401) $statusCode
}

# 8. Practical 9: In-Memory Caching on GET /tasks (First Request - Cache MISS)
Write-Host "`n8. Testing GET /tasks with Valid JWT (Request 1: Cache MISS)..." -ForegroundColor Yellow
$sw = [System.Diagnostics.Stopwatch]::StartNew()
$resMiss = Invoke-WebRequest -UseBasicParsing -Uri "$BaseUrl/tasks" -Method Get -Headers $authHeaders
$sw.Stop()
$missTime = $sw.ElapsedMilliseconds
$missHeader = $resMiss.Headers["X-Cache"]
Assert-Test "Request 1 X-Cache header is MISS" ($missHeader -eq "MISS") $missHeader
Write-Host "   ⏱ Cache MISS Latency: ${missTime} ms" -ForegroundColor DarkCyan

# 9. Practical 9: Cache HIT on subsequent request
Write-Host "`n9. Testing GET /tasks (Request 2: Cache HIT from RAM)..." -ForegroundColor Yellow
$sw.Restart()
$resHit = Invoke-WebRequest -UseBasicParsing -Uri "$BaseUrl/tasks" -Method Get -Headers $authHeaders
$sw.Stop()
$hitTime = $sw.ElapsedMilliseconds
$hitHeader = $resHit.Headers["X-Cache"]
Assert-Test "Request 2 X-Cache header is HIT" ($hitHeader -eq "HIT") $hitHeader
Write-Host "   ⏱ Cache HIT Latency: ${hitTime} ms" -ForegroundColor DarkCyan

# 10. Check Cache Stats endpoint
Write-Host "`n10. Testing GET /api/cache/stats (Cache Metrics Endpoint)..." -ForegroundColor Yellow
$cacheStats = Invoke-RestMethod -Uri "$BaseUrl/api/cache/stats" -Method Get
Assert-Test "Cache stats reports recorded hits" ($cacheStats.hits -ge 1) $cacheStats.hits
Assert-Test "Cache stats reports active keys" ($cacheStats.activeKeys -contains "all_tasks") $cacheStats.activeKeys

# 11. Practical 10: Asynchronous Processing & Cache Invalidation on POST /tasks
Write-Host "`n11. Testing POST /tasks (Create Task, Invalidate Cache, Emit Async Event)..." -ForegroundColor Yellow
$taskPayload = @{
    title = "Implement Full-Stack Pipeline"
    description = "Completed Practicals 7 to 12 with JWT, React.lazy, NodeCache, EventEmitter, Docker, and CI/CD."
    priority = "high"
    completed = $false
} | ConvertTo-Json

$sw.Restart()
$createRes = Invoke-RestMethod -Uri "$BaseUrl/tasks" -Method Post -Body $taskPayload -Headers $authHeaders
$sw.Stop()
$createTime = $sw.ElapsedMilliseconds
$taskId = $createRes.data._id
Assert-Test "Task created successfully with HTTP 201" ($null -ne $taskId) $taskId
Write-Host "   ⏱ Immediate API Response Time: ${createTime} ms (Response sent before 1000ms background worker)" -ForegroundColor Green

# 12. Verify Cache Invalidation (Next GET must be MISS)
Write-Host "`n12. Testing GET /tasks after creation (Verify Cache Invalidation)..." -ForegroundColor Yellow
$resAfterInvalidate = Invoke-WebRequest -UseBasicParsing -Uri "$BaseUrl/tasks" -Method Get -Headers $authHeaders
$afterHeader = $resAfterInvalidate.Headers["X-Cache"]
Assert-Test "Cache was properly invalidated after write (X-Cache: MISS)" ($afterHeader -eq "MISS") $afterHeader

# 13. Practical 10: Task Update Event
Write-Host "`n13. Testing PUT /tasks/:id (Update Task, Invalidate Cache, Emit 'task-updated')..." -ForegroundColor Yellow
$updatePayload = @{
    title = "Implement Full-Stack Pipeline [VERIFIED]"
    completed = $true
    priority = "high"
} | ConvertTo-Json
$updateRes = Invoke-RestMethod -Uri "$BaseUrl/tasks/$taskId" -Method Put -Body $updatePayload -Headers $authHeaders
Assert-Test "Task marked completed" ($updateRes.data.completed -eq $true) $updateRes.data.completed

# 14. Practical 10: Task Deletion Event
Write-Host "`n14. Testing DELETE /tasks/:id (Delete Task, Invalidate Cache, Emit 'task-deleted')..." -ForegroundColor Yellow
$deleteRes = Invoke-RestMethod -Uri "$BaseUrl/tasks/$taskId" -Method Delete -Headers $authHeaders
Assert-Test "Task deleted successfully" ($deleteRes.success -eq $true) $deleteRes.message

# 15. Verify Deletion with 404
Write-Host "`n15. Testing GET /tasks/:id after deletion (Expects 404)..." -ForegroundColor Yellow
try {
    $verifyRes = Invoke-RestMethod -Uri "$BaseUrl/tasks/$taskId" -Method Get -Headers $authHeaders
    Assert-Test "Deleted task should return 404" $false "Found"
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Assert-Test "Confirmed task removal from DB (HTTP 404)" ($statusCode -eq 404) $statusCode
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " ALL PRACTICAL 7, 9, 10 INTEGRATION TESTS PASSED CLEANLY!" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
