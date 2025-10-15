# 📚 API Documentation

## Overview

The SaaSquatch Leads API provides endpoints for lead scoring and management. Built with Flask, it offers RESTful endpoints for retrieving leads, scoring individual leads, and filtering data.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, the API does not require authentication. For production deployment, consider implementing API keys or JWT tokens.

## Endpoints

### GET /api/leads

Retrieve all leads with computed AI scores.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `industry` | string | No | Filter leads by industry (e.g., "SaaS", "Tech") |
| `region` | string | No | Filter leads by region (e.g., "US", "EU") |
| `min_score` | integer | No | Minimum score threshold (0-100) |

#### Example Request

```bash
curl -X GET "http://localhost:5000/api/leads?industry=SaaS&min_score=80"
```

#### Response

```json
[
  {
    "company_name": "Techify Labs",
    "industry": "SaaS",
    "region": "US",
    "revenue_estimate": 7500000,
    "contact_email": "ceo@techify.com",
    "contact_phone": "9876543210",
    "score": 95
  },
  {
    "company_name": "DataFlow Inc",
    "industry": "SaaS",
    "region": "US",
    "revenue_estimate": 12000000,
    "contact_email": "contact@dataflow.com",
    "contact_phone": "5551234567",
    "score": 88
  }
]
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `company_name` | string | Name of the company |
| `industry` | string | Industry classification |
| `region` | string | Geographic region |
| `revenue_estimate` | number | Estimated annual revenue in USD |
| `contact_email` | string | Primary contact email address |
| `contact_phone` | string | Primary contact phone number |
| `score` | integer | AI-computed lead score (0-100) |

### POST /api/score

Score a single lead object using the AI scoring algorithm.

#### Request Body

```json
{
  "company_name": "Example Corp",
  "industry": "SaaS",
  "region": "US",
  "revenue_estimate": 6000000,
  "contact_email": "ceo@example.com",
  "contact_phone": "1234567890"
}
```

#### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `company_name` | string | Name of the company |
| `industry` | string | Industry classification |
| `region` | string | Geographic region |
| `revenue_estimate` | number | Estimated annual revenue |

#### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `contact_email` | string | Primary contact email address |
| `contact_phone` | string | Primary contact phone number |

#### Example Request

```bash
curl -X POST "http://localhost:5000/api/score" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Example Corp",
    "industry": "SaaS",
    "region": "US",
    "revenue_estimate": 6000000,
    "contact_email": "ceo@example.com"
  }'
```

#### Response

```json
{
  "score": 88
}
```

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server-side error |

### Error Response Format

```json
{
  "error": "Error message description",
  "details": "Additional error details if available"
}
```

### Common Error Scenarios

#### 400 Bad Request
```json
{
  "error": "Invalid input data",
  "details": "Missing required field: industry"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "details": "Failed to process lead data"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. For production deployment, consider implementing rate limiting to prevent abuse.

## CORS

The API includes CORS headers to allow cross-origin requests from the frontend application.

## Data Validation

The API validates input data according to the following rules:

- **company_name**: Required, non-empty string
- **industry**: Required, non-empty string
- **region**: Required, non-empty string
- **revenue_estimate**: Required, positive number
- **contact_email**: Optional, valid email format
- **contact_phone**: Optional, string with 10+ characters

## Testing the API

### Using cURL

```bash
# Get all leads
curl -X GET "http://localhost:5000/api/leads"

# Get SaaS leads with score 80+
curl -X GET "http://localhost:5000/api/leads?industry=SaaS&min_score=80"

# Score a new lead
curl -X POST "http://localhost:5000/api/score" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "industry": "Tech",
    "region": "US",
    "revenue_estimate": 5000000
  }'
```

### Using Python requests

```python
import requests

# Get all leads
response = requests.get("http://localhost:5000/api/leads")
leads = response.json()

# Score a new lead
lead_data = {
    "company_name": "Test Company",
    "industry": "Tech",
    "region": "US",
    "revenue_estimate": 5000000
}
response = requests.post("http://localhost:5000/api/score", json=lead_data)
score = response.json()["score"]
```

## Production Considerations

### Security
- Implement API authentication (JWT tokens, API keys)
- Add input sanitization and validation
- Enable HTTPS with SSL certificates
- Implement rate limiting and request throttling

### Performance
- Add database connection pooling
- Implement caching for frequently accessed data
- Add request/response compression
- Monitor API performance and response times

### Monitoring
- Add logging for all API requests
- Implement health check endpoints
- Set up error tracking and alerting
- Monitor API usage and performance metrics
