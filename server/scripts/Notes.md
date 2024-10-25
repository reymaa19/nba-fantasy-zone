# DEV
1. Set Up a Virtual Environment: Create and activate a virtual environment for Python.
2. Create a requirements.txt File: List all the Python dependencies.
3. Create Node.js Scripts: Create scripts to run the Python scripts.
4. Update package.json: Add scripts to package.json to run the Node.js scripts.

- requirements.txt file for python packagers found in /utils/scrape
- Node.js scripts are found in /scripts
- package.json scripts are found in each script file

## Setting up Python virtual environment:
Create a virtual environment
```
python3 -m venv venv
```

Activate the virtual environment (Linux/Mac)
```
source venv/bin/activate
```

Activate the virtual environment (Windows)
```
.\venv\Scripts\activate
```

Install the required packages
```
pip install -r server/utils/scrape/requirements.txt

```