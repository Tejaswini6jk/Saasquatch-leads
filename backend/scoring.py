import pandas as pd


def score_lead(row: pd.Series) -> int:
    """Advanced AI-powered lead scoring algorithm with multi-factor analysis.
    
    Scoring Factors:
    1. Industry Potential (0-25 points)
    2. Company Size/Revenue (0-25 points) 
    3. Contact Quality (0-20 points)
    4. Geographic Market (0-15 points)
    5. Data Completeness (0-15 points)
    """
    score: int = 0
    
    # 1. Industry Potential (0-25 points)
    industry_value = str(row.get("industry", "")).strip().lower()
    industry_scores = {
        "saas": 25, "tech": 25, "fintech": 25, "software": 25,
        "finance": 20, "banking": 20, "insurance": 18,
        "healthcare": 15, "medtech": 20, "biotech": 18,
        "ecommerce": 15, "retail": 12, "logistics": 10,
        "energy": 12, "cleantech": 15, "edtech": 15,
        "travel": 8, "hospitality": 6, "food": 5,
        "agriculture": 4, "manufacturing": 8
    }
    score += industry_scores.get(industry_value, 5)
    
    # 2. Company Size/Revenue (0-25 points)
    revenue_value = row.get("revenue_estimate", 0)
    try:
        revenue_float = float(revenue_value if revenue_value is not None else 0)
    except Exception:
        revenue_float = 0.0
    
    if revenue_float >= 50_000_000:      # $50M+ (Enterprise)
        score += 25
    elif revenue_float >= 20_000_000:    # $20M+ (Large)
        score += 22
    elif revenue_float >= 10_000_000:    # $10M+ (Mid-Large)
        score += 18
    elif revenue_float >= 5_000_000:     # $5M+ (Mid)
        score += 15
    elif revenue_float >= 2_000_000:     # $2M+ (Small-Mid)
        score += 10
    elif revenue_float >= 1_000_000:     # $1M+ (Small)
        score += 5
    else:
        score += 0
    
    # 3. Contact Quality (0-20 points)
    contact_email_value = row.get("contact_email")
    contact_phone_value = row.get("contact_phone")
    
    email_score = 0
    if pd.notna(contact_email_value) and str(contact_email_value).strip() != "" and str(contact_email_value).strip() != "nan":
        email_domain = str(contact_email_value).split('@')[-1].lower()
        # Premium domains get higher scores
        if email_domain in ['gmail.com', 'yahoo.com', 'hotmail.com']:
            email_score = 8  # Personal email
        elif email_domain in ['company.com', 'corp.com', 'inc.com']:
            email_score = 15  # Corporate email
        else:
            email_score = 12  # Other business email
    
    phone_score = 0
    if pd.notna(contact_phone_value) and str(contact_phone_value).strip() != "":
        phone_str = str(contact_phone_value).replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
        if len(phone_str) >= 10:  # Valid phone number
            phone_score = 5
    
    score += email_score + phone_score
    
    # 4. Geographic Market (0-15 points)
    region_value = str(row.get("region", "")).strip().upper()
    region_scores = {
        "US": 15, "CANADA": 12, "UK": 12, "EU": 10,
        "AUSTRALIA": 8, "SINGAPORE": 8, "JAPAN": 8,
        "APAC": 6, "LATAM": 5, "AFRICA": 4, "ME": 6
    }
    score += region_scores.get(region_value, 3)
    
    # 5. Data Completeness (0-15 points)
    completeness_score = 0
    required_fields = ['company_name', 'industry', 'region', 'revenue_estimate']
    optional_fields = ['contact_email', 'contact_phone']
    
    # Check required fields
    required_complete = sum(1 for field in required_fields if pd.notna(row.get(field)) and str(row.get(field)).strip() != "")
    completeness_score += (required_complete / len(required_fields)) * 10
    
    # Check optional fields
    optional_complete = sum(1 for field in optional_fields if pd.notna(row.get(field)) and str(row.get(field)).strip() != "")
    completeness_score += (optional_complete / len(optional_fields)) * 5
    
    score += int(completeness_score)
    
    # Bonus points for high-value combinations
    if (industry_value in ["saas", "tech", "fintech"] and 
        revenue_float >= 10_000_000 and 
        region_value in ["US", "UK", "CANADA"]):
        score += 5  # High-value tech company bonus
    
    return min(int(score), 100)


def score_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Return a copy of the dataframe with a computed 'score' column."""
    df_copy = df.copy()
    if not df_copy.empty:
        df_copy["score"] = df_copy.apply(score_lead, axis=1)
    else:
        df_copy["score"] = []
    return df_copy


