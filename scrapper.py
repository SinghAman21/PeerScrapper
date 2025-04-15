import sys
import time
from typing import List, Dict
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument('--headless=new')  # Use new headless mode
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-software-rasterizer')
    chrome_options.add_argument('--disable-webgl')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36')
    
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=chrome_options)

def fetch_webpage(url: str):
    driver = setup_driver()
    try:
        driver.get(url)
        # Wait for the projects to load
        WebDriverWait(driver, 2).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[class*='group/projectCard']"))
        )
        time.sleep(2)
        return driver
    except Exception as e:
        print(f"Error fetching the webpage: {e}")
        driver.quit()
        sys.exit(1)

def extract_project_details(project) -> Dict:
    try:
        name = project.find_element(By.CSS_SELECTOR, "[class*='text-gray-1k'][class*='font-semibold'][class*='text-sm']")
        description = project.find_element(By.CSS_SELECTOR, "[class*='text-gray-1k'][class*='font-normal'][class*='text-sm']")
        category_tag = project.find_elements(By.CSS_SELECTOR, "[class*='text-gray-500'][class*='font-normal'][class*='text-xs'][class*='paragraph-clamp1']")
        upvotes_tag = project.find_elements(By.CSS_SELECTOR, "[class*='font-semibold'][class*='tabular-nums']")
        
        # Extract project image
        image_element = project.find_element(By.CSS_SELECTOR, "img[class*='duration-500']")
        image_url = image_element.get_attribute('src') if image_element else "N/A"

        # Process categories into array
        category_text = category_tag[0].text.strip() if category_tag else "N/A"
        categories = [cat.strip() for cat in category_text.split(',')] if category_text != "N/A" else []
        
        # Extract project URL
        url_element = project.find_element(By.CSS_SELECTOR, "a[class*='h-full']")
        project_url = url_element.get_attribute('href')
        full_url = f"{project_url}" if project_url else "N/A"
        
        direct_link = "N/A"
        if project_url:
            project_driver = setup_driver()
            try:
                project_driver.get(project_url)
                time.sleep(2)
                visit_button = project_driver.find_element(By.CSS_SELECTOR, "a[type='button'][target='_blank']")
                direct_link = visit_button.get_attribute('href')
            except Exception as e:
                print(f"Error extracting direct link: {e}")
            finally:
                project_driver.quit()

        return {
            'name': name.text.strip() if name else "N/A",
            'description': description.text.strip() if description else "N/A",
            'categories': categories,
            'upvotes': upvotes_tag[0].text.strip() if upvotes_tag else "0",
            'url': full_url,
            'direct_link': direct_link,
            'image_url': image_url
        }
    except Exception as e:
        print(f"Error extracting project details: {e}")
        return None

def scrape_peerlist_projects(url: str, limit: int = None) -> List[Dict]:
    driver = fetch_webpage(url)
    try:
        projects = driver.find_elements(By.CSS_SELECTOR, "[class*='group/projectCard']")
        project_list = []
        # Limit the number of projects if specified
        projects_to_process = projects[:limit] if limit else projects
        
        for project in projects_to_process:
            details = extract_project_details(project)
            if details:
                project_list.append(details)
        return project_list
    finally:
        driver.quit()

