# 🤝 Contributing Guidelines

Thank you for your interest in contributing to SaaSquatch Leads! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Testing Requirements](#testing-requirements)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to:

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or inflammatory comments
- Personal attacks or political discussions
- Public or private harassment
- Publishing private information without permission

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Git** installed and configured
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Code editor** (VS Code recommended)
- **Basic understanding** of React and Flask

### Fork and Clone

1. **Fork the repository**:
   ```bash
   # Visit https://github.com/Tejaswini6jk/Saasquatch-leads
   # Click "Fork" button
   ```

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Saasquatch-leads.git
   cd Saasquatch-leads
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Tejaswini6jk/Saasquatch-leads.git
   ```

## 🛠️ Development Setup

### Backend Setup

1. **Create virtual environment**:
   ```bash
   python -m venv .venv
   
   # Activate (Windows)
   .\.venv\Scripts\activate
   
   # Activate (macOS/Linux)
   source .venv/bin/activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   pip install -r requirements-dev.txt  # Development dependencies
   ```

3. **Run backend**:
   ```bash
   python backend/app.py
   ```

### Frontend Setup

1. **Navigate to frontend**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Development Tools

Install recommended VS Code extensions:

```json
{
  "recommendations": [
    "ms-python.python",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

## 📝 Coding Standards

### Python (Backend)

#### Style Guide
- Follow **PEP 8** style guide
- Use **Black** for code formatting
- Maximum line length: **88 characters**
- Use **type hints** where possible

#### Example Code Style
```python
from typing import List, Dict, Optional
import pandas as pd

def score_lead(lead_data: Dict[str, any]) -> int:
    """
    Calculate AI-powered lead score.
    
    Args:
        lead_data: Dictionary containing lead information
        
    Returns:
        Integer score between 0-100
        
    Raises:
        ValueError: If required fields are missing
    """
    required_fields = ['company_name', 'industry', 'region']
    
    for field in required_fields:
        if not lead_data.get(field):
            raise ValueError(f"Missing required field: {field}")
    
    # Calculate score logic here
    score = calculate_industry_score(lead_data['industry'])
    score += calculate_revenue_score(lead_data.get('revenue_estimate', 0))
    
    return min(score, 100)
```

#### Naming Conventions
- **Functions**: `snake_case`
- **Classes**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Private methods**: `_leading_underscore`

### JavaScript/React (Frontend)

#### Style Guide
- Use **ESLint** and **Prettier** configurations
- Follow **React best practices**
- Use **functional components** with hooks
- Prefer **const** over let

#### Example Code Style
```javascript
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const LeadTable = ({ leads, onSort, sortKey, sortDir }) => {
  const [filteredLeads, setFilteredLeads] = useState([]);
  
  const handleSort = useCallback((key) => {
    const newDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
    onSort(key, newDir);
  }, [sortKey, sortDir, onSort]);
  
  useEffect(() => {
    // Filter logic here
    const filtered = leads.filter(lead => lead.score >= 50);
    setFilteredLeads(filtered);
  }, [leads]);
  
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table content */}
    </div>
  );
};

LeadTable.propTypes = {
  leads: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortDir: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default LeadTable;
```

#### Component Structure
```javascript
// 1. Imports
import React from 'react';
import PropTypes from 'prop-types';

// 2. Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState();
  
  // 4. Event handlers
  const handleClick = () => {};
  
  // 5. Effects
  useEffect(() => {}, []);
  
  // 6. Render
  return <div>Content</div>;
};

// 7. PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 8. Export
export default ComponentName;
```

## 📝 Commit Guidelines

### Commit Message Format

Use the following format for commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
```bash
feat(scoring): add industry bonus scoring logic
fix(api): handle missing contact_email in lead data
docs(readme): update installation instructions
style(frontend): format components with prettier
refactor(backend): extract scoring logic to service class
test(api): add unit tests for lead scoring endpoint
chore(deps): update pandas to version 2.2.2
```

### Commit Best Practices

1. **Keep commits atomic**: One logical change per commit
2. **Write clear descriptions**: Explain what and why, not how
3. **Use present tense**: "Add feature" not "Added feature"
4. **Limit line length**: Keep descriptions under 50 characters
5. **Reference issues**: Use "Fixes #123" or "Closes #456"

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation if needed

4. **Run tests**:
   ```bash
   # Backend tests
   cd backend && python -m pytest
   
   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scoring): add industry bonus scoring logic"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating Pull Request

1. **Go to GitHub** and create a new Pull Request
2. **Fill out the template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Tests pass locally
   - [ ] Manual testing completed
   - [ ] Screenshots (if UI changes)
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** and update PR
4. **Approval** from at least one maintainer
5. **Merge** by maintainers

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 91]
 - Python version: [e.g. 3.9.0]
 - Node version: [e.g. 16.0.0]

**Additional context**
Any other context about the problem.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 🧪 Testing Requirements

### Backend Testing

Create tests in `backend/tests/`:

```python
import pytest
from backend.scoring import score_lead

def test_score_lead_saas_company():
    """Test scoring for SaaS company."""
    lead_data = {
        'company_name': 'Test SaaS',
        'industry': 'SaaS',
        'region': 'US',
        'revenue_estimate': 10000000,
        'contact_email': 'test@example.com'
    }
    
    score = score_lead(lead_data)
    assert score >= 80  # SaaS companies should score high
```

### Frontend Testing

Create tests in `frontend/src/__tests__/`:

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreBadge from '../components/ScoreBadge';

describe('ScoreBadge', () => {
  it('renders high score with green color', () => {
    render(<ScoreBadge score={85} />);
    
    const badge = screen.getByText('85');
    expect(badge).toHaveClass('score-high');
  });
  
  it('renders medium score with yellow color', () => {
    render(<ScoreBadge score={65} />);
    
    const badge = screen.getByText('65');
    expect(badge).toHaveClass('score-medium');
  });
});
```

### Test Coverage

Maintain test coverage above 80%:
```bash
# Backend coverage
cd backend && python -m pytest --cov=.

# Frontend coverage
cd frontend && npm test -- --coverage
```

## 📚 Documentation

### Code Documentation

- **Python**: Use docstrings following Google style
- **JavaScript**: Use JSDoc comments
- **README**: Keep installation and usage instructions updated

### API Documentation

- Update API documentation for new endpoints
- Include request/response examples
- Document error codes and messages

### Architecture Documentation

- Update architecture diagrams for significant changes
- Document new design patterns or technologies
- Keep deployment guides current

## 🏷️ Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes prepared
- [ ] Tagged in Git

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Request Comments**: Code-specific discussions

### Response Times

- **Bug reports**: Within 2 business days
- **Feature requests**: Within 1 week
- **Pull requests**: Within 3 business days
- **General questions**: Within 1 week

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page

Thank you for contributing to SaaSquatch Leads! 🚀
